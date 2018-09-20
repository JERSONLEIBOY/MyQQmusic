<template>
  <div class="recommend">
  	<div class="recommend-swiper">
  	<swiper :options="swiperOption" ref="mySwiper">
    	<!-- slides -->
	    <swiper-slide v-for="item of sliders" :key="item.id"><img :src="item.picUrl"></swiper-slide>
	    <!-- Optional controls -->
	    <div class="swiper-pagination"  slot="pagination"></div>
	    <div class="swiper-scrollbar"   slot="scrollbar"></div>
	</swiper>
	</div>
    这是推荐页面
  </div>
</template>

<script>
import {getRecommend} from '@/api/recommend'	//引入api的后台数据
import {ERR_OK} from '@/api/config'

export default {
  name: 'Recommend',
  data() {
      return {    	
        swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
        	autoplay: 3000,
			pagination: '.swiper-pagination',
			observeParents:true,	//解决页面首次加载，滑动错误的问题
			observer:true			//原因：首次加载的区域计算，使显示错误
        },
        sliders:[]
      }
  },
  mounted(){
  	this._getRecommend()
  },
  methods:{
  	_getRecommend(){
  		//执行api的js方法
  		getRecommend().then((res)=>{
  			if(res.code === ERR_OK){
  				console.log(res.data.slider)
  				this.sliders = res.data.slider
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
		height: 800px;
		background-color: #eee;
	}
	.recommend-swiper{
		width: 100%;
		height: 0;
		background-color: red;
	}
	.recommend-swiper img{
		width: 100%;

	}
</style>
