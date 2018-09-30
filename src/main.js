//import 'babel-Polyfill' //es6的aip转译比如promise,"babel-runtime"是辅助转译的

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/styles/reset.css'	//引入移动端重置css
import './assets/styles/iconfont.css'	//引入移动端重置css
import fastClick from 'fastclick'	//引入300毫秒延迟插件
import VueAwesomeSwiper from 'vue-awesome-swiper'	//引入轮播插件
import 'swiper/dist/css/swiper.css'	//引入轮播插件的css样式
import VueLazyload from 'vue-lazyload'


Vue.config.productionTip = false
//全局配置取消300毫秒延时点击
fastClick.attach(document.body)
//全局配置轮播插件
Vue.use(VueAwesomeSwiper)
//全局配置懒加载插件
Vue.use(VueLazyload, {
	//不能直接写路径要写成require？
  loading: require('./assets/load.jpg')	//'./assets/load.jpg',
})

/* eslint-disable no-new */
new Vue({
  el: '#app', 
  render: h => h(App),
  router,
  store
})
