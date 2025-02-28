import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/news/:id',
      name: 'viewNews',
      component: () => import('./views/ViewNews.vue')
    },
    {
      path: '/*',
      name: 'error',
      component: () => import('./views/Error.vue')
    }
  ]
})
