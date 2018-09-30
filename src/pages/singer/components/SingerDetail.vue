<template>
  <transition name="slide">
  <div class="singer-detail">
    <music-list :title="singer.name" :bgimg="singer.singer_pic" :songs="songs"></music-list>
    <!--加载中 公共组件-->
    <div class="singer-loading">
      <loading v-show="singer"></loading>
    </div>
  </div>
</transition>
</template>

<script>
import MusicList from '@/common/musiclist/MusicList'

import {getSingerDetail,getSongs} from '@/api/singer'  //引入api的后台数据
import {ERR_OK} from '@/api/config' //引入自定义的公共变量
import Loading from '@/common/loading/loading'
import {mapGetters} from 'vuex'
import {createSong} from '@/common/js/song.js'

export default {
  name: 'SingerDetail',
  components:{
    Loading,
    MusicList
  },
  computed:{
    ...mapGetters([
        'singer'
      ])
  },
  data(){
    return {
      songs : []
    }
  },
  created(){
    //console.log(this.singer.id)

    this._getSingerDetail()
  },
  methods:{
    //数据获取方法，执行api的js方法    
    _getSingerDetail(){
      //当前页面刷新，获取不到动态id(只有点击触发)，即返回singer路由
      if(!this.singer.id){
        this.$router.push('/singer')
      } 
      //获取数据的歌手id不是通过子组件传递父组件，再传递进来当前组件
      //而是通过子组件存入数据进store。当前组件引入store
      //数据需要提取，封装成一个类（其他页面的数据也要这样处理）
      //console.log(this.singer.id)
      getSingerDetail(this.singer.id).then((res)=>{
        if(res.code === ERR_OK){
          //console.log(res.data.list)
          this.songs = this._normalizeSongs(res.data.list)  //数据提取方法
          //console.log(this.songs)
        }
      })

    },
    //数据提取方法，引入类
    _normalizeSongs(list){
      let ret = []  //新建空数组，push进提取的数据
      
      list.forEach((item)=>{
        let musicData = item.musicData  //let {musicData} = item  //初步提取数据
        if(musicData.songid && musicData.albummid){
          //获取歌曲源url数据
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
  .singer-detail{
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
  .singer-loading{
    margin-top: 30px;
    width: 100%;
  }
</style>
