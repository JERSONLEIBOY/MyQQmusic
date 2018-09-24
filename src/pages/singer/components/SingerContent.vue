<template>
  <div class="singer-content">
    <ul>
      <h1>{{hot.title}}</h1>
      <router-link 
        tag="li" :to="'/singer/'+item.id" 
        v-for="item of hot.item"
        @click.native="handleSinger(item.id)"
      >
        <img width="50" height="50" v-lazy="item.singer_pic" />
        <p>{{item.name}}</p>
      </router-link> 
    </ul> 
    <!--加载中 公共组件-->
    <div class="singer-loading">
      <loading v-show="!hot.title"></loading>
    </div>
  </div>
</template>

<script>
import Loading from '@/common/loading/loading'

export default {
  name: 'RecommendContent',
  props:{
    hot:{
      type:Object
    }
  },
  components:{
    Loading
  },
  methods:{
    handleSinger(singer){
      this.$emit('clickSinger',singer)
    }
  }
}
</script>

<style>
  .singer-content ul{
    /*padding-bottom: 30px;*/
  }
/*标题样式*/
  .singer-content ul h1{
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    padding-left: 20px;
    background-color: #eee;
  }
/*列表样式*/
  .singer-content ul li{
    display: flex;
    align-items: center;
    padding: 10px 0 10px 20px;
    border-bottom: 1px solid #eee;
  }
  .singer-content ul li:last-child{
    border-bottom: none;
  }
  .singer-content ul li img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .singer-content ul li p{
    margin-left: 10px;
    font-size: 14px;
  }
/*加载中组件位置*/
  .singer-loading{
    margin-top: 30px;
    width: 100%;
  }
</style>
