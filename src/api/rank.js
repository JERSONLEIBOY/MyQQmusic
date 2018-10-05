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
export function getTopList(){
	//自己判断截取出url前半段
	//？？？这里我是从XHR中的json中拿到的，不是jsonp？？？
	const urlfront = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

	//把hash做成对象,es6创建对象并赋值,
	//hash获取不了，要手动输入所有，把对象分2类，固定和不固定
	//固定的hash写在变量js模块里， config.js
	const thehash = Object.assign({},commonParams,{
		notice: 0,
		platform: 'h5',
		needNewCode: 1,
		uin:0,
	})
	//执行jsonp模块
	//console.log(jsonp(urlfront,thehash,object))
	return jsonp(urlfront,thehash,object)
}

//获取排行榜歌曲列表数据
export function getRankList(topid){
	//自己判断截取出url前半段
	//？？？这里我是从XHR中的json中拿到的，不是jsonp？？？
	const urlfront = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

	//把hash做成对象,es6创建对象并赋值,
	//hash获取不了，要手动输入所有，把对象分2类，固定和不固定
	//固定的hash写在变量js模块里， config.js
	const thehash = Object.assign({},commonParams,{
		notice: 0,
		platform: 'h5',
		needNewCode: 1,
		uin:0,
		tpl: 3,
		page: 'detail',
		type: 'top',
		topid: topid,
	})
	//执行jsonp模块
	//console.log(jsonp(urlfront,thehash,object))
	return jsonp(urlfront,thehash,object)
}
