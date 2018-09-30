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
    				<div class="player-normal_middle-cd">
    					<img :src="currentSong.image">
    				</div>
    			</div>
    		</div>   		
    	</div>
    	<div class="player-normal_buttom">
    		<span>=</span>
    		<span><</span>
    		<span>||</span>
    		<span>></span>
    		<span>♥</span>
    	</div>
	</div>
	</transition>

	<transition name="mini">
	<div class="player-mini" @click="open" v-show="!fullScreen">
    	<div class="player-mini_img" v-if="currentSong.image">
    		<img width="40" height="40" :src="currentSong.image">
    	</div>
    	<div class="player-mini_text">
    		<h2>{{currentSong.name}}</h2>
    		<p>{{currentSong.singer}}</p>
    	</div>
    	<div class="player-mini_control">
    		<span>乱</span>
    	</div>
	</div>
	</transition>
  </div>
</template>

<script>
/*@enter="enter"
  		@after-enter="afterEnter"
  		@leave="leave"
  		@after-leave="afterLeave"*/
/**
 *从vuex中getters映射的state中获取数据
*/

import {mapGetters,mapMutations} from 'vuex'
import animations from 'create-keyframe-animation'

export default {
  name: 'Player',
  computed:{
  	...mapGetters([
  		'fullScreen',	//判断转开的是大页面还是小组件
  		'playlist',	//数据和判断整个组件是否展示
  		'currentSong'	//当前歌曲的数据渲染进页面
  	])
  },
  methods:{
  	playerBack(){
  		this.setFullScreen(false)
  		console.log(this.fullScreen)
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
  	/*动画钩子,引用插件，以js写css的边界*/
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
  		//done是回调函数，当done执行，才会跳到下一个钩子after
  		const {x,y,scale} = this._getPosAndScale()
  		//使用插件，js语法写css的动画样式
  		//定义动作对象变量
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
  		//定义插件的类
  		animations.registerAnimation({
  			name:'moveback',	//自定义类名
  			animationa,	//动作变量
  			presets:{
  				duration:1000,
  				easing:'linear'
  			}
  		})
  		//执行类
  		animations.runAnimation(this.$refs.cdWrapper,'moveback',done)
  	},
  	afterLeave(){
  		animations.unregisterAnimation('moveback')
  		this.$refs.cdWrapper.style.animation = ''
  	},
  	/*存入点击事件触发的是否展示数据*/
  	...mapMutations({
  		setFullScreen:'SET_FULL_SCREEN'
  	})
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
		margin:0 40px;
	}
	.player-normal_buttom span{
		display: inline-block;
		box-sizing: border-box;
		width: 40px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 24px;
		color: #31c27c;
		border-radius: 50%;
		border: 2px solid #31c27c;
		margin-right: 5px;
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
		flex: 0 0 30px;
		width: 30px;
		padding: 0 10px;
	}
	.player-mini_control span{
		display: inline-block;
		width: 25px;
		height: 25px;
		line-height: 25px;
		font-size: 14px;
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
</style>
