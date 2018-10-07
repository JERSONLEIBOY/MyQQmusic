<template>
  <scroll :data="query" class="search-suggest">
    <ul>
      <li v-for="(item,index) of result">
        <i class="iconfont " :class="_otherIcon(item)">
          <img 
            v-if="item.type ==='singer'" 
            width="40" 
            height="40" 
            :src="_getSingerImg(item)"/>
        </i>
        <div class="search-suggest_text">
          <h3>{{resultTitle(item)}}</h3>
          <p>{{resultDics(item)}}</p>
        </div>
      </li>
    </ul>
  </scroll>
</template>

<script>
import {getSearch} from '@/api/search'  //引入获取数据方法
import {ERR_OK} from '@/api/config' //引入获取数据常用变量
import {createSong} from '@/common/js/song.js'  //提取数据的方法做成新对象
import {getSongs} from '@/api/singer'  //获取歌曲url数据的方法
import Scroll from '@/common/scroll/Scroll' //引入公共组件滚动

const TYPE_SINGER = 'singer'

export default {
  name: 'SearchSuggest',
  props:{
    query:{
      type:String,
      default:''
    }
  },
  components:{
    Scroll
  },
  data(){
    return {
      page:1,
      showSinger:true,
      result:[],
      searchSongs:[],
      zhida:{}
    }
  },
  computed:{
    
  },
  methods:{
    /******判断展示歌手或是歌曲搜索结果********/
    resultTitle(item){
      //当数据是歌手的时候展示歌手数据
      if(item.type===TYPE_SINGER){
        return item.singername
      }else{
        return item.name
      }
    },
    resultDics(item){
      //同理
      if(item.type===TYPE_SINGER){
        return item.songnum
      }else{
        return item.singer
      }
    },
    //判断获取歌手图片
    _getSingerImg(item){
      return `https://y.gtimg.cn/music/photo_new/T001R68x68M000${item.singmid}.jpg?max_age=2592000`
    },
    _otherIcon(item){
      if(item.type===TYPE_SINGER){
        return 'search-suggest_img'
      }else{
        return 'icon-yinyue search-suggest_icon'
      }
    },
    /**获取数据方法*****/
    _getSearch(){
      getSearch(this.query,this.page,this.showSinger).then((res)=>{
        if(res.code === ERR_OK){
          this.zhida = res.data.zhida
          this.searchSongs = this._nomalizeSongs(res.data.song.list)
          /*this.result = this._genResult(res.data)
          console.log(this.result)*/
        }
      })
    },
    //有zhida就合并对象到数组中
    _genResult(data,value){
      let ret = []
      if(data.singerid){
        ret.push({...this.zhida,...{type:TYPE_SINGER}})  //es6语法，对象拓展符。等同于object.assign()新建对象
        //console.log(ret)
      }
      if (value) {
        ret = ret.concat(value)
      }
      this.result = ret
    },
    //歌曲列表数据的提取
    _nomalizeSongs(list){
      let ret = []
      list.forEach((musicData)=>{
        if(musicData.songid && musicData.albummid){
          //获取歌曲源url数据
          let songUrl = ''
          getSongs(musicData.songmid).then((res)=>{
            if(res.code === ERR_OK){
              songUrl = res.req_0.data.midurlinfo[0].purl  
              ret.push(createSong(musicData,songUrl)) 
            }            
          })
        }
      })
      return ret
    }
  },
  watch:{
    //监听输入框值，湖区搜索结果数据
    query(){
      this._getSearch()
    },
    //监听异步问题，对数据无法操作，把值赋值出来
    searchSongs(value){
      this._genResult(this.zhida,value)
    }
  },

}
</script>

<style>
  .search-suggest{
    position: absolute;
    top: 60px;
    width: 100%;
    bottom: 0;
    overflow: hidden;
  }
  .search-suggest ul li{
    position: relative;
    display: flex;
    height: 55px;
    padding-left: 10px;
    border-bottom: 1px solid #eee;
  }
  .search-suggest ul li i{
    flex: 0 0 40px;
    display: inline-block;
    width: 40px;
    height: 40px;
  }
  .search-suggest_icon{
    font-size: 18px;
    line-height: 55px;
    text-align: center;
    color: #ccc;
  }
  .search-suggest_img{
    width: 40px;
    height: 40px;
    margin-top: 5px;
    border-radius: 50%;
    margin-right: 5px;
  }
  .search-suggest_text{
    flex: 1;
    box-sizing: border-box;
  }
  .search-suggest_text h3{
    margin: 8px 0 0 2px;
    line-height: 16px;
    font-size: 14px;
    font-weight: normal;
    color: #000;
  }
  .search-suggest_text p{
    color: #808080;
    margin-top: 6px;
    font-size: 12px;
  }
</style>
