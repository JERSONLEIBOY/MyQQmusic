<template>
  <div class="progress-bar" ref="progressBar">
    <div class="progress-bar_inner">
      <div class="progress-bar_progress" ref="progress"></div>
      <div class="progress-bar_button" ref="progressBtn">
        <span></span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

const progressBtnWidth = 16
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    watch:{
      //百分比随着父组件计算属性会不断变化传入进来
      percent(item){
        //操作相应的dom，进度条的width，小球的偏移
        //计算bar的dom总长
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        //计算偏移的长度
        const offsetWidth = item * barWidth
        //进度条的宽度
        this.$refs.progress.style.width = `${offsetWidth}px`
        //按钮小球的偏移
        this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`
      }
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
