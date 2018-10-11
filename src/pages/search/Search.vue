<template>
  <div class="search">
    <!--输入框组件-->
  	<search-box @query="getQuery" ref="searchbox"></search-box>
    <scroll  ref="scroll" :data="shortcut">
      <div class="search-scroll">
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
    <search-suggest 
          @listScroll="blurInput" 
          @selectSinger="selectSinger" 
          v-show="query" 
          :query="query"
        ></search-suggest>	
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
import {playlistMixin} from '@/common/js/mixin' //引入mixin重复方法

export default {
  name: 'Search',
  mixins:[playlistMixin],
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
      'searchHistory'
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
/*********滚动前，收起键盘****************/
    blurInput(){
      //执行子组件搜索框的事件，这个事件操作input标签收起键盘
      this.$refs.searchbox.blur()
    },
/*****跳转路由，歌手详情页*********/
    selectSinger(){
      this.$router.push({
        path:`/search/${this.singer.id}`
      })
    },
/********获取热门关键词子组件的值********/
  	addQuery(item){
  		this.$refs.searchbox.setQuery(item)
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
 .search-scroll{
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
