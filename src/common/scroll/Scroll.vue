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
    //开启点击，默认true
    click:{
      type:Boolean,
      default:true
    },
    //开启监听滚动的值，默认false
    listenScroll: {
      type: Boolean,
      default: false
    },
    //开启滚动到底部事件，默认false
    pullup:{
      type:Boolean,
      default:false
    },
    //开启滚动前事件，用于收起键盘
    beforScoll:{
      type:Boolean,
      default:false
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
      //开启滚动获取值的事件
      if (this.listenScroll) {
        let me = this
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos)
        })
      }
      //开启滚动到底部触发事件
      if(this.pullup){
        let me = this
        this.scroll.on('scrollEnd',()=>{
          //当滚动值(上拉手势，是正数)小于scroll的压面y+50时，触发事件
          if(me.scroll.y <= (me.scroll.maxScrollY+50)){
            //箭头函数要把this指向纠正，但是箭头函数内的判断里就不需要纠正了
            me.$emit('scrollToEnd')
          }
        })
      }
      //开启滚动前事件收起键盘
      if(this.beforScoll){
        this.scroll.on('beforScollStart',()=>{
          this.$emit('beforScoll')
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
