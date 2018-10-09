/**
 *操作本地存储，顺便计算数据
*/

//引入本地存储插件
import storage from 'good-storage'

/****actions操作搜索历史关键词******/
const SEARCH_KEY = '__search__' 	//双下划线，保证不会冲突
const SEARCH_MAX_LENGTH = 15	//定义搜索历史最多为15个存如数组

//操作搜索历史数组的方法
function insertArray(arr,val,maxLen,compare){	//(搜索记录数组，添加的项，最大数量，筛选方法)
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