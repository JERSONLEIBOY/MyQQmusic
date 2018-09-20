<template>
  <div id="app">
    <all-header></all-header>
    <router-view/>
  </div>
</template>

<script>
import AllHeader from '@/components/AllHeader'
export default {
  name: 'App',
  components:{
    AllHeader
  }
}
</script>

<style>

</style>
