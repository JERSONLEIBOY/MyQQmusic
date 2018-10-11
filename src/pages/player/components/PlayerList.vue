<template>
  <div class="player-list">
    <div class="player-list_wrapper">
      <div class="player-list_header">
        <i class="iconfont">&#xe66c;</i>
        <h1>123</h1>
        <i class="iconfont">&#xe61d;</i>
      </div>
      <div class="player-list_content">
        <ul>
          <li>
            <i class="iconfont">&#xe62e;</i>
            <p></p>
            <i>like</i>
            <i class="iconfont">&#xe674;</i>
          </li>
        </ul>
      </div>
      <div class="player-list_operate">
        <div class="player-list_operate--add">
          <i>+</i>
          <span>添加歌曲到队列</span>
        </div>
      </div>
      <div class="player-list_close">
        <span>关闭</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">


  export default {
    name: 'PlayerList',
    data(){
      return {
        
      }
    },
    props: {
      
    },
  }
</script>

<style>
/*整个页面位置和透明蒙层*/
  .player-list{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 200;
    background-color: rgba(7,17,27,0.5);
  }
/*播放列表外部样式*/
  .player-list_wrapper{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
  }
/*播放列表头部样式*/
  .player-list_header{
    padding: 10px 30px 10px 20px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: black;
    background-color: #eee;
    border-bottom: 0.6px solid #ccc;
  }
  .player-list_header h1{
    flex: 1;
  }
  .player-list_header i{
    font-size: 18px;
  }
/*播放列表内容样式*/
  .player-list_content{
    max-height: 240px;
    overflow: hidden;
  }
  .player-list_content li{
    display: flex;
    height: 40px;
    line-height: 40px;
    padding: 0 30px 0 20px;
    border-bottom: 0.6px solid #eee;
  }
  .player-list_content p{
    flex: 1;

  }
/*播放列表添加按钮样式*/
  .player-list_operate{
    width: 160px;
    margin:20px auto 20px auto;
  }
  .player-list_operate--add{
    padding: 8px 16px;
    border-radius: 99px;
    border: 1px solid #31c27c;
    color: #31c27c;
  }
/*播放列表关闭按钮样式*/
  .player-list_close{
    text-align: center;
    line-height: 40px;
    background: #eee;
    font-size: 14px;
    color: #31c27c;
  }
</style>
