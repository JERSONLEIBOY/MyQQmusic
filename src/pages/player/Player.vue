<template>
  <div class="player" v-if="playlist.length>0">
  	<transition 
  		name="normal"
  		@enter="enter"
  		@after-enter="afterEnter"
  		@leave="leave"
  		@after-leave="afterLeave"
  	>
    <div class="player-normal" v-show="fullScreen">
    	<div class="player-normal_background">
    		<img width="100%" height="100%" :src="currentSong.image">
    	</div>
    	<div class="player-normal_top">
    		<span @click="playerBack"><</span>
    		<h1>{{currentSong.name}}</h1>
    		<h2>{{currentSong.singer}}</h2>
    	</div>
    	<div 
        class="player-normal_middle"
        @touchstart.prevent="middleTouchStart"
        @touchmove.prevent="middleTouchMove"
        @touchend.prevent="middleTouchEnd"
      >
    		<div class="player-normal_middle-l" ref="middleLeft">
    			<div class="player-normal_middle-cdwrapper" ref="cdWrapper">
    				<div class="player-normal_middle-cd" :class="playCd">
    					<img :src="currentSong.image">
    				</div>
    			</div>
          <!--单句歌词部分-->
          <div class="player-normal_middle-playing--lyric">
            <p>{{playingLyric}}</p>
          </div>
    		</div>   
    		<!--歌词部分-->
	    	<scroll class="player-normal_middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
	    		<div class="player-normal_lyric--wrapper">
	    			<div v-if="currentLyric">
	    				<p 
                class="player-normal_lyric--p" 
                :class="{'player-normal_lyric--current':currentLineNum===index}"
                ref="lyricLine" 
                v-for="(item,index) of currentLyric.lines"
              >
	    					{{item.txt}}
	    				</p>
	    			</div>
	    		</div>
	    	</scroll>		
    	</div>
    	
    	<!--播放部件部分-->
    	<div class="player-normal_buttom">
        <div class="player-normal_dot--wrapper">
            <span class="dot" :class="{'dot-active':currentShow==='cd'}"></span>
            <span class="dot" :class="{'dot-active':currentShow==='lyric'}"></span>
        </div>
    		<div class="player-normal_progress-wrapper">
    			<span>{{format(currentTime)}}</span>
    			<div class="player-normal_progress-bar">
    				<progress-bar :percent="percent" @percentChange="percentChange"></progress-bar>
    			</div>
    			<span>{{format(currentSong.duration)}}</span>
    		</div>
    		<div class="player-normal_operators">
    			<span class="iconfont" :class="iconMode" @click="changeMode"></span>
	    		<span class="iconfont" @click="prev">&#xe62c;</span>
	    		<span class="iconfont" :class="playIcon" @click="togglePlaying"></span>
	    		<span class="iconfont" @click="next">&#xe62d;</span>
	    		<span class="iconfont" :class="getFavoriteIcon(currentSong)" @click="toggleFavorite(currentSong)"></span>
    		</div> 		
    	</div>
	</div>
	</transition>
	<!--迷你播放器小部件-->
	<transition name="mini">
	<div class="player-mini" @click="open" v-show="!fullScreen">
    	<div class="player-mini_img" v-if="currentSong.image">
    		<img :class="playCd" width="40" height="40" :src="currentSong.image">
    	</div>
    	<div class="player-mini_text">
    		<h2>{{currentSong.name}}</h2>
    		<p>{{currentSong.singer}}</p>
    	</div>
    	<div class="player-mini_control">
    		<progress-circle :radius="radius" :percent="percent">
    			<span 
    				class="iconfont iconposition" 
    				:class="playIcon" 
    				@click.stop="togglePlaying"
    			></span>
    		</progress-circle>
    		<div class="iconfont" @click.stop="showList">&#xe640;</div>
    	</div>
	</div>
	</transition>
	<!--h5播放媒体便签-->
	<audio ref="audio" 
		:src="currentSong.url" 
		@canplay="ready" 
		@error="error"
		@timeupdate="updateTime"
		@ended="end"
	></audio>
  <!--播放列表展示-->
  <div>
    <player-list ref="playList"></player-list>
  </div>
  </div>
</template>

<script>

/**
 *从vuex中getters映射的state中获取数据
*/

import {mapGetters,mapMutations,mapActions} from 'vuex'
import animations from 'create-keyframe-animation'
import ProgressBar from './components/ProgressBar'
import ProgressCircle from './components/ProgressCircle'
import PlayerList from './components/PlayerList'
import {playMode} from '@/common/js/config'	//引入状态码
import {playerMixin} from '@/common/js/mixin'
import {shuffle} from '@/common/js/util'
import Lyric from 'lyric-parser'	
import Scroll from '@/common/scroll/Scroll'

export default {
  name: 'Player',
  mixins:[playerMixin],
  data(){
  	return {
  		songReady:false,
  		currentTime:0,
  		radius:32,
  		currentLyric:null,
      currentLineNum:0,
      currentShow:'cd',
      touch:{},
      playingLyric:'歌词加载中...'
  	}
  },
  components:{
  	ProgressBar,
  	ProgressCircle,
    Scroll,
    PlayerList
  },
  computed:{
  	//图标计算属性
  	playIcon(){
  		return this.playing ? 'icon-zanting' : 'icon-bofang'
  	},
  	//唱片动态样式计算属性
  	playCd(){
  		return this.playing ? 'player-normal_middle-cd--playing' : 'player-normal_middle-cd--playing player-normal_middle-cd--pause'
  	},
  	
  	//进度条传入百分比给子组件
  	percent(){
  		return this.currentTime/this.currentSong.duration
  	},
  	...mapGetters([
  		'fullScreen',	//判断转开的是大页面还是小组件
  		'playlist',	//歌曲列表，数据和判断整个组件是否展示 		
  		'playing',	//播放状态，布尔值
  		'currentIndex',	//当前歌曲序列
  	])
  },
  methods:{
  	playerBack(){
  		this.setFullScreen(false)
  	},
  	open(){
  		this.setFullScreen(true)
  	},
    
  	//计算x,y,scale的值，封装进方法里
  	_getPosAndScale(){
  		const targetWidth = 40;	//小图片宽度
  		const paddingLeft = 40;	//小图片边距
  		const paddingBottom = 30;	//小图片边距
  		const paddingTop = 80;	//大图片边距
  		const width = window.innerWidth*0.8;	//大图片宽度
  		const scale = targetWidth/width;	//缩放比例
  		const x = -(window.innerWidth/2 - paddingLeft);	//中心点x距离
  		const y = window.innerHeight - paddingTop - width/2 -paddingBottom;	//中心点y距离
  		return {x,y,scale}
  	},
/*******动画钩子,引用插件，以js写css的边界*******/
  	enter(el,done){
  		//done是回调函数，当done执行，才会跳到下一个钩子after
  		const {x,y,scale} = this._getPosAndScale()
  		//使用插件，js语法写css的动画样式
  		//定义动作对象变量
  		let animation = {
  			0:{
  				transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
  			},
  			60:{
  				transform: `translate3d(0,0,0) scale(1.1)`
  			},
  			100:{
  				transform: `translate3d(0,0,0) scale(1)`
  			},
  		}
  		//定义插件的类
  		animations.registerAnimation({
  			name:'move',	//自定义类名
  			animation,	//动作变量
  			presets:{
  				duration:400,
  				easing:'linear'
  			}
  		})
  		//执行类
  		animations.runAnimation(this.$refs.cdWrapper,'move',done)
  	},
  	afterEnter(){
  		animations.unregisterAnimation('move')
  		this.$refs.cdWrapper.style.animation = ''
  	},
  	leave(el,done){
  		const {x,y,scale} = this._getPosAndScale()
  		let animationa = {
  			0:{
  				transform: `translate3d(0,0,0)`
  			},
  			60:{
  				transform: `translate3d(${-x}px,${-y}px,0)`
  			},
  			100:{
  				transform: `translate3d(${-x}px,${-y}px,0)`
  			},
  		}
  		animations.registerAnimation({
  			name:'moveback',	//自定义类名
  			animationa,	//动作变量
  			presets:{
  				duration:1000,
  				easing:'linear'
  			}
  		})
  		animations.runAnimation(this.$refs.cdWrapper,'moveback',done)
  	},
  	afterLeave(){
  		animations.unregisterAnimation('moveback')
  		this.$refs.cdWrapper.style.animation = ''
  	},
/*****进度条数据*****/
	updateTime(e){
		//h5播放器内置获取播放中进度时间
		this.currentTime = e.target.currentTime
	},
	//自定义方法，传入参数时间
	format(interval){
		interval = interval | 0 //把时间戳取整再获取分秒
		const minute = interval/60 | 0	//整后的时间换单位计算
		const second = this._pad(interval%60)	//取余
		return `${minute}:${second}`
	},
	//计算的时间个位数时不会自动补0，格式化时间方法
	_pad(num,n=2){
		let long = num.toString().length
		while(long<n){
			num = '0'+num
			long ++ 
		}
		return num
	},
/*****控制播放******/
  	togglePlaying(){
  		this.setPlayingState(!this.playing)
      //优化bug，暂停播放时，歌词不停
      if(this.currentLyric){
        //清除歌词
        //console.log(this.currentLyric)
        this.currentLyric.togglePlay()
      }
  	},
  	ready(){
  		//h5播放器标签有哦属性，@canplay，当获取到资源的时候执行
  		//这里设置变量，作为是否准备好才可以进行切换下一首
  		this.songReady = true
      this.savePlayHistory(this.currentSong)
  	},
  	error(){
  		//当url资源获取不到时，因为设置了变量ready才能切换，那功能就奔溃了
  		//因此，考虑这种情况，使变量依旧生效
  		this.songReady = true
  	},
  	prev(){
  		//判断播放器准备好才能操作
  		if(!this.songReady){
  			return 
  		}
      //当歌曲列表只有一首歌时，index不存在后面卡住
      if(this.playlist.length === 1 || this.mode===playMode.loop){
        this._loop()
      }else{
    		let index = this.currentIndex-1
    		if(index === -1){
    			//当前一首减到最后一个，转为数组的最后一项序列
    			index = this.playlist.length-1
    		}
    		this.setCurrentIndex(index)
    		//暂停时切换下一首，按钮没有变化，再加
    		if(!this.playing){
    			this.togglePlaying()
    		}
      }
  		this.songReady = false
  	},
  	next(){
  		//判断播放器准备好才能操作
  		if(!this.songReady){
  			return 
  		}
      //当歌曲列表只有一首歌时，index不存在后面卡住
      if(this.playlist.length === 1 || this.mode===playMode.loop){
        this._loop()
      }else{
        let index = this.currentIndex+1
        if(index === this.playlist.length){
          //当前一首加到最后一个，转为数组的第一项序列
          index = 0
        }
        this.setCurrentIndex(index)
        if(this.currentLyric){
          this.currentLyric.stop()  //没有执行 
        }
        if(!this.playing){
          this.togglePlaying()
        }
      } 	
      this.songReady = false	
  	},
  	
  	
/*****获取歌词*******/
  	_getLyric(){
  		this.currentSong.getLyric().then((lyric)=>{
  			if (this.currentSong.lyric !== lyric) {
            return
          }
        this.currentLyric = new Lyric(lyric,this._handleLyric)
  			//console.log(this.currentLyric)
        if(this.playing){ //如歌歌曲正在播放，执行高亮
          this.currentLyric.play()    //这是什么属性？？
        }
  		}).catch(()=>{
        this.currentLyric = null
        this.playingLyric = ''
        this.currentLineNum = 0
      })
  	},
    _handleLyric({lineNum,txt}){  //把当前播放到的歌词num和文字提取出来
      this.currentLineNum = lineNum
      this.playingLyric = txt
      if(lineNum>5){
        let lineEl = this.$refs.lyricLine[lineNum-5]
        this.$refs.lyricList.scrollToElement(lineEl,1000)  
      }else{
        this.$refs.lyricList.scrollToElement(0,0,1000)       
      }
    },
/*****左右滑动touch生命周期**********/
    middleTouchStart(e){
      this.touch.initiated = true //标志符
      // 用来判断是否是一次移动
      this.touch.moved = false
      //获取拖拽距离，用于判断
      const touch = e.touches[0]  //开始点到的数组【0】
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    },
    middleTouchMove(e){
      if(!this.touch.initiated){
        return 
      }
      const touch = e.touches[0]
      const deltaX = touch.pageX-this.touch.startX  //计算到的x拖拽距离
      const deltaY = touch.pageY-this.touch.startY  //计算到的y拖拽距离
      //歌词页面有个scroll，因此获取到y,来取消当前touch
      if(Math.abs(deltaY)>Math.abs(deltaX)){
        //当y滑动大于x滑动，证明是在滑动歌词，因此取消当前左右touch
        return 
      }
      if (!this.touch.moved) {
          this.touch.moved = true
      }
      //分情况，用小圆点来判断歌词页面dom的left
      const left = this.currentShow==='cd'?0: -window.innerWidth
      //随手指拖拽改变的width，通用
      const width = Math.min(0,Math.max(-window.innerWidth,left+deltaX))   
      //使用transform定义偏移
      this.touch.percent = Math.abs(width/window.innerWidth)  //拖拽距离占屏幕百分比
      this.$refs.lyricList.$el.style.transform=`translate3d(${width}px,0,0)`
      this.$refs.lyricList.$el.style.transition=`all 0` //动画偏移过渡
      this.$refs.middleLeft.style.opacity=1-this.touch.percent  //唱片透明度消失         
    },
    middleTouchEnd(e){
      if(!this.touch.moved){
        return
      }
      //判断两种情况，最终停留left
      let width   //最终定位dom的偏移量
      let opacity  //最终定位到dom的唱片透明度

      if(this.currentShow==='cd'){
        //判断拖拽距离占屏幕百分比，定住最终位置
        if(this.touch.percent>0.1){
          width = -window.innerWidth  //当滑动大于10%时，定位到歌词显示
          opacity = 0
          this.currentShow = 'lyric'
        }else{
          width = 0
          opacity = 1
        }
      }else{
        //在歌词页面往左滑动
        if(this.touch.percent<0.9){
          //百分比的计算不是单纯的拖拽距离，所以不是都为0.1
          width = 0
          opacity = 1
          this.currentShow = 'cd'
        }else{
          opacity = 0
          width = -window.innerWidth
        }
      }
      this.$refs.lyricList.$el.style.transform=`translate3d(${width}px,0,0)`
      this.$refs.lyricList.$el.style.transition=`all 0.4s`
      this.$refs.middleLeft.style.opacity=opacity  //唱片透明度消失
      this.$refs.middleLeft.style.transition='all 0.4s'  //唱片透明度消失
    },
  	//播完当前歌曲，自动识别播放模式切歌
  	end(){
  		if(this.mode === playMode.loop){
  			this._loop()	//单曲，通过修改当前播放时间为0
  		}else{
  			this.next()
  		}		
  	},
  	_loop(){
  		this.$refs.audio.currentTime = 0
  		this.$refs.audio.play()
      //优化bug，单曲循坏时，歌词没有回到顶
      if(this.currentLyric){
        //清除歌词
        this.currentLyric.seek(0)
      }
  	},
  	//进度条拖拽改变audio的当前时间
  	percentChange(percent){
  		this.$refs.audio.currentTime = this.currentSong.duration*percent
  		//当歌曲是暂停的时候，把播放状态改为播放
  		if(!this.playing){
  			this.togglePlaying()
  		}
      //优化bug，进度条关联歌词
      if(this.currentLyric){
        //清除歌词
        this.currentLyric.seek(this.currentSong.duration*percent*1000)
      }
  	},
/**********小播放器组件打开播放列表*******************/
    showList(){
      this.$refs.playList.showList()
    },
  	/*存入点击事件触发的是否展示数据*/
  	...mapMutations({
  		setFullScreen:'SET_FULL_SCREEN',
  		setPlayingState:'SET_PLAYING_STATE',
  		
  	}),
    ...mapActions([
      'savePlayHistory'
    ])

  },
  //监听当前歌曲改变时播放音乐
  watch:{

  	currentSong(newSong){
      //console.log(newSong)
      if (!newSong) {

          return
        }
      /*//添加的当前歌曲和前面重复 要无视
  		if(newSong.id===oldSong.id){
        console.log(newSong.id===oldSong.id)
  			return 
  		}*/
      //优化bug，切歌时，歌词不对应跳
      if(this.currentLyric){
        //清除歌词
        //console.log(this.currentLyric.stop())
        this.currentLyric.stop()  //没有执行//设置成null无法清除掉定时器  
        this.currentTime = 0
        this.playingLyric = ''
        this.currentLineNum = 0
      }
  		setTimeout(()=>{
  			//console.log(this.currentSong.url)
  			this.$refs.audio.play()
  			this._getLyric()
  		},1000)	
      console.log(newSong.url)	
  	},
  	playing(item){
      //当播放列表没有东西，但是播放状态从播放变为不播放时，触发导致undefind，判断当前歌曲为-1
      if(this.currentIndex===-1){
        return
      }
  		this.$nextTick(()=>{
  			const audio = this.$refs.audio
  			if(item){
  				audio.play()
  			}else{
  				audio.pause()
  			}
  		})
  	}
  }
}
</script>

<style>

/*播放器页面-外部样式*/
	.player-normal{
		z-index: 150;
		position: fixed;
		top:0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: black;

	}
/*播放器页面-背景样式*/
	.player-normal_background{
		z-index: -1;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;		
		opacity: 0.6;	/*在外部样式样式的透明度*/
		filter: blur(20px);	/*苹果手机的模糊效果*/
	}
/*播放器页面-顶部样式*/
	.player-normal_top{
		position: relative;
		margin-bottom: 25px;
	}
	.player-normal_top span{
		display: inline-block;
		width: 40px;
		width: 40px;
		line-height: 40px;
		text-align: center;
		color: #fff;
		font-size: 24px;
		position: absolute;
		top: 6px;
		left: 6px;
		transform: rotate(-90deg);  /*旋转90度*/
	}
	.player-normal_top h1{
		width: 70%;
		margin: 0 auto;
		line-height: 40px;
		text-align: center;
		font-size: 14px;
		color: #fff;
	}
	.player-normal_top h2{
		line-height: 20px;
		text-align: center;
		font-size: 12px;
		color: #fff;
	}
/*播放器页面-唱片样式*/
	.player-normal_middle{
		position: fixed;
		width: 100%;
		top: 80px;
		bottom: 170px;
		white-space: nowrap; /*？？？*/
		font-size: 0;
	}
	/*中间唱片的占位padding*/
	.player-normal_middle-l{
		display: inline-block;
		vertical-align: top;
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 80%;
	}
	.player-normal_middle-cdwrapper{
		position: absolute;
		left: 10%;
		top: 0;
		width: 80%;
		height: 100%;
	}
	.player-normal_middle-cd{
		width: 100%;
		height: 100%;
		box-sizing: border-box;	/*为什么没有生效啊？？？*/
		border: 10px solid rgba(255,255,255,0.1);
		border-radius: 50%;
	}
	.player-normal_middle img{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
  .player-normal_middle-playing--lyric{
    width: 80%;
    margin: 30px auto 0 auto;
    overflow: hidden;
    text-align: center;
  }
  .player-normal_middle-playing--lyric p{
    display: inline-block;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: rgba(255,255,255,0.8);
  }
/*歌词部分样式*/
	.player-normal_middle-r{
		display: inline-block;
		vertical-align: top;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.player-normal_lyric--wrapper{
		width: 80%;
		margin: 0 auto;
		overflow: hidden;
		text-align: center;
	}
	.player-normal_lyric--p{
		line-height: 32px;
		font-size: 12px;
		color: rgba(255,255,255,0.6);		
	}
  .player-normal_lyric--current{
    color: rgb(255,255,255);  /*不生效是因为用p直接选择器的优先权大，无法动态覆盖*/
    line-height: 40px;
    font-weight: 700;
  }  
/*播放器页面-按钮样式*/
	.player-normal_buttom{
		position: absolute;
		bottom: 60px;
		width: 100%;
	}
  .player-normal_dot--wrapper{
    text-align: center;
    font-size: 0;
  }
  .dot{
    display: inline-block;
    vertical-align: middle;
    margin: 0 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: rgba(255,255,255,0.6);
  }
  .dot-active{
    width: 20px;
    border-radius: 5px;
    background-color: rgb(255,255,255);
  }
	.player-normal_operators{
		display: flex;
		align-items: center;
		width: 80%;
		margin: 0 auto;
	}
	.player-normal_operators span{
		display: inline-block;
		flex: 1;
		font-size: 38px;
		color: #31c27c;
	}
  .player-normal_operators span:last-child{
    color: red;
  }
	.player-normal_progress-wrapper{
		display: flex;
		align-items: center;
		width: 80%;
		margin: 0 auto;
		padding: 10px 0; 
	}
	.player-normal_progress-wrapper span{
		flex: 0 0 30px;
		display: inline-block;
		font-size: 12px;
		width: 30px;
		line-height: 30px;
		color: #fff;
	}
	.player-normal_progress-wrapper span:last-child{
		text-align: right;
	}
	.player-normal_progress-bar{
		flex: 1;
	}
/*小播放器部件*/
	.player-mini{
		z-index: 180;		
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 60px;
		background-color: rgba(7,17,27,1);
	}
	.player-mini_img{
		flex: 0 0 40px;
		width: 40px;
		padding: 0 10px 0 20px;
	}
	.player-mini_img img{
		border-radius: 50%;
	}
	.player-mini_text{
		display: flex;
		flex-direction: column; /*文字竖向排列*/
		justify-content: center;
		flex: 1;
		line-height: 20px;
		overflow: hidden;
		font-size: 0;
	}
	.player-mini_text h2{
		margin-bottom: 2px;
		font-size: 12px;
		color: #fff;
	}
	.player-mini_text p{
		font-size: 8px;
		color: #fff;
	}
	.player-mini_control{
		flex: 0 0 80px;
		width: 80px;
		text-align: center;
	}
	
	.iconposition{
		flex: 1;
		display: inline-block;
		font-size: 32px;
		margin-right: 5px;
		color: #31c27c;
		position: absolute;
		top: 0;
		left: 0;
	}
	.player-mini_control div{
		flex: 1;
		display: inline-block;
		font-size: 32px;
		color: #31c27c;
	}
/*播放器动画样式*/
	.normal-enter-active, .normal-leave-active{
		transition: all 0.4s;
	}
	.normal-enter,.normal-leave-to{
		opacity: 0;
	}
/*内部个别样式变化*/
	.player-normal_top, .player-normal_buttom{
		transition: all 0.4s cubic-bezier(0.86,0.18,0.82,1.32);
	}
	/*内部个别样式变化--头部*/
	.normal-enter .player-normal_top{
		transform: translate3d(0,-100px,0);
	}
	.normal-leave-to .player-normal_top{
		transform: translate3d(0,-100px,0);
	}
	/*内部个别样式变化--底部*/
	.normal-enter .player-normal_buttom{
		transform: translate3d(0,100px,0);
	}
	.normal-leave-to .player-normal_buttom{
		transform: translate3d(0,100px,0);
	}

	/*小部件的动画*/
	.mini-enter-active, .mini-leave-active{
		transition: all 0.4s;
	}
	.mini-enter,.mini-leave-to{
		opacity: 0;
	}
/*唱片旋转动画*/
	.player-normal_middle-cd--playing{
		animation: rotate 20s linear infinite;	/*参数（动作，时间，线性，无限循环）*/
	}
	.player-normal_middle-cd--pause{
		animation-play-state: paused; 	/*内置暂停动作*/
	}
	@keyframes rotate{
		0%{transform: rotate(0);}
		100%{transform: rotate(360deg);}
	}
</style>
