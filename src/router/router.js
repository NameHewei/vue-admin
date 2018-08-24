import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/layout/Home.vue'
import Welcome from '@/views/welcome/Welcome.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/123',
      name: 'welcome',
      component: Welcome
    }
  ]
})
