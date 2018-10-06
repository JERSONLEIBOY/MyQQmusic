<template>
  <div class="search-box">
    <i class="iconfont">&#xe601;</i>
    <input type="text" v-model="query" class="search-box_ins" :placeholder="placeholder" />
    <i v-show="query" @click="_clearQuery" class="iconfont">&#xe674;</i>
  </div>
</template>

<script>

export default {
  name: 'SearchBox',
  props:{
    placeholder:{
      type:String,
      default:'搜索歌曲、专辑、歌手'
    }
  },
  data(){
    return {
      query:''  //输入框的双向数据绑定，用于判断删除符号显示，和传出数据
    }
  },
  methods:{
    _clearQuery(){
      this.query=''
    },
    /******设置方法给父组件调用**********/
    setQuery(item){
      this.query = item
    }
  },
  watch:{
    //输入框的值改变就派发事件，值出去
    query(value){
      this.$emit('query',value)
    }
  }
}
</script>

<style>
  .search-box{
    display: flex;  /*使用flew布局，排列图标和输入框*/
    width: 100%;
    height: 60px;
    padding: 0 10px;
    align-items: center;
    box-sizing: border-box;
    border-radius: 6px;
    background-color: #f4f4f4;
  }
  .search-box i{
    font-size: 16px;
    color: #ccc;
  }
  .search-box input{
    flex: 1;
    margin: 0 5px;
    padding: 8px 10px; 
    line-height: 18px;
    color: black;
    background-color: #fff;
    border-radius: 6px;
  }
  /*输入框默认内容样式*/
  ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color:#ccc;
    font-size: 12px;
  }
</style>
