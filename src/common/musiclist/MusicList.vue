<template>
  <div class="musiclist">
    <div @click="musiclistBack" class="musiclist-back"><</div>
    <h1>{{title}}</h1> 
    <div class="musiclist-bgimg" :style="singerimg" ref="bgimg" @click="random">         
      <div class="musiclist-play-wrapper">
        <div class="musiclist-play" >
          <span>♥</span>
          <p>随机播放全部</p>
        </div>
      </div>
      <div class="musiclist-bgimg_filter"></div>     
    </div>

    <!--歌曲列表组件-->
    <div class="wrapper-songlist" ref="songslist">
      <scroll 
        :theData="songs" 
        :probe-type="probeType" 
        :listen-scroll="listenScroll" 
        @scroll="scroll"
        ref="list"
        class="songlist-wrapper"
      >
        <div>
          <song-list @select="selectItem" :songs="songs"></song-list>
        </div>
      </scroll>

      <!--加载中 公共组件-->
      <div class="songslist-loading">
        <loading v-show="!songs.length"></loading>
      </div>
    </div>

    
  </div>
</template>
<script type="text/ecmascript-6">
import SongList from './components/SongList'
import Scroll from '@/common/scroll/Scroll'
import Loading from '@/common/loading/loading'
import {mapActions} from 'vuex'
import {playlistMixin}  from '@/common/js/mixin'  //引用多个组件的重复逻辑

  export default {
    mixins:[playlistMixin], //数组可以写多个mixin
    components:{
      SongList,
      Scroll,
      Loading
    },
    data(){
      return{
        scrollY:0,
      } 
    },
    props: {
      title:{
        type:String
      },
      bgimg:{
        type:String
      },
      songs:{
        type:Array,
        default(){
          return []
        }
      }
    },
    computed:{
      singerimg(){
        return `background-image:url(${this.bgimg})`
      }
    },
    methods:{
      scroll(pos){
        this.scrollY = pos.y
      },
      //获取子组件传递的点击数据信息
      selectItem(item,index){
        //把这些数据存入vuex中的mutations（一个动作使用多个mutation，使用actions）
        this.selectPlay({list:this.songs,index:index})
      },
      //设置播放参数action
      random(){
        this.randomPlay({list:this.songs})
      },
      //返回按钮
      musiclistBack(){
        this.$router.back()
      },
      //小播放组件显示时，重新定位和刷新scrol
      handlePlaylist(playlist){
        const bottom = playlist.length>0 ? '100px':''
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
      ...mapActions([
          'selectPlay',
          'randomPlay'
      ])
    },
    watch:{
      scrollY(newY){
        const percent = Math.abs(newY / this.$refs.bgimg.clientHeight)
        //超过顶部时，定住数值
        if(newY <= -184){
          //this.$refs.songslist.style.top = 40+'px'
          this.$refs.songslist.style.transform =  `translate3d(0,-184px,0)`
          //console.log(this.$refs.songslist.style.top)
        }else if(newY> -184 && newY<0){
          this.$refs.songslist.style.transform =  `translate3d(0,${newY}px,0)`
          //console.log(this.$refs.songslist.style.top)
        }else{
          //拉伸图片
          let scale = 1+percent
          this.$refs.bgimg.style.webkitTransform =  `scale${scale}`
        }
        
      }
    },
    created(){
      this.listenScroll=true,
      this.probeType=3
    },
    //生命周期把列表的top定位为图片dom的高
    mounted(){
      //this.$refs.songslist.style.transform = `translate3d(0,${this.$refs.bgimg.clientHeight}px,0)`
      //this.$refs.songslist.style.top =  `${this.$refs.bgimg.clientHeight}px`
    }
  }
</script>
<style>
/*外部样式*/
  .musiclist{
    z-index: 101;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
/*头部样式*/
  .musiclist-back{
    z-index: 50;
    display: block;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 6px;
    left: 16px;
    font-size: 24px;
  }
  .musiclist h1{
    z-index: 50;
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    /*no-wrap();*/
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    color: #fff;
  }
/*头部图片*/
  .musiclist-bgimg{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin:top;
    background-size: cover;
  }
  .musiclist-bgimg_filter{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(7,17,27,0.4);
  }
/*随机播放按钮*/
  .musiclist-play-wrapper{
    z-index: 50;
    position: absolute;
    bottom: 20px;
    left: 10%;
    width: 80%;
    align-items: center;
    text-align: center;
  }
  .musiclist-play{
    background-color: #31c27c;
    color: #fff;
    border-radius:50px;
    width: 120px;
    margin: 0 auto;
    padding: 10px 0;
  }
  .musiclist-play span{
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
    font-size: 18px;
  }
  .musiclist-play p{
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
  }
/*滚动列表的样式定位*/
  .wrapper-songlist{
    z-index: 50;
    position: relative;
    height: 100%;
    background-color: #fff; 
  }
  .songlist-wrapper{
    z-index: 50;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
  }
/*加载中组件位置*/
  .songslist-loading{
    z-index: 50;
    position: absolute;
    top:50px;

    width: 100%;
  }
</style>
