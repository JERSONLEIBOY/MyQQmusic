/**
 *封装jsonp插件的使用，方便给所有要获取数据使用
 *思维：
 *	根据要传入的值，围绕编写，url，对象参数
 *
 *使用的是变量，即要考虑变量的所有情况
 *	可能遇到的情况：
 *		1、根据hash获取的是url后半段参数
 *		2、url前半段需要自己截取，且情况较多
 *		3、url前半段，可能已经有参数即xxxx?xx=xxxx
 *		4、也可能没有参数，即xxxx
 *		5、也可能没有hash
 *		5、即判断是否要拼接hash，又是否要拼接？
 *
*/


import originJsonp from 'jsonp'	//引入jsonp插件

//使用了default则调用js的时候不用单花括号，像组件一样即可
export default function json(urlfront,thehash,object){
	//根据需求，传入url前半段，hash后半段，和数据对象

	//拼接url,判断是否有问号，无论是否再最后
	let url = ''
	url = urlfront + ( url.indexOf('?'<0)? '?':'&' )+currentHash(thehash)


	//再使用es6的api的promise实例，可以连接使用异步的回调函数，之后要用then
	return new Promise((resolve,reject)=>{
		//jsonp插件的参数是url，数据对象，回调函数，回调函数默认err data参数
		originJsonp(url,object,(err,data)=>{
			//成功连接url
			if(!err){
				resolve(data)
			} else{
				reject(err)
			}
		})
	})
}

//hash预判断，那对象变成字符串拼接，判断是否为空，并把第一个&去掉，因为可能是拼问号
function currentHash(thehash){
	//hash获取是多段对象
	let urlafter = ''
	//循环遍历对象，把键和值拼接
	for(let k in thehash){
		//可能有键无值，把值设为空字符，否则是none
		let truehash = thehash[k]!== undefined ? thehash[k]:''
		//拼接键值对的时候加上&和=
		urlafter += `&${k}=${encodeURIComponent(truehash)}`
	}
	//拼成字符串后的hash去掉最前面的&，因为可能前面是问号
	//谨慎，判断url是否为空，空的话执行截取字符串会报错
	return urlafter ? urlafter.substring(1):''
}