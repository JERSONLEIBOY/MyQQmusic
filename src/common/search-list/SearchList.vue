<template>
  <div class="search-list">
    <ul>
      <li v-for="item of searches" @click="selectItem(item)">
        <p>{{item}}</p>
        <i class="iconfont" @click.stop="deleteOne(item)">&#xe674;</i>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'SearchList',
  props:{
    searches:{
      type:Array,
      default:[]
    }
  },
  methods:{
    //派发给父组件执行
    selectItem(item){
      this.$emit('select',item)
    },
    deleteOne(item){
      this.$emit('deleteOne',item)
    }
  }

}
</script>

<style>
  .search-list ul{
    font-size: 0;
  }
  .search-list li{
    display: flex;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    border-bottom: 0.8px solid #eee;
    color: #000;
  }
  .search-list li:last-child{
    border-bottom: none;
  }
  .search-list li p{
    flex: 1;
  }
  .search-list li i{
    color: rgba(7,17,27,0.6);
  }
</style>
