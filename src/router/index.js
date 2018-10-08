import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/pages/recommend/Recommend'
import Singer from '@/pages/singer/Singer'
import SingerDetail from '@/pages/singer/components/SingerDetail'
import Rank from '@/pages/rank/Rank'
import Search from '@/pages/search/Search'
import RecommendDetail from '@/pages/recommend/components/RecommendDetail'
import RankDetail from '@/pages/rank/components/RankDetail'

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
      component: Recommend,
      children:[{
        path: '/recommend/:id',
        name: 'RecommendDetail',
        component: RecommendDetail,
      }]
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      children:[{
        path: '/singer/:id',
        name: 'SingerDetail',
        component: SingerDetail,
      }]
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank,
      children:[{
        path: '/rank/:id',
        name: 'RankDetail',
        component: RankDetail,
      }]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      children:[{
        path: '/search/:id',
        name: 'SingerDetail',
        component: SingerDetail,
      }]
    }
  ]
})
