import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/Login.vue'
import Home from '@/layout/home.vue'
import Welcome from '@/views/welcome/Welcome.vue'
import NotFind from '@/views/error/notFind.vue'

import AllComponents from '@/views/allComponents/AllComponents.vue'
import CudPage from '@/views/allComponents/table/cudPage.vue'
import Entrance from '@/views/vueApiPractice/Entrance.vue'

import ApiPracticeList from '@/views/vueApiPractice/ApiPracticeList.vue'
import ApiVuex from '@/views/vueApiPractice/Vuex.vue'
import CustomDirective from '@/views/vueApiPractice/customDirective.vue'

import Page1 from '@/views/testRouter/Page1'
import Page2 from '@/views/testRouter/Page2'
import Page3 from '@/views/testRouter/Page3'
import Page4 from '@/views/testRouter/Page4'

/**
 * @des 练习keep-alive
 */
import KAEntrance from '@/views/vueApiPractice/keepAlive/Entrance.vue'
import Start from '@/views/vueApiPractice/keepAlive/Start.vue'
import KaEdit from '@/views/vueApiPractice/keepAlive/KaEdit.vue'
import KaCreate from '@/views/vueApiPractice/keepAlive/KaCreate.vue'

const Echarts = () => import('@/views/thirdPartService/chart/Echarts')
const Financial = () => import('@/views/thirdPartService/Financial')
const AMap = () => import('@/views/thirdPartService/AMap')
const WyIm = () => import('@/views/thirdPartService/WyIm')
const Jsx = () => import('@/views/vueApiPractice/jsx/Jsx.vue')
const MixinC = () => import('@/views/vueApiPractice/mixin/Mixin.vue')

/*
   利用push 跳转路由，当重复点击跳转同一个路由地址时会报错 NavigationDuplicated 一下为处理该报错
   Vue-router在3.1之后把$router.push()方法改为了Promise
   */
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    /* 添加 catch 不抛出错误 */
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

/**
 * 1.只支持两级菜单
 */

/* 基础路由 */
const baseRouter = [
    { path: '/login', name: 'login', component: Login },
    { path: '*', component: NotFind }
]

// 路由表
const routerTable = [
    {
        /* 要在菜单可点击的路由，保持path值和name值一致，以便于保持菜单选择状态 */
        path: 'practice',
        name: 'practice',
        component: Entrance,
        meta: { title: 'Vue API 练习', icon: 'el-icon-location', showInMenu: true, roles: ['ADMIN', 'STUDENT'] },
        children: [
            { path: 'practiceVue', name: 'practiceVue', component: ApiPracticeList, meta: { title: 'practice vue', roles: ['ADMIN', 'STUDENT'], showInMenu: true } },
            { path: 'practiceVuex', name: 'practiceVuex', component: ApiVuex, meta: { title: 'practice vuex', showInMenu: true, roles: ['STUDENT'] } },
            { path: 'vueJsx', name: 'vueJsx', component: Jsx, meta: { title: 'vue jsx', showInMenu: true, roles: ['ADMIN'] } },
            { path: 'mixin', name: 'mixin', component: MixinC, meta: { title: 'mixin', showInMenu: true, roles: ['ADMIN'] } },
            { path: 'customDirective', name: 'customDirective', component: CustomDirective, meta: { title: '自定义命令', showInMenu: true, roles: ['ADMIN'] } },

            {
                path: 'tsKeepAlive',
                name: 'tsKeepAlive',
                component: KAEntrance,
                meta: { title: '测试keep-alives', showInMenu: true, roles: ['ADMIN'] },
                children: [
                    { path: 'kaStart', name: 'kaStart', component: Start },
                    { path: 'kaEdit', name: 'kaEdit', component: KaEdit },
                    { path: 'kaCreate', name: 'kaCreate', component: KaCreate }
                ]
            }
        ]
    },
    {
        path: 'frequentlyUseComponent',
        name: 'frequentlyUseComponent',
        component: Entrance,
        meta: { title: '常用组件', icon: 'el-icon-location', showInMenu: true, roles: ['ADMIN'] },
        children: [
            { path: 'allComponents', name: 'allComponents', component: AllComponents, meta: { title: '所有', roles: ['ADMIN'], showInMenu: true } },
            { path: 'edit/:id', name: 'pageEdit', component: CudPage, meta: { roles: ['ADMIN'] } }
        ]
    },
    {
        path: 'thirdPart',
        name: 'thirdPart',
        component: Entrance,
        meta: { title: '第三方服务', icon: 'el-icon-location', showInMenu: true, roles: ['ADMIN'] },
        children: [
            { path: 'echarts', name: 'echarts', component: Echarts, meta: { title: '图表', roles: ['ADMIN'], showInMenu: true } },
            { path: 'financial', name: 'financial', component: Financial, meta: { roles: ['ADMIN'] } },
            { path: 'aMap', name: 'aMap', component: AMap, meta: { title: '高德地图', roles: ['ADMIN'], showInMenu: true } },
            { path: 'wyIm', name: 'wyIm', component: WyIm, meta: { title: '网易IM', roles: ['ADMIN'], showInMenu: true } }
        ]
    },
    {
        path: 'testVueRouter',
        name: 'testVueRouter',
        component: Entrance,
        meta: { title: '测试路由replace', icon: 'el-icon-location', showInMenu: true, roles: ['ADMIN'] },
        children: [
            { path: 'page1', name: 'page1', component: Page1, meta: { title: 'page1', roles: ['ADMIN'], showInMenu: true } },
            { path: 'page2', name: 'page2', component: Page2, meta: { title: 'page2', roles: ['ADMIN'], showInMenu: true } },
            { path: 'page3', name: 'page3', component: Page3, meta: { title: 'page3', roles: ['ADMIN'], showInMenu: true } },
            { path: 'page4', name: 'page4', component: Page4, meta: { title: 'page4', roles: ['ADMIN'], showInMenu: true } }
        ]
    }
]

/**
 * @des 根据权限生成路由
 */
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

/**
 * @des 根据权限生成菜单
 */
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
