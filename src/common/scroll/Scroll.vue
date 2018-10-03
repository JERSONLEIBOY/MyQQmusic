<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  //根据可能需要的值，围绕编写
  props:{
    //这些参数手册上看
    probeType:{
      type:Number,
      default:1
    },
    click:{
      type:Boolean,
      default:true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    //传入数据，用于监听是否渲染完成，就refresh
    theData:{
      type:Array,
      default:null
    }
  },
  mounted(){
    setTimeout(()=>{
      this._initScroll()
    },20)
  },
  methods:{
    //生命周期，创建BScroll
    _initScroll(){
      if(!this.$refs.wrapper){
        return 
      }
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,
        click:this.click
      })

      if (this.listenScroll) {
        let me = this
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos)
        })
      }
    },

    //外部组件，获取到这个公共组件的dom可以使用这里的方法
    refresh(){
      //console.log('轮播图加载完成，执行刷新scroll')
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }

  },
  //监听数据渲染进来
  watch:{
    theData(){
      setTimeout(()=>{
        //console.log('数据传递进来，刷新scroll')
        this.refresh()
      },20)
    }
  }
}
</script>

<style>

</style>
