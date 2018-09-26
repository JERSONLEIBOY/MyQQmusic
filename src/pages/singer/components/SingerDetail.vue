<template>
  <transition name="slide">
  <div class="singer-detail">
    歌手详情页
    <!--加载中 公共组件-->
    <div class="singer-loading">
      <loading v-show="false"></loading>
    </div>
  </div>
</transition>
</template>

<script>

import {getSingerDetail} from '@/api/singer'  //引入api的后台数据
import {ERR_OK} from '@/api/config' //引入自定义的公共变量
import Loading from '@/common/loading/loading'
import {mapGetters} from 'vuex'

export default {
  name: 'SingerDetail',
  components:{
    Loading
  },
  computed:{
    ...mapGetters([
        'singer'
      ])
  },
  created(){
    //console.log(this.singer.id)
    this._getSingerDetail()
  },
  methods:{

    _getSingerDetail(){
      //执行api的js方法
      //获取数据的歌手id不是通过子组件传递父组件，再传递进来当前组件
      //而是通过子组件存入数据进store。当前组件引入store
      console.log(this.singer.id)
      getSingerDetail(this.singer.id).then((res)=>{
        if(res.code === ERR_OK){
          console.log(res.data.list)
          //this.sliders = res.data.slider
        }
      })
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
/*动画样式*/
  .slide-enter-active, .slide-leave-sctive{
    transition: all 0.3s
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%,0,0);
  }
/*加载中组件位置*/
  .singer-loading{
    margin-top: 30px;
    width: 100%;
  }
</style>
