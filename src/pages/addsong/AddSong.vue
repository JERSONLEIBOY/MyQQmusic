<template>
<transition name="slide">
  <div class="add-song" v-show="showFlag" @click.stop>
    <div class="add-song_header">
      <h1>添加歌曲到列表</h1>
      <i @click="hidden" class="iconfont">&#xe674;</i>
    </div>
    <!--搜索输入框-->
    <div class="add-song_search--wrapper">
      <search-box ref="searchbox" placeholder="搜索歌曲" @query="search"></search-box>
    </div>
    <!--搜索结果页面-->
    <div class="add-song_search--result" v-show="query">
      <search-suggest :query="query" :showSinger="showSinger" @listScroll="blurInput"></search-suggest>
    </div>
    <!--搜索记录、历史页面-->
    <div class="add-song_search--shortcut" v-show="!query">
      <switches 
        :switches="switches" 
        :currentIndex="currentIndex"
        @switch="switchItem"
      ></switches>
      <div class="add-song_list--wrapper">
        <scroll 
          class="add-song_list--scroll" 
          ref="songList" 
          v-if="currentIndex===0" 
          :data="playHistory"
        >
          <div class="add-song_list">
            <song-list :songs="playHistory" @select="selectSong"></song-list>
          </div>          
        </scroll>

        <scroll 
          class="add-song_list--scroll" 
          ref="searchList" 
          v-if="currentIndex===1" 
          :data="searchHistory"
        >
          <div class="add-song_list">
            <search-list :searches="searchHistory" @select="addQuery" @deleteOne="deleteSearchHistory"></search-list>
          </div>
        </scroll>
      </div> 
    </div>
  </div>
</transition>
</template>

<script>
import SearchBox from '@/common/searchbox/SearchBox'  //引入搜索框
import SearchSuggest from '@/pages/search/components/SearchSuggest'  //引入搜索结果列表
import {searchMixin} from '@/common/js/mixin'
import Switches from '@/common/switches/Switches'
import {mapGetters,mapActions} from 'vuex'
import Scroll from '@/common/scroll/Scroll'
import SongList from '@/common/musiclist/components/SongList'
import SearchList from '@/common/search-list/SearchList'
import Song from '@/common/js/song'

export default {
  name: 'AddSong',
  mixins:[searchMixin],
  data() {
      return {    	
        showFlag:false,
        query:'',
        showSinger:false,
        currentIndex:0, //传入选项卡的状态
        switches:[
          {name:'最近播放'},
          {name:'搜索历史'}
        ]
      }
  },
  components:{
    SearchBox,
    SearchSuggest,
    Switches,
    SongList,
    SearchList,
    Scroll
  },
  computed:{
    ...mapGetters([
      'playHistory'
    ])
  },
  methods:{
/*****控制整个页面的打开关闭**********/
    show(){
      this.showFlag = true 
      //解决无法滚动问题，因为display为none，高度未渲染
      setTimeout(()=>{
        if(this.currentIndex===0){
          this.$refs.songList.refresh()
        }else{
          this.$refs.searchList.refresh()
        }
      },20)
    },
    hidden(){
      this.showFlag = false
    },
/*****搜索框的值操作关联**********/
    search(item){
      this.query=item
    },
/********选项卡切换传入状态，动态高亮**************/
    switchItem(index){
      this.currentIndex = index
    },
/*******点击添加播放记录到播放列表*******************/
    selectSong(song,index){
      if(index!==0){
        this.insertSong(new Song(song))
      }
    },
    ...mapActions([
      'insertSong',
      'deleteSearchHistory',
    ])
  },

}
</script>

<style>
/*外部整体样式*/
  .add-song{
    z-index: 200;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
  }
/*页面头部样式*/
  .add-song_header{
    position: relative;
    height: 44px;
    background-color: #31c27c;
    text-align: center;
  }
  .add-song_header h1{
    line-height: 44px;
    font-size: 14px;
    color: #fff;
  }
  .add-song_header i{
    position: absolute;
    top: 0;
    line-height: 44px;
    right: 8px;
    font-size: 24px;
  }
/*搜索框定位样式*/
  .add-song_search--wrapper{

  }
/*搜索结果列表定位样式*/
  .add-song_search--result{
    position: absolute;
    top:104px;
    width: 100%;
    bottom: 0;
  }
/*选项卡样式*/
  .add-song_search--shortcut{
    margin: 20px;
  }
  .add-song_list--wrapper{
    position: absolute;
    top: 165px;
    bottom: 0;
    width: 100%;
  }
  .add-song_list--scroll{
    height: 100%;
    overflow: hidden;
  }
</style>
