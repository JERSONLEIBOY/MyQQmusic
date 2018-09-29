<template>
  <div id="app">
    <all-header></all-header>
    <all-tab></all-tab>
    <router-view/>
    <!--播放器组件-->
    <player></player>
  </div>
</template>

<script>
import AllHeader from '@/components/AllHeader'
import AllTab from '@/components/AllTab'
import Player from '@/pages/player/Player'

export default {
  name: 'App',
  components:{
    AllHeader,
    AllTab,
    Player
  }
}
</script>

<style>

</style>
