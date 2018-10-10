<template>
  <div>
    <div class="search-history" >
      <div class="search-history_title">
        <h1>搜索历史</h1>
        <i class="iconfont" @click="showConfirm">&#xe61d;</i>
      </div>     
      <!--公共组件，历史列表，其他页面会用到-->
      <search-list @select="select" @deleteOne="deleteSearchHistory" :searches="searches"></search-list>
    </div>
    <!--弹窗组件-->
    <confirm 
      ref="confirm" 
      confirmBtnText="清空" 
      text="是否清空所有搜索历史"
      @confirm="clearSearchHistory"
    ></confirm>
  </div>
</template>

<script>
import searchList from '@/common/search-list/searchList'
import confirm from '@/common/confirm/confirm'
import {mapActions} from 'vuex'

export default {
  name: 'SearchHistory',
  components:{
    searchList,
    confirm
  },
  props:{
    searches:{
      type:Array,
      default:[]
    }
  },
  methods:{
    //点击搜索历史li
    select(item){
      this.$emit('select',item)
    },
    showConfirm(){
      this.$refs.confirm.show()
    },
    ...mapActions([
      'deleteSearchHistory',
      'clearSearchHistory'  //直接在html中调用action方法
    ])
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
