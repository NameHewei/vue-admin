import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/Login.vue'
import Home from '@/views/layout/Home.vue'
import Welcome from '@/views/welcome/Welcome.vue'
import ApiPracticeList from '@/views/vueApiPractice/ApiPracticeList.vue'
import ApiVuex from '@/views/vueApiPractice/Vuex.vue'

import AllComponents from '@/views/allComponents/AllComponents.vue'
import Table from '@/views/table/Table.vue'

const
    Echarts = () => import('@/views/thirdPartService/Echarts'),
    AMap = () => import('@/views/thirdPartService/AMap'),
    WyIm = () => import('@/views/thirdPartService/WyIm'),
    UploadFile = () => import('@/views/allComponents/UploadFile.vue')

Vue.use(Router)

/**
 * 1.只支持两级菜单
 */

const
    // 基础路由
    baseRouter = [
        { title: 'login', path: '/login', name: 'login', component: Login }
    ],

    // 路由表
    routers = [
        {
            title: 'Vue API Practice',
            icon: 'el-icon-location',
            children: [
                { title: 'practice vue', path: 'practice-vue', name: 'practiceVue', component: ApiPracticeList, meta: { roles: ['ADMIN'] } },
                { title: 'prectice vuex', path: 'practice-vuex', name: 'practiceVuex', component: ApiVuex }
            ]
        },
        {
            title: '常用组件',
            children: [
                { title: 'components', path: 'all-component', name: 'allComponents', component: AllComponents },
                { title: 'table', path: 'table', name: 'table', component: Table },
                { title: 'axios 上传文件', path: 'upload-file', name: 'uploadFile', component: UploadFile }
            ]
        },
        {
            title: '第三方服务',
            children: [
                { title: 'All-Charts', path: 'echarts', name: 'echarts', component: Echarts },
                { title: 'AMap', path: 'a-map', name: 'aMap', component: AMap },
                { title: '网易IM', path: 'wy-im', name: 'wyIm', component: WyIm }
            ]
        },
        {
            title: 'Other',
            children: [
                { title: 'no', name: 'no', path: 'echarts', component: Echarts }
            ]
        }
    ]

// router = () => {
//     const tempChildren = []

//     menuRouter.forEach(({ children }) => {
//         children.forEach(({ path, name, component }) => {
//             tempChildren.push({
//                 path,
//                 name,
//                 component
//             })
//         })
//     })

//     return [{
//         title: 'login',
//         path: '/',
//         name: 'login',
//         component: Login
//     }]
// }

// export const perrmiteRouters = menuRouter.map(({ title, children }) => {
//     return {
//         title,
//         children: children.map(v => ({
//             title: v.title,
//             name: v.name
//         }))
//     }
// })

// {
//     path: '/',
//     component: Home,
//     children: [
//         {
//             path: '',
//             component: Welcome
//         },
//         ...tempChildren
//     ]
// },

export const perrmiteRouters = function (role) {

}

export default new Router({
    routes: baseRouter
})
