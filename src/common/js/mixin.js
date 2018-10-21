//相当于一个组件，给多个组件定义重复的多个生命周期等
import {mapGetters,mapMutations,mapActions} from 'vuex'	//引用state
import {playMode} from './config.js'	//引入公共变量，播放模式
import {shuffle} from '@/common/js/util'

//新建组件，滚动列表的重新定位适配小组件
export const playlistMixin={
	computed:{
		...mapGetters([
			'playlist'
		])
	},
	//在组件挂载后执行，重新定位
	mounted(){
		this.handlePlaylist(this.playlist)
	},
	//在切换路由后，重新定位
	activated(){
		this.handlePlaylist(this.playlist)
	},
	//在存在播放列表后，重新定位
	watch:{
		playlist(newVal){
			this.handlePlaylist(newVal)
		}
	},
	methods:{
		//定义执行定位的方法
		handlePlaylist(){
			//在目标组件中定义，这里写一个异常，标准化
			throw new Error('component must implement handlePlaylist method')
		}
	}
}


//新建组件，播放模式的切换
export const playerMixin = {
	computed:{
		//播放模式动态样式，计算属性
  		iconMode(){
  			return this.mode===playMode.sequence? 'icon-xunhuanbofang' : this.mode===playMode.loop?'icon-danquxunhuan':'icon-suijibofang'
  		},
  		...mapGetters([
	  		'mode',	//当前播放模式
	  		'sequenceList',	//播放列表
	  		'currentSong',	//当前歌曲的数据渲染进页面
	  		'favoriteList',
	  	])
	},
	methods:{
		//控制播放模式
	  	changeMode(){
	  		//控制播放模式
	  		//mode是0，1，2，点击循环改变
	  		const mode = (this.mode+1)%3	//0点击得1，1点击得2，2点击得0
	  		this.setPlayMode(mode)
	  		//控制播放列表
	  		let list = null	//设置数组
	  		if(mode === playMode.random){
	  			list = shuffle(this.sequenceList)
	  		}else{
	  			list = this.sequenceList	//只设置2种情况，单曲用setTime就好
	  		}
	  		//切换模式把当前歌曲换了，导致bug，设置方法一首歌为当前歌曲覆盖
	  		this._resetCurrentSong(list)
	  		this.setPlaylist(list)
	  	},
	  	_resetCurrentSong(list){
	  		//找到当前歌曲在数组中的index
	  		let index = list.findIndex((item)=>{
	  			return item.id === this.currentSong.id
	  		})
	  		//设置当前序列
	  		this.setCurrentIndex(index)
	  	},
	  	//判断当前歌曲是否是我喜欢的
	  	isFavorite(song){
	  		const index = this.favoriteList.findIndex((item)=>{
	  			return item.id===song.id 	//song是调用此方法传入的item
	  		})
	  		//当找到index则当前歌曲是收藏的，而我们不需要具体index，直接>-1即可
	  		return index>-1
	  	},
	  	//收藏按钮的动态图标
	    getFavoriteIcon(song){
	    	if(this.isFavorite(song)){
	    		return 'icon-xihuan1'
	    	}else{
	    		return 'icon-xihuan'
	    	}
	    },
	    toggleFavorite(song){
	    	if(this.isFavorite(song)){
	    		//当前歌曲是收藏的，点击就是取消收藏
	    		this.deleteFavoriteList(song)
	    	}else{
	    		this.saveFavoriteList(song)
	    	}
	    },
	  	/*存入点击事件触发的是否展示数据*/
	  	...mapMutations({
	  		setPlayMode:'SET_PLAY_MODE',
	  		setPlaylist:'SET_PLAYLIST',
	  		setCurrentIndex:'SET_CURRENT_INDEX',
	  	}),
	  	/*设置action本地缓存的*/
	  	...mapActions([
	  		'saveFavoriteList',
	  		'deleteFavoriteList'
	  	])
	}
}

//新建组件，调用组件搜索结果的共享方法
export const searchMixin = {
	computed:{
		...mapGetters([
      		'searchHistory'
    	])
	},
	methods:{
/*********滚动前，收起键盘****************/
	    blurInput(){
	      //执行子组件搜索框的事件，这个事件操作input标签收起键盘
	      this.$refs.searchbox.blur()
	    },
		/********获取热门关键词子组件的值********/
	  	addQuery(item){
	  		this.$refs.searchbox.setQuery(item)
	  	},
	}
}