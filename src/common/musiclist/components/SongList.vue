<template>
  <div class="songlist" >
    <ul>
      <li v-for="(item,index) of songs" @click="selectItem(item,index)">
        <!--排名图标，动态显示-->
        <div class="songlist-rank" v-show="rank">
          <span :class="_getRankCls(index)">{{_getRankText(index)}}</span>
        </div>
        <!--歌曲列表文字内容-->
        <div class="songlist-text">
          <h2>{{item.name}}</h2>
          <p>{{getDesc(item)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>


export default {
  name: 'SongList',
  //根据可能需要的值，围绕编写
  props:{
    songs:{
      type:Array,
      default:[]
    },
    rank:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    getDesc(song){
      return `${song.singer}·${song.album}`
    },
    //点击获取li的数据信息传给父组件
    selectItem(item,index){
      this.$emit('select',item,index)
    },
    /******动态样式，排名前三名图标******/
    _getRankCls(index){
      if(index<=2){
        return `songlist-rank_icon songlist-rank_icon${index}`
      }else{
        return 'songlist-rank_text'
      }
    },
    _getRankText(index){
      if(index>2){
        return index+1
      }
    }
  }
 
}
</script>

<style>
  .songlist{
    background-color: #fff;
  }
  .songlist ul li{
    display: flex;
    box-sizing: border-box;
    height: 64px;
    padding: 0 20px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
/*排名图标样式*/
  .songlist-rank{
    flex: 0 0 25px;
    width: 25px;
    text-align: center;
    line-height: 64px;
    margin-right: 30px; 
  }
  .songlist-rank_icon{
    display: inline-block;
    width: 25px;
    height: 24px;
    margin:auto 0;
    background-size: 25px 24px;
  }
  .songlist-rank_icon0{
    background-image: url(../../../assets/styles/logo/first@3x.png);
  }
  .songlist-rank_icon1{
    background-image: url(../../../assets/styles/logo/second@3x.png);
  }
  .songlist-rank_icon2{
    background-image: url(../../../assets/styles/logo/third@3x.png);
  }
  .songlist-rank_text{
    margin:auto 0;
    font-size: 16px;
    color: #31c27c;
  }

  .songlist-text{
    margin:auto 0;
  }
  .songlist-text h2{
    font-size: 14px;
  }
  .songlist-text p{
    font-size: 10px;
    margin-top: 6px;
    color: rgba(7,17,27,0.6);

  }
</style>
