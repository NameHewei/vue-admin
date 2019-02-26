import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/Login.vue'
import Home from '@/views/layout/Home.vue'
import Welcome from '@/views/welcome/Welcome.vue'

import AllComponents from '@/views/allComponents/AllComponents.vue'
import Table from '@/views/table/Table.vue'
import Entrance from '@/views/vueApiPractice/Entrance.vue'

import ApiPracticeList from '@/views/vueApiPractice/ApiPracticeList.vue'
import ApiVuex from '@/views/vueApiPractice/Vuex.vue'

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
        { path: '/',
            component: Home,
            children: [
                {
                    path: '',
                    component: Welcome
                },
                {
                    path: 'practice',
                    component: Entrance,
                    meta: { title: 'Vue API Practice', icon: 'el-icon-location', showInMenu: true },
                    children: [
                        { path: 'practice-vue', name: 'practiceVue', component: ApiPracticeList, meta: { title: 'practice vue', roles: ['ADMIN'], showInMenu: true } },
                        { path: 'practice-vuex', name: 'practiceVuex', component: ApiVuex, meta: { title: 'prectice vuex', showInMenu: true } }
                    ]
                }
            ]
        },
        { path: '/login', name: 'login', component: Login }
    ],

    // 路由表
    routerTable = [
        {
            path: 'practice',
            name: 'practice',
            component: Entrance,
            meta: { title: 'Vue API Practice', icon: 'el-icon-location', showInMenu: true, roles: ['ADMIN', 'STUDENT'] },
            children: [
                { path: 'practice-vue', name: 'practiceVue', component: ApiPracticeList, meta: { title: 'practice vue', roles: ['ADMIN', 'STUDENT'], showInMenu: true } },
                { path: 'practice-vuex', name: 'practiceVuex', component: ApiVuex, meta: { title: 'prectice vuex', showInMenu: true, roles: ['STUDENT'] } }
            ]
        }
    ],

    routers = [
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

export const permitRouters = function (roles) {

}

export const permitMenu = function (currentAccountRoles) {
    const tempMenu = []

    routerTable.forEach(({ name, meta: { roles, title, icon }, children }) => {
        const tempChildren = []

        // 判断当前模块是否有权限
        if (currentAccountRoles.some(v => (roles.includes(v)))) {
            children.forEach(({ name: _name, meta: { roles: _roles, title: _title } }) => {
                if (currentAccountRoles.some(v => (_roles.includes(v)))) {
                    tempChildren.push({

                        title: _title,
                        name: _name

                    })
                }
            })
        }
        tempMenu.push({
            title,
            icon,
            name,
            children: tempChildren
        })
    })

    return tempMenu
}

export default new Router({
    routes: baseRouter
})
