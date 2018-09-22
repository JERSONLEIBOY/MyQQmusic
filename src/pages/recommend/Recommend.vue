<template>
  <scroll ref="scroll" class="recommend" :theData="discList">
  <div>
  	<!--轮播图部分-->
  	<recommend-swiper @imgload="imgload" :sliders="sliders"></recommend-swiper>
  	<!--歌单列表部分-->
  	<recommend-content :discList="discList"> </recommend-content>  
  </div>
  </scroll>
</template>

<script>
import {getRecommend,getDiscList} from '@/api/recommend'	//引入api的后台数据
import {ERR_OK} from '@/api/config'	//引入自定义的公共变量
import RecommendSwiper from './components/RecommendSwiper'
import RecommendContent from './components/RecommendContent'
import Scroll from '@/common/scroll/Scroll'


export default {
  name: 'Recommend',
  data() {
      return {    	
        sliders:[],
        discList:[],
      }
  },
  components:{
  	RecommendSwiper,
  	RecommendContent,
  	Scroll,
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
  	},

  	//当图片不设置成按浏览器比例占位的话
  	//可能轮播图的加载比列表数据久，导致scroll的高度没有计算轮播图
  	//解决方法，监听轮播图完成了再刷新scroll
  	imgload(things){
  		//子组件完成图片加载触发刷新
  		console.log(things)
  		this.$refs.scroll.refresh()
  	}
  }

}
</script>

<style>
	.recommend{
		position: fixed;
		top:84px;
		left: 0;
		bottom: 0;
		overflow: hidden;
		width: 100%;
	}

</style>
