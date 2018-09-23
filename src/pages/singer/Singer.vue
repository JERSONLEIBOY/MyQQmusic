<template>
	<scroll class="singer" :theData="hot.item">
	  <div>
	    <singer-content :hot="hot"></singer-content>
	  </div>
	  <router-view/>
	</scroll>
</template>

<script>
import {getSingers} from '@/api/singer'	//引入api的后台数据
import {ERR_OK} from '@/api/config'	//引入自定义的公共变量
import SingerContent from './components/SingerContent'
import Scroll from '@/common/scroll/Scroll'

export default {
  name: 'Singer',
  components:{
  	SingerContent,
  	Scroll
  },
  data(){
  	return {
  		singerlist:[],
  		hot:{}
  	}
  },
  mounted(){
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
  	}
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
