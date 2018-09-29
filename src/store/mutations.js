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
	},

	//播放数据存入方法
	[types.SET_PLAYING_STATE](state,flag){	
		state.playing = flag	//存入播放状态数据
	},
	[types.SET_FULL_SCREEN](state,flag){	
		state.fullScreen = flag	//存入展开状态数据
	},
	[types.SET_PLAYLIST](state,list){	
		state.playlist = list	//存入播放列表数据
	},
	[types.SET_SEQUENCE_LIST](state,list){	
		state.sequenceList = list	//存入歌曲列表数据
	},
	[types.SET_PLAY_MODE](state,mode){	
		state.mode = mode	//存入播放模式数据
	},
	[types.SET_CURRENT_INDEX](state,mode){	
		state.currentIndex = mode	//存入当前歌曲序列数据
	},
}
export default mutations