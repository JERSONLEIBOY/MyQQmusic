<template>
	<scroll class="singer" :theData="hot.item">
	  <div>
	    <singer-content @clickSinger="clickSinger" :hot="hot"></singer-content>
	  </div>
    <router-view/>
	</scroll>
</template>

<script>
import {getSingers} from '@/api/singer'	//引入api的后台数据
import {ERR_OK} from '@/api/config'	//引入自定义的公共变量
import SingerContent from './components/SingerContent'
import Scroll from '@/common/scroll/Scroll'
import {mapMutations} from 'vuex' //引入存数据进store的方法

export default {
  name: 'Singer',
  components:{
  	SingerContent,
  	Scroll
  },
  data(){
  	return {
  		singerlist:[],
  		hot:{},
      singerId:0
  	}
  },
  created(){
  	this._getSingers() 
  },
  methods:{
  	//获取轮播图数据
  	_getSingers(){
  		//执行api的js方法 		
  		getSingers().then((res)=>{
  			if(res.code === ERR_OK){
  				console.log(res.singerList.data.singerlist)
  				this.singerlist = res.singerList.data.singerlist
  			}
  		})
  	},
  	_normalizeSinger(){
  		console.log('1')
  		//创建对象，标题和数组
  		let map = {
  			hot:{
  				title:'热门',
  				item:[]
  			}
  		}
  		//遍历所有原数组
  		this.singerlist.forEach((item,index)=>{
  			//取前十个为热门，push
  			if(index<10){
  				map.hot.item.push({
  					id:item.singer_id,
  					name:item.singer_name,
  					singer_pic:item.singer_pic
  				})
  			}
  		})
  		console.log(map.hot)
  		this.hot = map.hot
  	},
    clickSinger(singer){
      //子组件点击触发父组件事件，跳转路由，并传入数据进store
      this.$router.push({
        path: `/singer/${singer.id}`  //es6语法，详情页的动态路由
      })
      //调用store方法，存入数据参数
      this.setSinger(singer)
    },
    ...mapMutations({
      setSinger:'SET_SINGER'  //用到事件名
    })
  },
  watch:{
  	singerlist(){
  		this._normalizeSinger()	
  	}
  }
}
</script>

<style>
	.singer{
		position: absolute;
		top:85px;
		left: 0;
		bottom: 0;
		width: 100%;
	}
</style>
