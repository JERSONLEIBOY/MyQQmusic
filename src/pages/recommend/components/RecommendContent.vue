<template>
  <!--歌单内容部分-->
  <div class="recommend-content">
    <h1>热门歌单</h1>
    <!--歌单列表-->
    <ul>
      <li v-for="item of discList" :key="item.listennum" @click="selectMenu(item)">
        <div class="recommend-content_img">
          <img width="60" height="60" v-lazy="item.imgurl" />
        </div>
        <div class="recommend-content_text">
          <h2>{{item.creator.name}}</h2>
          <p>{{item.dissname}}</p>
        </div>
      </li>
    </ul>
    <!--加载中 公共组件-->
    <div class="recommend-loading">
      <loading v-show="!discList.length"></loading>
    </div>
  </div>
</template>

<script>
import Loading from '@/common/loading/loading'
import {mapMutations} from 'vuex'

export default {
  name: 'RecommendContent',
  props:{
    discList:{
      type:Array
    }
  },
  components:{
    Loading
  },
  methods:{
    selectMenu(item){
      this.$router.push({
        path:`/recommend/${item.dissid}`
      })
      this.setMenu(item)
    },
    //存入vuex数据方法
    ...mapMutations({
      setMenu:'SET_MENU'
    })
  }
}
</script>

<style>
/*标题样式*/
  .recommend-content h1{
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    background-color: rgba(7,17,27,0.1);
    color: #31c27c;
  }
/*列表外部整体样式*/
  .recommend-content ul li{
    display: flex;
    box-sizing: border-box;
    padding: 20px 20px 10px 20px ;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .recommend-content ul li:last-child{

    border-bottom: none;
  }
/*列表内容样式*/
  .recommend-content_img{
    flex: 0 0 60px;
    width: 60px;
    padding-right: 20px;
  }
  .recommend-content_text{
    flex: 1;
    /*内容再为flew，设置垂直居中*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 20px;
    overflow: hidden;
    font-size: 14px;
  }
  .recommend-content_text h2{
    margin-bottom: 10px;
  }
  .recommend-content_text p{
    color: rgb(7,17,27,0.6);
    font-size: 12px;
  }
/*加载中组件位置*/
  .recommend-loading{
    margin-top: 30px;
    width: 100%;
      
  }
</style>
