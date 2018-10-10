<template>
  <div>
    <div class="search-history" >
      <div class="search-history_title">
        <h1>搜索历史</h1>
        <i class="iconfont">&#xe61d;</i>
      </div>     
      <!--公共组件，历史列表，其他页面会用到-->
      <search-list :searches="searches"></search-list>
    </div>
  </div>
</template>

<script>
import searchList from '@/common/search-list/searchList'

export default {
  name: 'SearchHistory',
  components:{
    searchList,
  },
  props:{
    searches:{
      type:Array,
      default:[]
    }
  },
  methods:{
  }

}
</script>

<style>
  .search-history{
    padding: 15px 15px 10px 15px;
  }
  .search-history_title{
    display: flex;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .search-history_title h1{
    flex: 1; 
    font-weight: 700;      
  }
</style>
