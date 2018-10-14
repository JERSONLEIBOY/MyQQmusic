<template>
<transition name="list-fade">
  <div class="player-list" v-show="ifShowList" @click="hiddenList">
    <div class="player-list_wrapper" @click.stop>
      <div class="player-list_header">
        <i class="iconfont">&#xe66c;</i>
        <h1>123</h1>
        <i class="iconfont">&#xe61d;</i>
      </div>
      <scroll ref="listContent" :data="sequenceList" class="player-list_content">
        <ul>
          <li ref="listItem" v-for="(item,index) of sequenceList" @click="selectItem(item,index)">
            <i class="iconfont" :class="getCurrentIcon(item)"></i>
            <p>{{item.name}}</p>
            <i class="iconfont">&#xe703;</i>
            <i class="iconfont">&#xe674;</i>
          </li>
        </ul>
      </scroll>
      <div class="player-list_operate">
        <div class="player-list_operate--add">
          <i>+</i>
          <span>添加歌曲到队列</span>
        </div>
      </div>
      <div class="player-list_close" @click="hiddenList">
        <span>关闭</span>
      </div>
    </div>
  </div>
</transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters,mapMutations} from 'vuex'  //引入vuex
import {playMode} from '@/common/js/config' //引入公共变量
import Scroll from '@/common/scroll/Scroll' //引入滚动公共组件

  export default {
    name: 'PlayerList',
    data(){
      return {
        ifShowList:false
      }
    },
    computed:{
      ...mapGetters([
        'sequenceList',
        'playlist',
        'mode',
        'currentSong'
      ])
    },
    components:{
      Scroll,
    },
    methods:{
      showList(){
        this.ifShowList=true
        setTimeout(()=>{
          this.$refs.listContent.refresh()  //刷新，数据是未展开时就传入了，无法作为刷新依据
          this.scrollToCurrent(this.currentSong)
        },200)       
      },
      hiddenList(){
        this.ifShowList=false
      },
/*动态图标_正在播放*/
      getCurrentIcon(item){
        if(this.currentSong.id===item.id){
          return 'icon-zhengzaibofang'
        }else{
          return ''
        }
      },
/*点击歌曲切换*/
      selectItem(item,index){
        //播放列表展示的是顺序列表而不是播放列表的原因是：随机播放整个列表要刷新
        //当随机播放时，点击顺序列表的歌曲，要在播放列表中的index切换
        if(this.mode === playMode.random){
          index = this.playlist.findIndex((song)=>{
            return song.id===item.id
          })
        }
        this.setCurrentIndex(index) //设置为点击的index（顺序播放的的index）或者随机的正确index
      },
/*播放列表滚动到正在播放，展开和切换时触发*/
      scrollToCurrent(current){
        //找到在顺序列表中的当前歌曲
        const index = this.sequenceList.findIndex((song)=>{
          return current.id===song.id
        })
        this.$refs.listContent.scrollToElement(this.$refs.listItem[index],300)
      },

      ...mapMutations({
        setCurrentIndex:'SET_CURRENT_INDEX',
      })
    },
    watch:{
      currentSong(newSong,oldSong){
        if(!this.ifShowList || newSong.id===oldSong.id) {
          //判断点击的和正在播放的是同一首，则不触发滚动事件
          return 
        }
        this.scrollToCurrent(newSong)
      }
    }
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
    font-size: 0;
    height: 40px;
    line-height: 40px;
    padding: 0 20px 0 20px;
    overflow: hidden;
    border-bottom: 0.6px solid #eee;
  }
  .player-list_content li:last-child{
    border-bottom: none;
  }
  .player-list_content i{
    margin-right: 10px;
    font-size: 14px;
  }
  .player-list_content i:last-child{
    margin-right: 0;
  }
  .player-list_content p{
    flex: 1;
    font-size: 14px;

  }
/*播放列表添加按钮样式*/
  .player-list_operate{
    width: 160px;
    margin:15px auto 20px auto;
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

/*展开播放列表页的动画*/
  .list-fade-enter-active,.list-fade-leave-active{
    transition: opacity 0.3s;
  }
  .list-fade-enter, .list-fade-leave-to{
    opacity: 0;
  }
  .player-list_wrapper{
    transition: all 0.3s
  }
  .list-fade-enter .player-list_wrapper, .list-fade-leave-to .player-list_wrapper{
    transform: translate3d(0, 100%, 0)
  }
</style>
