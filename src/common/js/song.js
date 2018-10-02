/**
 *创建实例对象Songe
 *初始化实例对象
 *调用实例对象（传入参数）
*/

//引入获取歌词
import {getLyric} from '@/api/singer'
import {ERR_OK} from '@/api/config'
import {Base64} from 'js-base64'


//创建实例对象
export default class Song{
	constructor({id,mid,singer,name,album,duration,image,url}){
		this.id = id
		this.mid = mid 
		this.singer = singer
		this.name = name
		this.album = album
		this.duration = duration
		this.image = image
		this.url = url
	}
	//获取数据
	//封装成new的类方法，不直接获取
	//执行api的js方法 
	getLyric(){
		if(this.lyric){
			return Promise.resolve(this.lyric)
		}
		return new Promise((resolve,reject)=>{
			getLyric(this.mid).then((res)=>{
	  			if(res.code === ERR_OK){
	  				//console.log(Base64.decode(res.lyric))
	  				this.lyric = Base64.decode(res.lyric)
	  				resolve(this.lyric)
	  			}else{
	  				reject('no lyric')
	  			}
  			})
		})
		
	}		
  	
}

//调用实例对象
export function createSong(musicData,songUrl){
	return new Song({
		id:musicData.songid,
		mid:musicData.songmid,
		singer:filterSinger(musicData.singer),
		name:musicData.songname,
		album:musicData.albumname,
		duration:musicData.interval,
		image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
		url:`http://dl.stream.qqmusic.qq.com/${songUrl}`
	})
}

//歌手是个对象数组，可能有多个歌手，要提取出name
export function filterSinger(singer){
	let ret = []
	if(!singer){
		return 
	}
	singer.forEach((item)=>{
		ret.push(item.name)
	})
	return ret.join('/')
}