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
		return item.id===song.id
	})
}

/****点击歌曲，存入歌曲数组和当前歌曲序列*****/
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

/********点击歌手页面，随机播放******/
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

/*******点击搜索结果li，添加歌曲数据******************/
export const insertSong = function ({commit,state},song){
	//获取当前已有的歌曲列表
	let playlist = state.playlist.slice() 	//因为这样在splice直接操作了数据，不允许，设置副本
	let sequenceList = state.sequenceList.slice()
	let currentIndex = state.currentIndex 	//值类型，只是赋值，没有直接操作
	let currentSong = playlist[currentIndex]

	/***插入播放列表******/
	// 查找列表是否已有当前歌曲
	let fpIndex = findIndex(playlist,song)	//变量名find playlist index
	currentIndex++	//插入歌曲索引+1
	// 插入数组方法splice(序列，删除几个，插入内容)
	playlist.splice(currentIndex,0,song)
	// 插入完成后，已有歌曲要删除
	if(fpIndex > -1){
		console.log('有重复歌曲')
		if(currentIndex>fpIndex){
			playlist.splice(fpIndex,1)	//当重复项在插入前面
			currentIndex--	//插入的位置要减一
			console.log('删除前面一播放的重复歌曲')
		}else{
			playlist.splice(fpIndex+1,1)	//当重复项在插入项后面
			console.log('删除后面将播放的重复歌曲'+playlist)
		}
	}
	/****插入歌曲列表******/
	// 当前的currentIndex是播放列表的序列，因此歌曲列表的已有序列要自己找
	let currentSIndex = findIndex(sequenceList,currentSong)+1	//加一是要插入的序列位置
	// 查找列表中是否已有歌曲
	let fsIndex = findIndex(sequenceList,song)
	// 插入歌曲
	sequenceList.splice(currentSIndex,0,song)
	//插入后删除重复
	if(fsIndex > -1){
		if(currentSIndex > fsIndex){
			sequenceList.splice(fsIndex,1)
		}else{
			sequenceList.splice(fsIndex+1,1)
		}
	}

	/******修改了数据之后，存入vuex***********/
	commit(types.SET_PLAYLIST,playlist)	//存入当前播放列表
	commit(types.SET_CURRENT_INDEX,currentIndex)	//存入当前歌曲序列
	commit(types.SET_SEQUENCE_LIST,sequenceList)	//存入歌曲列表
	commit(types.SET_FULL_SCREEN,true)	//存入当前展开状态
	commit(types.SET_PLAYING_STATE,true)	//存入当前播放状态
}