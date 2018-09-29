/**
 *组件对数据进行一步操作的时候用
 *	1、异步数据
 *	2、一个动作存入多个mutation的时候
*/

//引入types
import * as types from './mutation-types'

//点击歌曲，存入歌曲数组和当前歌曲序列
export const selectPlay = function({commit,state},{list,index}){
	//使用commit方法传值，存入mutation
	commit(types.SET_SEQUENCE_LIST,list)	//存入当前歌曲列表
	commit(types.SET_PLAYLIST,list)	//存入当前播放列表
	commit(types.SET_CURRENT_INDEX,index)	//存入当前歌曲序列
	commit(types.SET_FULL_SCREEN,true)	//存入当前展开状态
	commit(types.SET_PLAYING_STATE,true)	//存入当前播放状态
}