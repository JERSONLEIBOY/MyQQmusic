<template>
  <div class="player" v-show="playlist.length>0">
  	<transition name="normal">
    <div class="player-normal" v-show="fullScreen">
    	<div class="player-normal_background" v-if="currentSong.image">
    		<img width="100%" height="100%" :src="currentSong.image">
    	</div>
    	<div class="player-normal_top">
    		<span @click="playerBack"><</span>
    		<h1>{{currentSong.name}}</h1>
    		<h2>{{currentSong.singer}}</h2>
    	</div>
    	<div class="player-normal_middle">
    		<div class="player-normal_middle-l">
    			<div class="player-normal_middle-cdwrapper">
    				<div class="player-normal_middle-cd" v-if="currentSong.image">
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
/**
 *从vuex中getters映射的state中获取数据
*/

import {mapGetters,mapMutations} from 'vuex'

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
  	},
  	open(){
  		this.setFullScreen(true)
  	},
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
		transition: all 1s;
	}
	.normal-enter,.normal-leave-to{
		opacity: 0;
	}
	/*内部个别样式变化--头部*/
	.normal-enter-active .player-normal_top,
	.normal-enter-active .player-normal_buttom,
	.normal-leave-active .player-normal_top,
	.normal-leave-active .player-normal_buttom,{
		transition: all 2s cubic-bezier(0.86,0.18,0.82,1.32);
	}

	.normal-enter-active .player-normal_top{
		transition: all 2s cubic-bezier(0.86,0.18,0.82,1.32);
		transform: translate3d(0,-100px,0);
	}
	.normal-leave-active .player-normal_top{
		transition: all 2s cubic-bezier(0.86,0.18,0.82,1.32);
		transform: translate3d(0,-100px,0);
	}
	/*内部个别样式变化--底部*/
	.normal-enter-active .player-normal_buttom{
		transition: all 2s cubic-bezier(0.86,0.18,0.82,1.32);
		transform: translate3d(0,100px,0);
	}
	.normal-leave-active .player-normal_buttom{
		transition: all 2s cubic-bezier(0.86,0.18,0.82,1.32);
		transform: translate3d(0,100px,0);
	}
	.mini-enter-active, .mini-leave-active{
		transition: all 0.4s;
	}
	.mini-enter,.mini-leave-to{
		opacity: 0;
	}
</style>
