<template>
  <div class="player" v-show="playlist.length>0">
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
    	<div class="player-normal_middle">
    		<div class="player-normal_middle-l">
    			<div class="player-normal_middle-cdwrapper" ref="cdWrapper">
    				<div class="player-normal_middle-cd" :class="playCd">
    					<img :src="currentSong.image">
    				</div>
    			</div>
    		</div>   		
    	</div>
    	<div class="player-normal_buttom">
    		<div class="player-normal_progress-wrapper">
    			<span>{{format(currentTime)}}</span>
    			<div class="player-normal_progress-bar">
    				<progress-bar :percent="percent" @percentChange="percentChange"></progress-bar>
    			</div>
    			<span>{{format(currentSong.duration)}}</span>
    		</div>
    		<div class="player-normal_operators">
    			<span class="iconfont" >&#xe672;</span>
	    		<span class="iconfont" @click="prev">&#xe62c;</span>
	    		<span class="iconfont" :class="playIcon" @click="togglePlaying"></span>
	    		<span class="iconfont" @click="next">&#xe62d;</span>
	    		<span class="iconfont">&#xe672;</span>
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
    		<span class="iconfont" :class="playIcon" @click.stop="togglePlaying"></span>
    		<span class="iconfont">&#xe672;</span>
    	</div>
	</div>
	</transition>
	<!--h5播放媒体便签-->
	<audio ref="audio" 
		:src="currentSong.url" 
		@canplay="ready" 
		@error="error"
		@timeupdate="updateTime"
	></audio>
  </div>
</template>

<script>

/**
 *从vuex中getters映射的state中获取数据
*/

import {mapGetters,mapMutations} from 'vuex'
import animations from 'create-keyframe-animation'
import ProgressBar from './components/ProgressBar'

export default {
  name: 'Player',
  data(){
  	return {
  		songReady:false,
  		currentTime:0
  	}
  },
  components:{
  	ProgressBar,
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
  		'playlist',	//数据和判断整个组件是否展示
  		'currentSong',	//当前歌曲的数据渲染进页面
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
  	},
  	ready(){
  		//h5播放器标签有哦属性，@canplay，当获取到资源的时候执行
  		//这里设置变量，作为是否准备好才可以进行切换下一首
  		this.songReady = true
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
  		this.songReady = false
  	},
  	next(){
  		//判断播放器准备好才能操作
  		if(!this.songReady){
  			return 
  		}
  		let index = this.currentIndex+1
  		if(index === this.playlist.length){
  			//当前一首加到最后一个，转为数组的第一项序列
  			index = 0
  		}
  		this.setCurrentIndex(index)
  		if(!this.playing){
  			this.togglePlaying()
  		}
  		this.songReady = false
  	},
  	//进度条拖拽改变audio的当前时间
  	percentChange(percent){
  		this.$refs.audio.currentTime = this.currentSong.duration*percent
  		//当歌曲是暂停的时候，把播放状态改为播放
  		if(!this.playing){
  			this.togglePlaying()
  		}
  	},

  	/*存入点击事件触发的是否展示数据*/
  	...mapMutations({
  		setFullScreen:'SET_FULL_SCREEN',
  		setPlayingState:'SET_PLAYING_STATE',
  		setCurrentIndex:'SET_CURRENT_INDEX'
  	})
  },
  //监听当前歌曲改变时播放音乐
  watch:{

  	currentSong(){
  		this.$nextTick(()=>{
  			//console.log(this.currentSong.url)
  			this.$refs.audio.play()
  		})		
  	},
  	playing(item){
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
/*播放器页面-按钮样式*/
	.player-normal_buttom{
		position: absolute;
		bottom: 60px;
		width: 100%;
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
		height: 100%;
		text-align: center;
		padding: 25px 10px 0 0;
	}
	.player-mini_control span{
		display: inline-block;
		margin-right: 5px;
		font-size: 32px;
		line-height: 100%;
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
