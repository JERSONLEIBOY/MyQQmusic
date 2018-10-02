<template>
  <div class="progress-bar" ref="progressBar" @click="_progressClick">
    <div class="progress-bar_inner">
      <div class="progress-bar_progress" ref="progress"></div>
      <div 
        class="progress-bar_button" 
        ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend.prevent="progressTouchEnd"
      >
        <span></span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

const progressBtnWidth = 16
  export default {
    data(){
      return {
        touch:{}
      }
    },
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    watch:{
      //百分比随着父组件计算属性会不断变化传入进来
      percent(item){
        //判断，当touch时，不执行随时间变化的进度条
        if(item>=0 &&!this.touch.initiated){
          //操作相应的dom，进度条的width，小球的偏移
          //计算bar的dom总长
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          //计算偏移的长度
          const offsetWidth = item * barWidth
          //设置dom的宽度和偏移量
          this._offset(offsetWidth)
        }       
      }
    },
    methods:{
      _offset(offsetWidth){
        //进度条的宽度
        this.$refs.progress.style.width = `${offsetWidth}px`
        //按钮小球的偏移
        this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`
      },
      /****拖拽事件，e是拖拽的信息****/
      progressTouchStart(e){
        //设置空对象中的数据
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX  //开始坐标
        this.touch.left = this.$refs.progress.clientWidth //触摸时进度条的当前宽度
      },
      progressTouchMove(e){
        if(!this.touch.initiated){
          return  //当执行完touch时退出方法 ,有可能是点击了一下，设置这个判断
        }
        const deltaX = e.touches[0].pageX-this.touch.startX //(拖拽距离)计算拖拽后坐标-开始坐标
        //计算偏移的量
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth,Math.max(0,this.touch.left+deltaX))  //max(xx,xx)取当中大的值，使拖拽往回拉不会相加为超过进度条，min(,)同理，最后值不能超过进度条dom宽度
        this._offset(offsetWidth)
      },
      progressTouchEnd(){
        this.touch.initiated = false
        this._triggerPercent()
      },
      _triggerPercent(){
        //计算拖动后的百分比给父组件，覆盖掉时间的百分比
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth/barWidth
        this.$emit('percentChange',percent)
      },
      //点击改变进度，用上一个封装的方法，传入宽度改变进度天，进度条改变百分比
      _progressClick(e){
        //点击事件dom的内置方法
        //this._offset(e.offsetX) //点击在当前dom的坐标
        const rect = this.$refs.progressBar.getBoundingClientRect() //整个进度条的dom
        const offsetWidth = e.pageX - rect.left //点击在页面的坐标-dom的左
        this._offset(offsetWidth)
        this._triggerPercent()
      },
    }
  }
</script>

<style>
  .progress-bar{
    height: 30px;
  }
/*进度条总长*/
  .progress-bar_inner{
    position: relative;
    top: 13px;
    height: 4px;
    background-color: rgba(0,0,0,0.3);
  }
/*进度条内部*/
  .progress-bar_progress{
    position: absolute;
    height: 100%;
    background-color: #31c27c;
  }
  .progress-bar_button{
    position: absolute;
    left: -8px;
    top: -13px;
    width: 30px;
    height: 30px;
  }
  .progress-bar_button span{
    display: inline-block;
    position: relative;
    top: 7px;
    left: 7px;
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    border: 3px solid #fff;
    border-radius: 50%;
    background-color: #31c27c;
  }
</style>
