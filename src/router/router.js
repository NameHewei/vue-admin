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
        { path: '/login', name: 'login', component: Login },
        { path: '*', component: Echarts }
    ],

    // 路由表
    routerTable = [
        {
            path: 'practice',
            name: 'practice',
            component: Entrance,
            meta: { title: 'Vue API 练习', icon: 'el-icon-location', showInMenu: true, roles: ['ADMIN', 'STUDENT'] },
            children: [
                { path: 'practice-vue', name: 'practiceVue', component: ApiPracticeList, meta: { title: 'practice vue', roles: ['ADMIN', 'STUDENT'], showInMenu: true } },
                { path: 'practice-vuex', name: 'practiceVuex', component: ApiVuex, meta: { title: 'prectice vuex', showInMenu: true, roles: ['STUDENT'] } }
            ]
        },
        {
            path: 'frequently-use-component',
            name: 'frequentlyUseComponent',
            component: Entrance,
            meta: { title: '常用组件', icon: 'el-icon-location', showInMenu: true, roles: ['ADMIN', 'STUDENT'] },
            children: [
                { path: 'all-component', name: 'allComponents', component: AllComponents, meta: { title: '所有', roles: ['ADMIN', 'STUDENT'], showInMenu: true } },
                { path: 'table', name: 'table', component: Table, meta: { title: 'table', roles: ['ADMIN'] } },
                { path: 'upload-file', name: 'uploadFile', component: UploadFile, meta: { title: 'axios 上传文件', roles: ['ADMIN'] } }
            ]
        }
    ]

    // routers = [
    //     {
    //         title: '第三方服务',
    //         children: [
    //             { title: 'All-Charts', path: 'echarts', name: 'echarts', component: Echarts },
    //             { title: 'AMap', path: 'a-map', name: 'aMap', component: AMap },
    //             { title: '网易IM', path: 'wy-im', name: 'wyIm', component: WyIm }
    //         ]
    //     },
    //     {
    //         title: 'Other',
    //         children: [
    //             { title: 'no', name: 'no', path: 'echarts', component: Echarts }
    //         ]
    //     }
    // ]

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

export const permitRouters = function (currentAccountRoles) {
    const tempRoute = []
    routerTable.forEach(({ name, path, component, meta, children }) => {
        const tempChildren = []
        // 判断当前模块是否有权限
        if (currentAccountRoles.some(v => (meta.roles.includes(v)))) {
            children.forEach(item => {
                if (currentAccountRoles.some(v => (item.meta.roles.includes(v)))) {
                    tempChildren.push(item)
                }
            })
        }
        tempRoute.push({
            path,
            name,
            meta,
            component,
            children: tempChildren
        })
    })

    return [{ path: '/', component: Home, children: [{ path: '', component: Welcome }, ...tempRoute] }]
}

export const permitMenu = function (currentAccountRoles) {
    const tempMenu = []
    routerTable.forEach(({ name, meta: { roles, title, icon, showInMenu }, children }) => {
        const tempChildren = []
        // 判断当前模块是否需要显示和有权限
        if (showInMenu && currentAccountRoles.some(v => (roles.includes(v)))) {
            children.forEach(({ name: _name, meta: { roles: _roles, title: _title, showInMenu: _showInMenu } }) => {
                if (_showInMenu && currentAccountRoles.some(v => (_roles.includes(v)))) {
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
