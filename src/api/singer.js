/**
 *
*/

import jsonp from '@/common/js/jsonp'	//引入jsonp模块
import {commonParams,object} from './config'
import axios from 'axios'

//方法js不做成defaul，vue引入时要单花括号
/*export function getSingers(){
	//自己判断截取出url前半段
	//？？？这里我是从XHR中的json中拿到的，不是jsonp？？？
	const urlfront = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
	//把hash做成对象,es6创建对象并赋值,
	//hash获取不了，要手动输入所有，把对象分2类，固定和不固定
	//固定的hash写在变量js模块里， config.js
	const thehash = Object.assign({},commonParams,{
		platform: 'yqq',
		uin: 0,
		needNewCode: 0,
		format: 'json',
	})
	console.log(jsonp(urlfront,thehash,test))
	//执行jsonp模块
	return jsonp(urlfront,thehash,test)
}*/

//歌单数据，放在同一个js模块中
export function getSingers(){
	//自己判断截取出url前半段
	//通过自身模拟服务器访问有host权限的数据
	//先传入url和host获取服务器作为url，再传入hash完整获取
	const urlfront = '/api/getSingers'
	console.log(urlfront)

	//把hash做成对象,es6创建对象并赋值,
	//hash获取不了，要手动输入所有，把对象分2类，固定和不固定
	//固定的hash写在变量js模块里， config.js
	const thehash = Object.assign({},commonParams,{		
		platform: 'yqq',
		uin: 0,
		needNewCode: 0,
		format: 'json',
		data: {"comm":{"ct":24,"cv":10000},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}}
	})
	//执行jsonp模块
	return axios.get(urlfront,{
		params:thehash
	}).then((res)=>{
		//console.log(res.data)
		return Promise.resolve(res.data)
	})
}


//歌手详情页面数据
export function getSingerDetail(id){
	//自己判断截取出url前半段
	//？？？这里我是从XHR中的json中拿到的，不是jsonp？？？
	const urlfront = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
	//把hash做成对象,es6创建对象并赋值,
	//hash获取不了，要手动输入所有，把对象分2类，固定和不固定
	//固定的hash写在变量js模块里， config.js
	const thehash = Object.assign({},commonParams,{
		platform: 'h5page',
		needNewCode: 1,
		order: 'listen',
		from: 'h5',
		format: 'jsonp',
		num: 100,
		begin: 0,
		singerid:id,
	})
	//console.log(thehash)
	//执行jsonp模块
	return jsonp(urlfront,thehash,object)
}

//歌曲源数据
export function getSongs(mid){
	//自己判断截取出url前半段
	//通过自身模拟服务器访问有host权限的数据
	//先传入url和host获取服务器作为url，再传入hash完整获取
	const urlfront = '/api/getSongs'
	//console.log(urlfront)

	//把hash做成对象,es6创建对象并赋值,
	//hash获取不了，要手动输入所有，把对象分2类，固定和不固定
	//固定的hash写在变量js模块里， config.js
	const thehash = Object.assign({},commonParams,{		
		platform: 'yqq',
		uin: 0,
		needNewCode: 0,
		format: 'json',
		data: {"req":{
					"module":"CDN.SrfCdnDispatchServer",
					"method":"GetCdnDispatch",
					"param":{"guid":"8412769120","calltype":0,"userip":""}
				},
				"req_0":{
					"module":"vkey.GetVkeyServer",
					"method":"CgiGetVkey",
					"param":{"guid":"8412769120",
					"songmid":[`${mid}`],
					"songtype":[0],"uin":"0",
					"loginflag":1,
					"platform":"20"}
				},
				"comm":{"uin":0,  "format":"json",  "ct":20,  "cv":0}
			}
	})
	//执行jsonp模块
	return axios.get(urlfront,{
		params:thehash
	}).then((res)=>{
		//console.log(res.data)
		return Promise.resolve(res.data)
	})
}


//歌词源数据
export function getLyric(mid){
	//自己判断截取出url前半段
	//通过自身模拟服务器访问有host权限的数据
	//先传入url和host获取服务器作为url，再传入hash完整获取
	const urlfront = '/api/getLyric'
	//console.log(urlfront)

	//把hash做成对象,es6创建对象并赋值,
	//hash获取不了，要手动输入所有，把对象分2类，固定和不固定
	//固定的hash写在变量js模块里， config.js
	const thehash = Object.assign({},commonParams,{		
		platform: 'yqq',
		uin: 0,
		needNewCode: 0,
		format: 'json',
		songmid: mid,
		pcachetime: +new Date()		
	})
	//执行jsonp模块
	return axios.get(urlfront,{
		params:thehash
	}).then((res)=>{
		//console.log(res.data)
		return Promise.resolve(res.data)
	})
}

