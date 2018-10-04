<template>
  <transition name="slide">
  <div class="recommend-detail">
    <music-list :title="menu.dissname" :bgimg="menu.imgurl" :songs="songs"></music-list>
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
import {getRecommendMenu} from '@/api/recommend'
import {getSongs} from '@/api/singer'
import {ERR_OK} from '@/api/config'
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
      songs:[]
    }
  },
  created(){
    this._getRecommendMenu()
  },
  methods:{
    _getRecommendMenu(){
      if(!this.menu.dissid){
        this.$router.back()
      }
      getRecommendMenu(this.menu.dissid).then((res)=>{
        if(res.code===ERR_OK){
          this.songs=this._nomalizeSongs(res.cdlist[0].songlist)
        }
      })
    },
    //提取歌曲数据
    _nomalizeSongs(list){
      let ret = []
      list.forEach((item)=>{
        if(item.songid && item.albumid){
          //获取歌曲源url数据
          let songUrl = ''
          getSongs(item.songmid).then((res)=>{
            songUrl = res.req_0.data.midurlinfo[0].purl   
            ret.push(createSong(item,songUrl)) //不需要一个一个new传值        
          })
        }
      })
      return ret
    }
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
