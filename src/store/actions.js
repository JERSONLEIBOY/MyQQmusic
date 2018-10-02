/**
 *组件对数据进行一步操作的时候用
 *	1、异步数据
 *	2、一个动作存入多个mutation的时候
*/

//引入types
import * as types from './mutation-types'
//引入播放状态码 
import {playMode} from '@/common/js/config'
//引入打乱顺序方法
import {shuffle} from '@/common/js/util'

//找到当前点击歌曲在随机歌曲列表中的序列
function findIndex(list,song){
	return list.findIndex((item)=>{
		return item .id===song.id
	})
}

//点击歌曲，存入歌曲数组和当前歌曲序列
export const selectPlay = function({commit,state},{list,index}){
	//使用commit方法传值，存入mutation
	commit(types.SET_SEQUENCE_LIST,list)	//存入当前歌曲列表
	//处理随机播放的列表和序列
	if(state.mode===playMode.random){
		let randomList = shuffle(list)
		commit(types.SET_PLAYLIST,randomList)
		index = findIndex(randomList,list[index])
	}else{
		commit(types.SET_PLAYLIST,list)	//存入当前播放列表
	}	
	commit(types.SET_CURRENT_INDEX,index)	//存入当前歌曲序列
	commit(types.SET_FULL_SCREEN,true)	//存入当前展开状态
	commit(types.SET_PLAYING_STATE,true)	//存入当前播放状态
}

//点击歌手页面，随机播放
export const randomPlay = function({commit},{list}){
	//使用commit方法传值，存入mutation
	commit(types.SET_PLAY_MODE,playMode.random)
	commit(types.SET_SEQUENCE_LIST,list)	//存入当前歌曲列表
	//计算播放列表，一定是随机
	let randomList = shuffle(list)
	commit(types.SET_PLAYLIST,randomList)	//存入当前播放列表
	commit(types.SET_CURRENT_INDEX,0)	//存入当前歌曲序列
	commit(types.SET_FULL_SCREEN,true)	//存入当前展开状态
	commit(types.SET_PLAYING_STATE,true)	//存入当前播放状态
}