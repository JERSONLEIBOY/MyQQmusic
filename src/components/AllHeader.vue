<template>
  <div class="allheader">
    <h1>高仿QQ音乐</h1>
    <router-link to="/user" tag="i" class="iconfont">&#xe640;</router-link>
  </div>
</template>

<script>
export default {
  name: 'AllHeader'

}
</script>

<style>
  .allheader{
    /*z-index: 99;*/
    position: fixed;
    top: 0;
    left: 0;
    height: 44px;
    width: 100%;
    text-align: center;
    background-color: #31c27c;
    color: #fff;
  }
  .allheader h1{
    font-size: 16px;
    line-height: 44px;
  }
  .allheader i{
    position: absolute;
    right: 5px;
    top: 0;
    line-height: 44px;
    font-size: 24px;
    color: #fff;
  }
</style>
