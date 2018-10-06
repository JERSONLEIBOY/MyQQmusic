<template>
  <div class="search-suggest">
    <ul>
      <li>
        <i class="iconfont"></i>
        <div class="search-suggest_text">
          <h3></h3>
          <p></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getSearch} from '@/api/search'  //引入获取数据方法
import {ERR_OK} from '@/api/config' //引入获取数据常用变量

export default {
  name: 'SearchSuggest',
  props:{
    query:{
      type:String,
      default:''
    }
  },
  data(){
    return {
      page:1,
      showSinger:true
    }
  },
  methods:{
    /**获取数据方法*****/
    _getSearch(){
      getSearch(this.query,this.page,this.showSinger).then((res)=>{
        if(res.code === ERR_OK){
          console.log(res.data.song.list)
        }
      })
    },
  },
  watch:{
    query(){
      this._getSearch()
    }
  },

}
</script>

<style>
  
</style>
