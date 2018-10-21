<template>
<transition name="slide">
	<div class="user-center">
    <!-- 头部布局 -->
    <div class="user-center_header">
      <!-- 头部返回按钮 -->
      <div class="user-center_back" @click="_handleBack">
        <
      </div>
      <!-- 头部选项卡 -->
      <div class="user-center_switches">
        <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
      </div>
    </div>   
    <!-- 底下随机播放列表歌曲的按钮 -->
    <div class="user-play-wrapper">
      <div class="user-play" >
        <span>♥</span>
        <p>随机播放全部</p>
      </div>
    </div>
    <!-- 列表内容布局 -->
    <div class="user-center_list--wrapper" ref="listWrapper">
      <scroll 
        class="user-center_list--scroll" 
        ref="favoriteList" 
        v-if="currentIndex===0" 
        :data="favoriteList"
      >
        <div class="user-center_list">
          <song-list :songs="favoriteList" @select="selectSong"></song-list>
        </div>          
      </scroll>

      <scroll 
        class="user-center_list--scroll" 
        ref="playHistory" 
        v-if="currentIndex===1" 
        :data="playHistory"
      >
        <div class="user-center_list">
          <song-list :songs="playHistory" @select="selectSong"></song-list>
        </div>
      </scroll>
    </div> 
    <!-- 没有数据的时候 -->
    <div class="no-result_wrapper" v-show="noResult">
      <no-result :title="noResultDesc"></no-result>
    </div>
  </div>
</transition>
</template>

<script>
import Switches from '@/common/switches/Switches' //选项卡公共组件
import Scroll from '@/common/scroll/Scroll'
import SongList from '@/common/musiclist/components/SongList'
import {mapGetters,mapActions} from 'vuex'
import Song from '@/common/js/song'
import {playlistMixin} from '@/common/js/mixin'
import NoResult from '@/common/no-result/NoResult'

export default {
  name: 'UserCenter',
  mixins:[playlistMixin],
  components:{
    Switches,
    Scroll,
    SongList,
    NoResult
  },
  computed:{
    noResult(){
      if(this.currentIndex===0){
        return !this.favoriteList.length
      }else{
        return !this.playHistory.length
      }
    },
    noResultDesc(){
      if(this.currentIndex===0){
        return "暂无收藏歌曲"
      }else{
        return "你还没有听过歌曲"
      }
    },
    ...mapGetters([
      'favoriteList',
      'playHistory'
    ])
  },
  data(){
    return {
      switches:[
        {name:'我喜欢的'},
        {name:'最近听的'}
      ],
      currentIndex:0,
    }
  },
  methods:{
/*返回按钮的路由点击事件*/
    _handleBack(){
      this.$router.back()
    },
/*点击选项卡切换状态*/
    switchItem(index){
      this.currentIndex = index
    },
/*点击列表歌曲，添加到播放且改变播放状态*/
    selectSong(song){
      this.insertSong(new Song(song))
    },
/*点击随机播放按钮*/
    random(){
      let list = this.currentIndex===0?this.favoriteList:this.playHistory
      if(list.length===0){
        return
      }
      list = list.map((item)=>{
        return new Song(item)
      })
      this.randomPlay({list})
    },
/*mixin适配播放器小组件的滚动定位*/
    handlePlaylist(playlist){
      const bottom = playlist.length>0?'60px':''
      this.$refs.listWrapper.style.bottom=bottom
      //刷新滚动，因为v-if要判断
      this.$refs.favoriteList && this.$refs.favoriteList.refresh()
      this.$refs.playHistory && this.$refs.playHistory.refresh()
    },
    ...mapActions([
      'insertSong',
      'randomPlay'
    ])
  }
}
</script>

<style>
/*整体外部布局*/
	.user-center{
		position: fixed;
		top:0;
		left: 0;
		bottom: 0;
		width: 100%;
    overflow: hidden;
    background-color: #fff;
	}
/*头部布局*/
  .user-center_header{
    display: flex;
    position: relative;
    height: 40px;
    background-color: #fff;/*#31c27c;*/
  }
  .user-center_back{
    position: absolute;
    left: 5px;
    top: 5px;
    width: 30px;
    height: 30px;
    background-color: rgba(7,17,27,0.3);
    color: #fff;
    border-radius: 50%;
    font-size: 24px;
    line-height: 30px;
  }
  .user-center_switches{
    flex: 1;
    padding:5px 40px;
  }
/*随机播放按钮布局*/
  .user-play-wrapper{
    margin: 15px 0;
    width: 100%;
    align-items: center;
    text-align: center;
  }
  .user-play{
    background-color: #31c27c;
    color: #fff;
    border-radius:50px;
    width: 120px;
    margin: 0 auto;
    padding: 8px 10px;
  }
  .user-play span{
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
    font-size: 18px;
  }
  .user-play p{
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
  }
/*列表样式--主要是滚动*/
  .user-center_list--wrapper{
    position: absolute;
    top: 90px;
    bottom: 0;
    width: 100%;
  }
  .user-center_list--scroll{
    height: 100%;
    overflow: hidden;
  }
</style>
