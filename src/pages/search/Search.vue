<template>
  <div class="search">
    <!--输入框组件-->
  	<search-box @query="getQuery" ref="searchbox"></search-box>
    <scroll class="search-scroll" ref="scroll" :data="shortcut">
      <div>
        <!--热门搜索关键词组件-->
        <search-hotkey v-show="!query" @hotkey="getHotkey" @addQuery="addQuery"></search-hotkey>
        <!--搜索历史列表组件-->
        <search-history 
          v-show="searchHistory.length && !query" 
          @select="addQuery" 
          :searches="searchHistory"
        ></search-history>
      </div>
    </scroll> 
    <!--搜索列表组件-->
    <div class="search-result" v-show="query" >
      <search-suggest 
            @listScroll="blurInput" 
            @selectSinger="selectSinger"            
            :query="query"
          ></search-suggest>	
    </div>
    <router-view/>
  </div>
</template>

<script>
import SearchBox from '@/common/searchbox/SearchBox'	//引入公共组件搜索框
import Scroll from '@/common/scroll/Scroll'  //引入公共组件搜索框
import SearchHotkey from './components/SearchHotkey'	//引入组件热门关键词
import SearchHistory from './components/SearchHistory'  //引入组件热门关键词
import SearchSuggest from './components/SearchSuggest'	//引入组件搜索结果展示
import {mapGetters} from 'vuex'
import {playlistMixin,searchMixin} from '@/common/js/mixin' //引入mixin重复方法

export default {
  name: 'Search',
  mixins:[playlistMixin,searchMixin],
  components:{
  	SearchBox,
  	SearchHotkey,
    SearchHistory,
  	SearchSuggest,
    Scroll
  },
  computed:{
    shortcut(){
      //因为要监听热门关键词数据和搜索结果数据，而且是异步的
      return this.hotKey.concat(this.searchHistory)
    },
    ...mapGetters([
      'singer',
    ])
  },
  data(){
  	return {
  		hotKey:'',
  		query:''
  	}
  },
  methods:{
/******mixin方法引入************/
    handlePlaylist(playlist){
      const bottom = playlist.length>0 ? '60px':''
        this.$refs.scroll.$el.style.bottom = bottom
        this.$refs.scroll.refresh()
    },
/*****跳转路由，歌手详情页*********/
      selectSinger(){
        this.$router.push({
          path:`/search/${this.singer.id}`
        })
      },
    getHotkey(item){
      this.hotkey=item
    },
/*********获取输入框组件的值**********/
  	getQuery(item){
  		this.query = item
  	}
  },
}
</script>

<style>
	.search{
		position: fixed;
		top:85px;
		left: 0;
		bottom: 0;
		width: 100%;
	}
  .search-result{
    position: absolute;
    top:60px;
    width: 100%;
    bottom: 0;
    overflow: hidden;
  }
 .search-scroll{
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
