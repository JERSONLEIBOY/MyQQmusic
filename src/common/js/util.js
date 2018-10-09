//封装随机抽取一个index
function getRandomInt(min,max){
	//math.random获取到的是0到1的随机小数
	//max-min+1 保证区域是包含min和max
	//+min是为了当区域是中间段时取的不是前面外部的随机数
	return Math.floor(Math.random()*(max-min+1)+min)
}
//重建数组，打乱顺序
//遍历循环数组，把从第一项开始于随机一项交换
export function shuffle(arr){
	let _arr = arr.slice()
	for (let i=0;i<_arr.length;i++){
		let j = getRandomInt(0,i)
		let x = _arr[i]
		_arr[i] = _arr[j]
		_arr[j] = x
	}
	return _arr
}



/*****节流定时器，延时执行，并封在封闭函数中不往下走***********/
export function debounce(func,delay) {
	// 这是那个封闭函数
	let timer

	//再执行延时即可
	return function (...args){
		//监听会持续执行 判断是否已有定时器
		if(timer){
			clearTimeout(timer)
		}
		timer = setTimeout(()=>{
			func.apply(this,args)	//修正this指向，传入延时方法的参数
		},delay)
	}
}