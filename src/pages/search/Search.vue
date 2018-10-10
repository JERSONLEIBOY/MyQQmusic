<template>
  <div class="search">
  	<search-box @query="getQuery" ref="searchbox"></search-box>
  	<search-hotkey v-show="!query" @addQuery="addQuery"></search-hotkey>
    <search-history v-show="searchHistory.length" :searches="searchHistory"></search-history>
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
import SearchHotkey from './components/SearchHotkey'	//引入组件热门关键词
import SearchHistory from './components/SearchHistory'  //引入组件热门关键词
import SearchSuggest from './components/SearchSuggest'	//引入组件搜索结果展示
import {mapGetters} from 'vuex'

export default {
  name: 'Search',
  components:{
  	SearchBox,
  	SearchHotkey,
    SearchHistory,
  	SearchSuggest
  },
  computed:{
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
</style>
