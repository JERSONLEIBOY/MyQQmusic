<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>
<style>
  .loading{
    width: 100%;
    text-align: center;
  }
  .loading p{
    line-height: 20px;
    font-size: 14px;
    color: rgba(7,17,27,0.4);
  }
</style>
