<template>
  <ul class="switches">
    <li 
      class="switches-item"
      v-for="(item,index) of switches"
      :class="{'switches-item_active':currentIndex===index}"
      @click="switchesItem(index)"
    >
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Switches',
  props:{
    switches:{
      type:Array,
      default:[]
    },
    currentIndex:{
      type:Number,
      default:0
    }
  },
  methods:{
    switchesItem(index){
      this.$emit('switch',index)
    }
  }
  
}
</script>

<style>
	.switches{
    display: flex;
    align-items: center;
    widows: 240px;
    margin: 0 auto;
    border: 1px solid #31c27c;
    border-radius: 5px;
  }
  .switches-item{
    flex: 1;
    padding: 8px;
    text-align: center;
    font-size: 12px;
    color: #31c27c;
  }
  .switches-item_active{
    background-color: #31c27c;
    color: #fff;
  }
</style>