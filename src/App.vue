<template>
  <div id="app">
    <all-header></all-header>
    <all-tab></all-tab>
    <router-view/>
  </div>
</template>

<script>
import AllHeader from '@/components/AllHeader'
import AllTab from '@/components/AllTab'
export default {
  name: 'App',
  components:{
    AllHeader,
    AllTab
  }
}
</script>

<style>

</style>
