import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/Login.vue'
import Home from '@/views/layout/Home.vue'
import Welcome from '@/views/welcome/Welcome.vue'
import ApiPracticeList from '@/views/vueApiPractice/ApiPracticeList.vue'
import ApiVuex from '@/views/vueApiPractice/Vuex.vue'
import AllComponents from '@/views/allComponents/AllComponents.vue'
import Table from '@/views/table/Table.vue'
import Echarts from '@/views/echarts/Echarts'
import AMap from '@/views/echarts/AMap'

Vue.use(Router)

const menuRouter = [
        {
            title: 'Vue API Practice',
            children: [
                {
                    title: 'practice vue',
                    path: 'practice-vue',
                    name: 'practiceVue',
                    component: ApiPracticeList
                },
                {
                    title: 'prectice vuex',
                    path: 'practice-vuex',
                    name: 'practiceVuex',
                    component: ApiVuex
                }
            ]
        },
        {
            title: 'all components',
            children: [
                {
                    title: 'components',
                    path: 'all-component',
                    name: 'allComponents',
                    component: AllComponents
                },
                {
                    title: 'table',
                    path: 'table',
                    name: 'table',
                    component: Table
                }
            ]
        },
        {
            title: 'ECharts',
            children: [
                {
                    title: 'All-Charts',
                    path: 'echarts',
                    name: 'echarts',
                    component: Echarts
                }
            ]
        },
        {
            title: 'AMap',
            children: [
                {
                    title: 'AMap',
                    path: 'a-map',
                    name: 'aMap',
                    component: AMap
                }
            ]
        },
        {
            title: 'Other',
            children: [
                {
                    title: 'no',
                    name: 'no',
                    path: 'echarts',
                    component: Echarts
                }
            ]
        }
    ],

    router = () => {
        const tempChildren = []

        menuRouter.forEach(({ children }) => {
            children.forEach(({ path, name, component }) => {
                tempChildren.push({
                    path,
                    name,
                    component
                })
            })
        })

        return [{
            path: '/',
            component: Home,
            children: [
                {
                    path: '',
                    component: Welcome
                },
                ...tempChildren
            ]
        },
        {
            title: 'login',
            path: '/login',
            name: 'login',
            component: Login
        }]
    }

export const menu = menuRouter.map(({ title, children }) => {
    return {
        title,
        children: children.map(v => ({
            title: v.title,
            name: v.name
        }))
    }
})

export default new Router({
    routes: router()
})
