<template>
  <transition name="slide">
  <div class="recommend-detail">
    <music-list :title="menu.dissname" :bgimg="menu.imgurl"></music-list>
    <!--加载中 公共组件-->
    <div class="recommend-loading">
      <loading v-show="!menu"></loading>
    </div>
  </div>
</transition>
</template>

<script>
import MusicList from '@/common/musiclist/MusicList'


import Loading from '@/common/loading/loading'
import {mapGetters} from 'vuex'
import {createSong} from '@/common/js/song.js'

export default {
  name: 'RecommendDetail',
  components:{
    Loading,
    MusicList
  },
  computed:{
    //调用state中的歌单数据
    ...mapGetters([
      'menu'
    ])
  },
  data(){
    return {
      
    }
  },
  created(){
    //console.log(this.menu)
  },
  methods:{

  }
}
</script>

<style>
  .recommend-detail{
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
  }
/*动画样式*/
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%,0,0);
  }
/*加载中组件位置*/
  .recommend-loading{
    margin-top: 30px;
    width: 100%;
  }
</style>
