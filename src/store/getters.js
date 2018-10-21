/**
 *组件获取数据的时候映射
*/

export const singer = state=> state.singer

//播放器数据getter映射
export const playing = state=> state.playing	

export const fullScreen = state=> state.fullScreen	

export const playlist = state=> state.playlist	

export const sequenceList = state=> state.sequenceList	

export const mode = state=> state.mode

export const currentIndex = state=> state.currentIndex

//当前歌曲获取（相当于计算属性）
export const currentSong = (state)=> {
	return state.playlist[state.currentIndex]
}
/*歌单数据getter映射*/
export const menu = state=> state.menu

/*排行榜数据getter映射*/
export const topList = state=> state.topList

/*搜索历史数据getter映射*/
export const searchHistory = state=> state.searchHistory

/*播放历史数据getter映射*/
export const playHistory = state=> state.playHistory

/*播放历史数据getter映射*/
export const favoriteList = state=> state.favoriteList

