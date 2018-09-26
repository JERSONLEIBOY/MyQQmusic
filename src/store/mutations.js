/**
 *引入type作事件名
 *定义mutations对象变量，内容是方法
 *输出mutation
*/

import * as types from './mutation-types'	//es6语法，引入所有作为变量名

const mutations = {
	//方法
	[types.SET_SINGER](state,singer){	//state固定，singer是参数
		state.singer = singer
	}
}
export default mutations