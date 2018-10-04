/**
 *定义state对象变量，内容是数据类型（一般为对象、布尔值、数组、状态数字）
 *输出state
*/
import {playMode} from '@/common/js/config'	//引入状态码

const state = {
	/*歌手数据*/
	singer:{},
	/*播放器数据*/
	playing:false,	//播放状态
	fullScreen:false,	//展开状态
	playlist:[],	//播放列表
	sequenceList:[],	//歌曲列表
	mode:playMode.sequence,	//播放模式
	currentIndex:-1,	//当前歌曲序列
	/*歌单数据*/
	menu:{}
}

export default state