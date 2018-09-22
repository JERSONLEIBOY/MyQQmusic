<template>
  <div class="recommend">
  	<!--轮播图部分-->
  	<recommend-swiper :sliders="sliders"></recommend-swiper>
  	<!--歌单列表部分-->
  	<recommend-content :discList="discList"> </recommend-content>
  </div>
</template>

<script>
import {getRecommend,getDiscList} from '@/api/recommend'	//引入api的后台数据
import {ERR_OK} from '@/api/config'	//引入自定义的公共变量
import RecommendSwiper from './components/RecommendSwiper'
import RecommendContent from './components/RecommendContent'

export default {
  name: 'Recommend',
  data() {
      return {    	
        sliders:[],
        discList:[]
      }
  },
  components:{
  	RecommendSwiper,
  	RecommendContent
  },
  mounted(){
  	this._getRecommend()	//获取轮播图数据
  	this._getDiscList()		//获取歌单数据
  },
  methods:{
  	//获取轮播图数据
  	_getRecommend(){
  		//执行api的js方法
  		getRecommend().then((res)=>{
  			if(res.code === ERR_OK){
  				//console.log(res.data.slider)
  				this.sliders = res.data.slider
  			}
  		})
  	},
  	//获取歌单数据
  	_getDiscList(){
  		//执行api中的js方法（一个模块可以多个方法）
  		getDiscList().then((res)=>{
  			if (res.code === ERR_OK) {
  				console.log(res.data.list)
  				this.discList = res.data.list
  			}
  		})
  	}
  }

}
</script>

<style>
	.recommend{
		position: fixed;
		top:84px;
		left: 0;
		width: 100%;
	}
	
</style>
