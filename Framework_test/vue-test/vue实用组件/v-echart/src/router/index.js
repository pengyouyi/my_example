import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CircleChart from '@/components/CircleChart'
import MapChart from '@/components/MapChart'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/circle',
      name: 'CircleChart',
      component: CircleChart
    },
    {
      path: '/map',
      name: 'MapChart',
      component: MapChart
    }
  ]
})
