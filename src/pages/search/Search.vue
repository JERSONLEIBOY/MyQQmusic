<template>
  <div class="search">
  	<search-box @query="getQuery" ref="searchbox"></search-box>
  	<search-hotkey @addQuery="addQuery"></search-hotkey>
    <search-suggest :query="query"></search-suggest>
  </div>
</template>

<script>
import SearchBox from '@/common/searchbox/SearchBox'	//引入公共组件搜索框
import SearchHotkey from './components/SearchHotkey'	//引入组件热门关键词
import SearchSuggest from './components/SearchSuggest'	//引入组件搜索结果展示

export default {
  name: 'Search',
  components:{
  	SearchBox,
  	SearchHotkey,
  	SearchSuggest
  },
  data(){
  	return {
  		hotKey:'',
  		query:''
  	}
  },
  methods:{
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
