<template>
<transition name="slide">
  <div class="add-song" v-show="showFlag" @click.stop>
    <div class="add-song_header">
      <h1>添加歌曲到列表</h1>
      <i @click="hidden" class="iconfont">&#xe674;</i>
    </div>
    <!--搜索输入框-->
    <div class="add-song_search--wrapper">
      <search-box placeholder="搜索歌曲" @query="search"></search-box>
    </div>
    <!--搜索结果页面-->
    <div class="add-song_search--result" v-show="query">
      <search-suggest :query="query"></search-suggest>
    </div>
    <!--搜索记录、历史页面-->
    <div class="add-song_search--shortcut" v-show="!query">
      
    </div>
  </div>
</transition>
</template>

<script>
import SearchBox from '@/common/searchbox/SearchBox'  //引入搜索框
import SearchSuggest from '@/pages/search/components/SearchSuggest'  //引入搜索结果列表

export default {
  name: 'AddSong',
  data() {
      return {    	
        showFlag:false,
        query:''
      }
  },
  components:{
    SearchBox,
    SearchSuggest
  },
  methods:{
/*****控制整个页面的打开关闭**********/
    show(){
      this.showFlag = true 
    },
    hidden(){
      this.showFlag = false
    },
/*****搜索框的值操作关联**********/
    search(item){
      this.query=item
    }
  }

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
    top:44px;
    width: 100%;
    bottom: 0;
    overflow: hidden;
  }
</style>
