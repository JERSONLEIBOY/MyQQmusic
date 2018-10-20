<template>
<transition name="slide">
	<div class="user-center">
    <div class="user-center_header">
      <!-- 头部返回按钮 -->
      <div class="user-center_back" @click="_handleBack">
        <
      </div>
      <!-- 头部选项卡 -->
      <div class="user-center_switches">
        <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
      </div>
    </div>   
    <!-- 底下随机播放列表歌曲的按钮 -->
    <div class="user-play-wrapper">
      <div class="user-play" >
        <span>♥</span>
        <p>随机播放全部</p>
      </div>
    </div>
  </div>
  <router-view/>
</transition>
</template>

<script>
import Switches from '@/common/switches/Switches' //选项卡公共组件

export default {
  name: 'UserCenter',
  components:{
    Switches,
  },
  data(){
    return {
      switches:[
        {name:'我喜欢的'},
        {name:'最近听的'}
      ],
      currentIndex:0,
    }
  },
  methods:{
/*返回按钮的路由点击事件*/
    _handleBack(){
      this.$router.back()
    },
/*点击选项卡切换状态*/
    switchItem(index){
      this.currentIndex = index
    }
  }
}
</script>

<style>
/*整体外部布局*/
	.user-center{
		position: fixed;
		top:0;
		left: 0;
		bottom: 0;
		width: 100%;
    overflow: hidden;
    background-color: #fff;
	}
/*头部布局*/
  .user-center_header{
    display: flex;
    position: relative;
    height: 40px;
    background-color: #fff;/*#31c27c;*/
  }
  .user-center_back{
    position: absolute;
    left: 5px;
    top: 5px;
    width: 30px;
    height: 30px;
    background-color: rgba(7,17,27,0.3);
    color: #fff;
    border-radius: 50%;
    font-size: 24px;
    line-height: 30px;
  }
  .user-center_switches{
    flex: 1;
    padding:5px 40px;
  }
/*随机播放按钮布局*/
  .user-play-wrapper{
    margin: 15px 0;
    width: 100%;
    align-items: center;
    text-align: center;
  }
  .user-play{
    background-color: #31c27c;
    color: #fff;
    border-radius:50px;
    width: 120px;
    margin: 0 auto;
    padding: 8px 10px;
  }
  .user-play span{
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
    font-size: 18px;
  }
  .user-play p{
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
  }

</style>
