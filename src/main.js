import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/styles/reset.css'
import fastClick from 'fastclick'

Vue.config.productionTip = false
//全局配置取消300毫秒延时点击
fastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app', 
  render: h => h(App),
  router,
})
