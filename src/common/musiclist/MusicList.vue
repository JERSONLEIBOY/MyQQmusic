<template>
  <div class="musiclist">
    <router-link tag="div" to="/singer" class="musiclist-back"><</router-link>
    <h1>{{title}}</h1> 
    <div class="musiclist-bgimg" :style="singerimg" ref="bgimg">         
      <div class="musiclist-play-wrapper">
        <div class="musiclist-play">
          <span>♥</span>
          <p>随机播放全部</p>
        </div>
      </div>
      <div class="musiclist-bgimg_filter"></div>     
    </div>

    <!--歌曲列表组件-->
    <scroll :theData="songs" ref="songslist" class="songlist-wrapper">
      <div >
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import SongList from './components/SongList'
import Scroll from '@/common/scroll/Scroll'
  export default {
    components:{
      SongList,
      Scroll
    },
    props: {
      title:{
        type:String
      },
      bgimg:{
        type:String
      },
      songs:{
        type:Array
      }
    },
    computed:{
      singerimg(){
        return `background-image:url(${this.bgimg})`
      }
    },
    //生命周期把列表的top定位为图片dom的高
    mounted(){
      this.$refs.songslist.$el.style.top =  `${this.$refs.bgimg.clientHeight}px`
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
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
  }
  .musiclist-play{
    border:1px solid red;
    border-radius: 6px;
    width: 120px;
    padding: 2px 0;
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
  .songlist-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden; 
  }
</style>
