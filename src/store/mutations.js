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
		state.playlist = Object.assign([], list)	//博客解决一堆红色警报，不要在outside state	
		//state.playlist = list	//存入播放列表数据
	},
	[types.SET_SEQUENCE_LIST](state,list){
		state.sequenceList = Object.assign([], list)	
		//state.sequenceList = list	//存入歌曲列表数据
	},
	[types.SET_PLAY_MODE](state,mode){	
		state.mode = mode	//存入播放模式数据
	},
	[types.SET_CURRENT_INDEX](state,mode){	
		state.currentIndex = mode	//存入当前歌曲序列数据
	},

	/*存入数据的方法*/
	[types.SET_MENU](state,menu){	//state固定，menu是参数
		state.menu = menu
	},
	/*存入数据的方法*/
	[types.SET_TOPLIST](state,topList){	//state固定，topList是参数
		state.topList = topList
	},
	/**/
	/*存入搜索历史数据的方法*/
	[types.SET_SEARCH_HISTORY](state,history){	//state固定，SEARCH_HISTORY是参数
		state.searchHistory = history
	},
	/*存入播放历史数据的方法*/
	[types.SET_PLAY_HISTORY](state,history){	//state固定，PLAY_HISTORY是参数
		state.playHistory = history
	},
	/*存入喜欢的歌数据的方法*/
	[types.SET_FAVORITE_LIST](state,list){	//state固定，PLAY_list是参数
		state.favoriteList = list
	},
}
export default mutations