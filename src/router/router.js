import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/layout/Home.vue'
import Welcome from '@/views/welcome/Welcome.vue'
import ApiPracticeList from '@/views/vueApiPractice/ApiPracticeList.vue'
import ApiVuex from '@/views/vueApiPractice/Vuex.vue'
import AllComponents from '@/views/allComponents/AllComponents.vue'
import Table from '@/views/table/Table.vue'
import Echarts from '@/views/echarts/Echarts'

Vue.use(Router)

const staticRouter = [{
    path: '/',
    component: Home,
    children: [
        {
            path: '',
            name: 'welcome',
            component: Welcome
        },
        {
            path: 'practice-vue',
            name: 'practiceVue',
            component: ApiPracticeList
        },
        {
            path: 'practice-vuex',
            name: 'practiceVuex',
            component: ApiVuex
        },
        {
            path: 'all-component',
            name: 'allComponents',
            component: AllComponents
        },
        {
            path: 'table',
            name: 'table',
            component: Table
        },
        {
            path: 'Amap',
            name: 'aMap',
            component: Table
        },
        {
            path: 'echarts',
            name: 'echarts',
            component: Echarts
        }
    ]
}]

export default new Router({
    routes: staticRouter
})
