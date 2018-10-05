<template>
  <transition name="slide">
  <div class="rank-detail">
    <music-list :title="topList.topTitle" :bgimg="bgimg" :songs="songs" :rank="true"></music-list>
    <!--加载中 公共组件-->
    <div class="rank-loading">
      <loading v-show="!topList"></loading>
    </div>
  </div>
</transition>
</template>

<script>
import MusicList from '@/common/musiclist/MusicList'  //引入公共组件详情页面
import Loading from '@/common/loading/loading'  //引入公共组件加载

import {mapGetters} from 'vuex' //引入vuex获取数据
import {getRankList} from '@/api/rank'   //获取歌曲列表数据的jsonp
import {getSongs} from '@/api/singer' //引入获取歌曲源数据的axios
import {ERR_OK} from '@/api/config' //引入获取数据的状态码
import {createSong} from '@/common/js/song.js'  //引入歌曲列表数据提取数据的方法

export default {
  name: 'RankDetail',
  components:{
    Loading,
    MusicList
  },
  computed:{
    bgimg(){
      if(this.songs.length){
        return this.songs[0].image
      }
    },
    /**获取state数据****/
    ...mapGetters([
      'topList'
    ])

  },
  data(){
    return {
      songs:[]
    }
  },
  created(){
    this._getRankList()
  },
  methods:{
    /***获取歌曲列表数据*****/
    _getRankList(){
      if(!this.topList.id){
        this.$router.back()
        return
      }
      getRankList(this.topList.id).then((res)=>{
        if(res.code === ERR_OK){
          this.songs = this._normalizeSongs(res.songlist)
        }
      })
    },
    //提取歌曲列表数据
    _normalizeSongs(list){
      let ret =[]
      list.forEach((item)=>{
        const musicData = item.data       
        if(musicData.songid && musicData.albumid){
          //遍历循环获取歌曲源url
          let songUrl = ''
          getSongs(musicData.songmid).then((res)=>{
            songUrl = res.req_0.data.midurlinfo[0].purl  
            ret.push(createSong(musicData,songUrl)) //不需要一个一个new传值 
          })
        }
      })
      return ret
    }
  }
}
</script>

<style>
  .rank-detail{
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
  .rank-loading{
    margin-top: 30px;
    width: 100%;
  }
</style>
