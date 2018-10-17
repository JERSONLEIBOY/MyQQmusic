<template>
	<transition name="drop">
    <div class="top-tip" v-show="showFlag" @click="hide">
      <slot></slot>
    </div>
  </transition>
</template>

<script>


export default {
  name: 'TopTip',
  props:{
    delay:{
      type:Number,
      default:2000
    }
  },
  data(){
    return {
      showFlag:false
    }
  },
  methods:{
    show(){
      this.showFlag = true
      //定时器，关闭
      clearTimeout(this.timer)
      this.timer = setTimeout(()=>{
        this.hide()
      },this.delay)
    },
    hide(){
      this.showFlag = false
    }
  }
}
</script>

<style>
	.top-tip{
		position: fixed;
    top: 0;
    width: 100%;
    z-index: 500;
    background-color: #31c27c;
	}
  .drop-enter-active,.drop-leave-active{
    transition: all 0.3s
  }
  .drop-enter,.drop-leave-to{
    transform: translate3d(0,-100%,0);
  }
</style>
