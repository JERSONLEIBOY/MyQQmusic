import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/pages/recommend/Recommend'
import Singer from '@/pages/singer/Singer'
import Rank from '@/pages/rank/Rank'
import Search from '@/pages/search/Search'

Vue.use(Router)

export default new Router({
  routes: [
  	{
  		path:'/',
  		redirect:'./recommend'
  	},
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
