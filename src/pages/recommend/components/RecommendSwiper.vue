<template>
  <!--轮播图部分-->
    <div class="recommend-swiper">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- 轮播图内容 -->
        <swiper-slide v-for="item of sliders" :key="item.id">
          <img :src="item.picUrl">
        </swiper-slide>
        <!-- 轮播图小部件 -->
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>

export default {
  name: 'RecommendSwiper',
  props:{
    sliders:{
      type:Array
    }
  },
  data() {
      return {      
        swiperOption: {
          //所有的参数，官方文档 注意语法都是对象
          autoplay: true, //默认300可以设置，写成对象
          loop: true, //bug：不生效，且自动播放，手动之后不会自动
          pagination: { //旧版本直接键值对，这里要对象
            el:'.swiper-pagination'
          },
          /*navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },*/
          observeParents:true,  //解决页面首次加载，滑动错误的问题
          observer:true     //原因：首次加载的区域计算，使显示错误
        }
      }
  }
}
</script>

<style>
  .recommend-swiper{
    width: 100%;
    height: 0;
    padding-bottom: 40%;
  }
  .recommend-swiper img{
    width: 100%;
  }
</style>
