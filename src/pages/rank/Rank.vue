<template>
  <div>
    <scroll :data="topList" class="rank" ref="scroll">
    	<ul>
    		<li class="rank-item" v-for="item of topList" @click="selectRank(item)">
    			<!--图片-->
    			<img width="100" v-lazy="item.picUrl"/>
    			<!--歌曲列表-->
    			<ul>
	    			<li 
	    				v-for="(song,index) of item.songList" 
	    				class="rank-item_songlist"
	    			>
	    				<span>{{index+1}}</span>
	    				<span>{{song.singername}}-{{song.songname}}</span>
	    			</li>
    			</ul>
    		</li>
    	</ul>
    	<!--‘加载中’组件-->
    	<loading class="loading-container"></loading>
    </scroll>

    <!--详情页路由-->
    <router-view />
  </div>
</template>

<script>
import {getTopList} from '@/api/rank'	//引入获取数据的js方法
import {ERR_OK} from '@/api/config'	//引入状态码
import Scroll from '@/common/scroll/Scroll'	//引入滚动组件
import Loading from '@/common/loading/loading'	//引入加载组件
import {mapMutations} from 'vuex'	//引入存入state数据的vuex
import {playlistMixin} from '@/common/js/mixin'	//引入mixin重复方法

export default {
  name: 'Rank',
  mixins:[playlistMixin],
  components:{
  	Scroll,
  	Loading
  },
  data(){
  	return {
  		topList:[]	//排行榜首页数据
  	}
  },
  created(){
  	this._getTopList()
  },
  methods:{
  	/***获取排行榜首页数据方法****/
  	_getTopList(){
  		getTopList().then((res)=>{
  			if(res.code===ERR_OK){
  				this.topList = res.data.topList
  			}
  		})
  	},
  	/****点击，选择排行榜，跳转路由*****/
  	selectRank(item){
  		this.$router.push({
  			path:`/rank/${item.id}`
  		})
  		//存入点击的数据进state
  		this.setTopList(item)
  	},
  	/******mixin方法引入************/
  	handlePlaylist(playlist){
  		const bottom = playlist.length>0 ? '60px':''
        this.$refs.scroll.$el.style.bottom = bottom
        this.$refs.scroll.refresh()
  	},
  	/***state的存入数据*****/
  	...mapMutations({
  		setTopList:'SET_TOPLIST' 
  	})
  }
}
</script>

<style>
	.rank{
		position: fixed;
		top:85px;
		left: 0;
		width: 100%;
		bottom: 0;
		overflow: hidden;
		background-color: #eee;
	}
	.rank-item{
		display: flex;
		margin: 0 10px;
		padding-top: 10px;
		height: 100%;
	}
	.rank-item:last-child{
		padding-bottom: 10px;
	}
	.rank-item img{
		display: inline-block;
		flex: 0 0 100px;
		width: 100px;
		height: 100px;
	}
	.rank-item ul{
		flex: 1;
		display: flex;
		flex-direction: column;	/*水平居中*/
		justify-content: center;
 		width: 100%;
 		min-width: 0;
		height: 100px;
		padding: 0 20px;
		font-size: 12px;
		color: rgba(0,0,0);
		background-color: #fff;
	}
	.rank-item_songlist{
		line-height: 26px;
		overflow: hidden;	/*超出范围省略号*/
		white-space: nowrap;       
		text-overflow: ellipsis;
	}
	.rank-item_songlist span:last-child{
		font-size: 14px;
	}
/*加载中组件样式*/
	.loading-container{
		margin-top: 20px;
		width: 100%;
	}
</style>