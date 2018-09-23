<template>
  <div class="alltab">
    <router-link
      class="alltab-item"
      tag="div"
      to="/recommend"
    >
      推荐
    </router-link>
    <router-link
      class="alltab-item"
      tag="div"
      to="/singer"
    >
      歌手
    </router-link>
    <router-link
      class="alltab-item"
      tag="div"
      to="/rank"
    >
      排行
    </router-link>
    <router-link
      class="alltab-item"
      tag="div"
      to="/search"
    >
      搜索
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'AllTab'

}
</script>

<style>
  .alltab{
    z-index: 99;
    position: fixed;
    top: 44px;
    left: 0;
    display: flex;
    height: 40px;
    width: 100%;
  }
  .alltab-item{
    flex: 1;
    background-color: #fff;
    color: rgba(0,0,0,0.6);
    font-size: 14px;
    line-height: 40px;
    text-align: center;
  }
  .router-link-active{
    color: #31c27c;
    border-bottom: 2px solid #31c27c;
  }
</style>
