/**
 *json数据获取，不写在vue中，而是在api文件夹中
 *其他组件同理，都调用公共模块中的jsonpjs
 *这里执行jsonp模块
 *传入变量的值，真正成为数据的api，只要then就可以获取
 *
 *要做的是，把变量做好，url截取，和hash手动输入，并做成对象
*/

import jsonp from '@/common/js/jsonp'	//引入jsonp模块
import {commonParams,object} from './config'
import axios from 'axios'

//方法js不做成defaul，vue引入时要单花括号
export function getRecommend(){
	//自己判断截取出url前半段
	//？？？这里我是从XHR中的json中拿到的，不是jsonp？？？
	const urlfront = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

	//把hash做成对象,es6创建对象并赋值,
	//hash获取不了，要手动输入所有，把对象分2类，固定和不固定
	//固定的hash写在变量js模块里， config.js
	const thehash = Object.assign({},commonParams,{
		platform: 'h5',
		uin: 0,
		needNewCode: 1,
		g_tk:5381,
	})
	//执行jsonp模块
	return jsonp(urlfront,thehash,object)
}

//歌单数据，放在同一个js模块中
export function getDiscList(){
	//自己判断截取出url前半段
	//通过自身模拟服务器访问有host权限的数据
	//先传入url和host获取服务器作为url，再传入hash完整获取
	const urlfront = '/api/getDiscList'
	console.log(urlfront)

	//把hash做成对象,es6创建对象并赋值,
	//hash获取不了，要手动输入所有，把对象分2类，固定和不固定
	//固定的hash写在变量js模块里， config.js
	const thehash = Object.assign({},commonParams,{		
		picmid: 1,
		rnd: Math.random(),
		//g_tk: 834488777,
		hostUin: 0,
		platform: 'yqq',
		needNewCode: 0,
		categoryId: 10000000,
		sortId: 5,
		sin: 0,
		ein: 29,
		format: 'json',
	})
	//执行jsonp模块
	return axios.get(urlfront,{
		params:thehash
	}).then((res)=>{
		console.log(res.data)
		return Promise.resolve(res.data)
	})
}
