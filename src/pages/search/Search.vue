<template>
  <div class="search">
  	<search-box @query="getQuery" ref="searchbox"></search-box>
  	<search-hotkey v-show="!query" @addQuery="addQuery"></search-hotkey>
    <search-suggest @selectSinger="selectSinger" v-show="query" :query="query"></search-suggest>
    <router-view/>
  </div>
</template>

<script>
import SearchBox from '@/common/searchbox/SearchBox'	//引入公共组件搜索框
import SearchHotkey from './components/SearchHotkey'	//引入组件热门关键词
import SearchSuggest from './components/SearchSuggest'	//引入组件搜索结果展示
import {mapGetters} from 'vuex'

export default {
  name: 'Search',
  components:{
  	SearchBox,
  	SearchHotkey,
  	SearchSuggest
  },
  computed:{
    ...mapGetters([
      'singer'
    ])
  },
  data(){
  	return {
  		hotKey:'',
  		query:''
  	}
  },
  methods:{
/*****跳转路由，歌手详情页*********/
    selectSinger(){
      this.$router.push({
        path:`/search/${this.singer.id}`
      })
    },
  	//获取热门关键词子组件的值
  	addQuery(item){
  		this.$refs.searchbox.setQuery(item)
  	},
  	//获取输入框组件的值
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
