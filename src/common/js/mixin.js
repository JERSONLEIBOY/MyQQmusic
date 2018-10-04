//相当于一个组件，给多个组件定义重复的多个生命周期等
import {mapGetters} from 'vuex'	//引用state

//新建组件
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