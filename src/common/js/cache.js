/**
 *操作本地存储，顺便计算数据
*/

//引入本地存储插件
import storage from 'good-storage'

/****actions操作搜索历史关键词******/
const SEARCH_KEY = '__search__' 	//双下划线，保证不会冲突
const SEARCH_MAX_LENGTH = 15	//定义搜索历史最多为15个存如数组

/*新建一个本地缓存的变量*/
const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 200

/*新建一个本地缓存的变量*/
const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = '200'

//操作搜索历史数组的方法
function insertArray(arr,val,maxLen,compare){	//(搜索记录数组，添加的项，最大数量，筛选方法)
	console.log(arr)
	const index = arr.findIndex(compare) //判断是否以前有搜索过,compare在外部编写
	if(index===0){	//上一条搜索历史就是这个，就不需要添加历史
		return
	}
	if(index > 0){	//历史记录中有这条，把历史记录删了，重新添加
		arr.splice(index,1)
	}	
	arr.unshift(val)	//添加项目到第一项
	if(maxLen && arr.length > maxLen){	//大于最大数量的时候，删除最后一项
		arr.pop()
	}
}

/***********存入搜索历史到本地缓存***************************/
export function saveSearch(query){
	//如果已有历史就get缓存中的数组，没有就空数组
	let searches = storage.get(SEARCH_KEY,[])	//(自定义key,无值默认空数组)
	//对传入的项与已有数组进行操作
	insertArray(searches,query,SEARCH_MAX_LENGTH,(item)=>{
		return item===query
	})
	//把操作过后的数组set就直接替换掉原历史
	storage.set(SEARCH_KEY,searches)
	return searches
}

/******states获取本地缓存中的数据*********/
export function loadSearch(){
	return storage.get(SEARCH_KEY,[])
}

/*******actions删除搜索历史关键词*************/
function deleteFromArray(arr,compare){
	//找到点击的index
	const index = arr.findIndex(compare)
	if(index>-1){
		arr.splice(index,1)
	}
}

/*************删除本地缓存中的搜索历史***********************************/
export function deleteSearch(query){
	//如果已有历史就get缓存中的数组，没有就空数组
	let searches = storage.get(SEARCH_KEY,[])	//(自定义key,无值默认空数组)
	//对传入的项与已有数组进行操作
	deleteFromArray(searches,(item)=>{
		return item===query
	})
	//把操作过后的数组set就直接替换掉原历史
	storage.set(SEARCH_KEY,searches)
	return searches
}

/*************清空本地缓存中的搜索历史***********************************/
export function clearSearch(){
	//清空缓存
	storage.remove(SEARCH_KEY)
	//返回一个空数组
	return []
}

/*****存储本地缓存————播放记录*********/
export function savePlay(song){
	//获取到本地缓存中的数据
	let songs = storage.get(PLAY_KEY,[])
	//把歌曲对象处理成数组
	insertArray(songs,song,PLAY_MAX_LENGTH,(item)=>{	
		return item.id === song.id
	})
	//替换掉旧记录
	storage.set(PLAY_KEY,songs)
	return songs
}
/*****给state默认读取本地缓存**********/
export function loadPlay(){
	return storage.get(PLAY_KEY,[])
}


/*****存储本地缓存————我喜欢的*********/
export function saveFavorite(song){
	let songs = storage.get(FAVORITE_KEY,[])
	insertArray(songs,song,FAVORITE_MAX_LENGTH,(item)=>{
		return item.id===song.id
	})
	storage.set(FAVORITE_KEY,songs)
	return songs
}
/*************删除本地缓存中的搜索历史***********************************/
export function deleteFavorite(song){
	//如果已有历史就get缓存中的数组，没有就空数组
	let songs = storage.get(SEARCH_KEY,[])	//(自定义key,无值默认空数组)
	//对传入的项与已有数组进行操作
	deleteFromArray(songs,(item)=>{
		return item.id===song.id
	})
	//把操作过后的数组set就直接替换掉原历史
	storage.set(FAVORITE_KEY,songs)
	return songs
}
/*****给state默认读取本地缓存**********/
export function loadFavorite(){
	return storage.get(FAVORITE_KEY,[])
}