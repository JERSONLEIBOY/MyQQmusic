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

//获取热门搜索关键词数据
export function getHotKey(){
	//自己判断截取出url前半段
	const urlfront = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

	//把hash做成对象,es6创建对象并赋值,
	//hash获取不了，要手动输入所有，把对象分2类，固定和不固定
	//固定的hash写在变量js模块里， config.js
	const thehash = Object.assign({},commonParams,{
		notice: 0,
		platform: 'h5',
		needNewCode: 1,
	})
	//执行jsonp模块
	return jsonp(urlfront,thehash,object)
}

//获取搜索结果数据
/*export function getSearch(query,page,zhida){
	//自己判断截取出url前半段
	const urlfront = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

	//把hash做成对象,es6创建对象并赋值,
	//hash获取不了，要手动输入所有，把对象分2类，固定和不固定
	//固定的hash写在变量js模块里， config.js
	const thehash = Object.assign({},commonParams,{
		w: query,	//关键词
		p: page,	//展示页数
		catZhida: zhida ? 1 : 0,	//是否单独展示歌手
		notice: 0,
		platform: 'h5',
		needNewCode: 1,		
		zhidaqu: 1,		
		t: 0,
		flag: 1,
		ie: 'utf-8',
		sem: 1,
		aggr: 0,
		perpage: 20,
		n: 20,	
		remoteplace: 'txt.mqq.all',
	})
	//执行jsonp模块
	return jsonp(urlfront,thehash,object)
}*/
//
//搜索结果数据
export function getSearch(query,page,zhida){
	//自己判断截取出url前半段
	//通过自身模拟服务器访问有host权限的数据
	//先传入url和host获取服务器作为url，再传入hash完整获取
	const urlfront = '/api/getSearch'
	//console.log(urlfront)

	//把hash做成对象,es6创建对象并赋值,
	//hash获取不了，要手动输入所有，把对象分2类，固定和不固定
	//固定的hash写在变量js模块里， config.js
	const thehash = Object.assign({},commonParams,{		
		w: query,	//关键词
		p: page,	//展示页数
		catZhida: zhida ? 1 : 0,	//是否单独展示歌手
		notice: 0,
		platform: 'h5',
		needNewCode: 1,		
		zhidaqu: 1,		
		t: 0,
		flag: 1,
		ie: 'utf-8',
		sem: 1,
		aggr: 0,
		perpage: 20,
		n: 20,	
		remoteplace: 'txt.mqq.all',
		format: 'json',
	})
	//执行jsonp模块
	return axios.get(urlfront,{
		params:thehash
	}).then((res)=>{
		//console.log(res.data)
		return Promise.resolve(res.data)
	})
}
