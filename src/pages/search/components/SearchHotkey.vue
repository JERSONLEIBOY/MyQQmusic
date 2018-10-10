<template>
  <div>
    <div class="search-hotkey">
      <h1>热门搜索</h1>
      <ul>
        <li @click="addQuery(item.k)" v-for="item of hotkey">{{item.k}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getHotKey} from '@/api/search'  //引入获取数据方法
import {ERR_OK} from '@/api/config' //引入获取数据常用变量

export default {
  name: 'SearchHotkey',
  data(){
    return {
      hotkey:[]
    }
  },
  methods:{
    /**获取数据方法*****/
    _getHotKey(){
      getHotKey().then((res)=>{
        if(res.code === ERR_OK){
          this.hotkey = res.data.hotkey.slice(0,10)
          this.$emit('hotKey',this.hotkey)
        }
      })
    },
    /****点击事件把点击的hotkey传去给输入框*******/
    addQuery(item){
      
      this.$emit('addQuery',item)
    }
  },
  created(){
    this._getHotKey()
  },

}
</script>

<style>
  .search-hotkey{
    padding: 15px 15px 10px 15px;
  }
  .search-hotkey h1{
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .search-hotkey ul{
    font-size: 0;
  }
  .search-hotkey li{
    display: inline-block;
    font-size: 12px;
    padding: 0 10px;
    height: 24px;
    line-height: 24px;
    color: #000;
    border: 1px solid rgba(0,0,0,.6);
    border-radius: 99px;
    word-break: keep-all;
    margin-bottom: 10px;
    margin-right: 14px;
  }
</style>
