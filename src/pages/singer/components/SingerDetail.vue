<template>
  <div class="singer-detail">
    歌手详情页
    <!--加载中 公共组件-->
    <div class="singer-loading">
      <loading v-show="false"></loading>
    </div>
  </div>
</template>

<script>
import Loading from '@/common/loading/loading'

export default {
  name: 'SingerDetail',
  props:{
    
  },
  components:{
    Loading
  },
  data() {
      return {        
      }
  }
}
</script>

<style>
  .singer-detail{
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    background-color: #eee;
  }
/*加载中组件位置*/
  .singer-loading{
    margin-top: 30px;
    width: 100%;
  }
</style>
