<template>
<transition name="slide">
	<div class="user-center">
    <div class="back" @click="_handleBack">
      <
    </div>

    <h1>用户中心</h1>
    <div class="musiclist-play-wrapper">
      <div class="musiclist-play" >
        <span>♥</span>
        <p>随机播放全部</p>
      </div>
    </div>
  </div>
  <router-view/>
</transition>
</template>

<script>


export default {
  name: 'UserCenter',
  methods:{
    _handleBack(){
      this.$router.back()
    }
  }
}
</script>

<style>
	.user-center{
		position: fixed;
		top:0;
		left: 0;
		bottom: 0;
		width: 100%;
    overflow: hidden;
    background-color: #fff;
	}
</style>
