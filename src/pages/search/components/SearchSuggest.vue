<template>
  <scroll 
    :data="query" 
    :pullup="pullup"
    @scrollToEnd="searchMore"
    :beforScroll="beforScroll"
    @beforScroll="listScroll"
    ref="suggest"
    class="search-suggest"
  >
    <ul>
      <li @click="selectItem(item)" v-for="(item,index) of result">
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
      <!--下拉刷新的加载组件-->
      <loading v-show="hasMore"></loading>
    </ul>
    <!--无搜索结果组件-->
    <div class="search-nosuggest" v-show="!hasMore && !result.length">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>    
  </scroll> 
</template>

<script>
import {getSearch} from '@/api/search'  //引入获取数据方法
import {ERR_OK} from '@/api/config' //引入获取数据常用变量
import {createSong} from '@/common/js/song.js'  //提取数据的方法做成新对象
import {getSongs} from '@/api/singer'  //获取歌曲url数据的方法
import Scroll from '@/common/scroll/Scroll' //引入公共组件滚动
import loading from '@/common/loading/loading' //引入公共组件滚动
import NoResult from '@/common/no-result/NoResult' //引入公共组件无搜索结果
import Singer from '@/common/js/singer' //引入歌手数据提取方法类
import {mapMutations,mapActions} from 'vuex' //引入点击存入数据方法的vuex

const TYPE_SINGER = 'singer'
const perpage = 20 //搜索页一次展示多少数据常量

export default {
  name: 'SearchSuggest',
  props:{
    query:{
      type:String,
      default:''
    }
  },
  components:{
    Scroll,
    loading,
    NoResult
  },
  data(){
    return {
      page:1,
      showSinger:true,
      result:[],
      searchSongs:[],
      zhida:{},
      pullup:true,  //开启滚动组件的滚动到底部事件
      hasMore:false,  //用于判断是否执行重新获取数据的标识
      oldSearch:[],
      pushOver:false,
      beforScroll:true,  //开启滚动前事件，收起键盘
    }
  },
  computed:{
    
  },
  methods:{
/*****跳转路由，歌手详情页*********/
  selectItem(item){
    //判断是歌手，并把歌手数据提取出出来
    if(item.type===TYPE_SINGER){
      const singer = new Singer({
        id:item.singerid,
        mid:item.singermid,
        name:item.singername
      })
      //把点击的数据存入state自动渲染入歌手详情页
      this.setSinger(singer)
      this.$emit('selectSinger')     
    }else{
      //点击是歌曲,修改歌曲列表数据
      this.insertSong(item)
    }

  },
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
/*****下拉刷新，重新获取数据********/
    searchMore(){
      //需要判断当前数据是否已经是最新的hasMore,为fasle就不执行
      if(!this.hasMore){
        return 
      }
      this.page++   //获取到下一页的数据
      getSearch(this.query,this.page,this.showSinger,perpage).then((res)=>{
        if(res.code === ERR_OK){
          //把下一页数据，拼接上原页面数据
          this.searchSongs = this._nomalizeSongs(res.data.song.list)
          //判断是否还有新数据
          this._checkMore(res.data.song)
        }
      })
    },
/**获取数据方法*****/
    _getSearch(){
      this.hasMore = true   //默认设置true，然后判断已经是最新的时候置为false
      this.page = 1
      this.$refs.suggest.scrollTo(0,0)
      getSearch(this.query,this.page,this.showSinger,perpage).then((res)=>{
        if(res.code === ERR_OK){
          this.zhida = res.data.zhida
          this.searchSongs = this._nomalizeSongs(res.data.song.list)
          this._checkMore(res.data.song)   //执行判断是否还有数据，计算总数
          /*this.result = this._genResult(res.data)
          console.log(this.result)*/
        }
      })
    },
    //计算搜索结果总数，判断是否执行获取新数据
    _checkMore(data){
      //console.log(data.curnum+data.curpage*perpage)
      //console.log(data.totalnum)
      if(!data.list.length || (data.curnum+data.curpage*perpage) > data.totalnum){
        this.hasMore = false
      }
    },
    //有zhida就合并对象到数组中
    _genResult(data,newValue){
      let ret = []
      if(data.singerid){
        ret.push({...this.zhida,...{type:TYPE_SINGER}})  //es6语法，对象拓展符。等同于object.assign()新建对象
        //console.log(ret)
      }
      if (newValue) {
        let value = []        
        if(this.page>1){ 
          //console.log('新获取的一页数据'+ newValue)
          //console.log('存起来的旧数据'+this.oldSearch)
          value = this.oldSearch.concat(newValue)
          //console.log('拼起来的数据'+value)
          this.oldSearch = value
        }else{
          this.oldSearch = []
          value = newValue
          this.oldSearch = value
        }
        ret = ret.concat(value)
      }
      this.result = ret
    },
    //歌曲列表数据的提取
    _nomalizeSongs(list){
      let ret = []
      let pushIndex =0  //判断是否是最最后一次push 
      list.forEach((musicData)=>{
        if(musicData.songid && musicData.albummid){
          //获取歌曲源url数据
          let songUrl = ''         
          getSongs(musicData.songmid).then((res)=>{
            if(res.code === ERR_OK){
              songUrl = res.req_0.data.midurlinfo[0].purl  
              ret.push(createSong(musicData,songUrl)) 
              pushIndex++
              //console.log(pushIndex)
              //console.log(list.length)
              this.pushOver = list.length===pushIndex
            }            
          })
        }
      })
      return ret
    },
/*****滚动前触发事件，给父组件去收起键盘***********/
  listScroll(){
    this.$emit('listScroll')
  },
/****选择歌手存入歌手详情页数据*******/
    ...mapMutations({
      setSinger:'SET_SINGER'
    }),
/*******选择歌曲插入歌曲列表数据*************/
    ...mapActions([
      'insertSong'
    ])
  
  },
  watch:{
    //监听输入框值，湖区搜索结果数据
    query(){
      this._getSearch()
    },
    //监听异步问题，对数据无法操作，把值赋值出来
    searchSongs(newValue){
      console.log(this.pushOver)
      if(this.pushOver){     
        this._genResult(this.zhida,newValue)
      }     
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
/*无搜索结果组件位置*/
  .search-nosuggest{
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
  }
</style>
