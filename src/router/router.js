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

import Page1 from '@/views/testRouter/Page1'
import Page2 from '@/views/testRouter/Page2'
import Page3 from '@/views/testRouter/Page3'
import Page4 from '@/views/testRouter/Page4'

import TreeWrap from '@/views/element/TreeWrap.vue'

/**
 * @des 练习keep-alive
 */
import TsKeepAlive from '@/views/vueApiPractice/keepAlive/TsKeepAlive.vue'
import Start from '@/views/vueApiPractice/keepAlive/Start.vue'
import KaEdit from '@/views/vueApiPractice/keepAlive/KaEdit.vue'
import KaCreate from '@/views/vueApiPractice/keepAlive/KaCreate.vue'

const
    Echarts = () => import('@/views/thirdPartService/Echarts'),
    Financial = () => import('@/views/thirdPartService/Financial'),
    AMap = () => import('@/views/thirdPartService/AMap'),
    WyIm = () => import('@/views/thirdPartService/WyIm'),
    UploadFile = () => import('@/views/allComponents/UploadFile.vue'),
    Jsx = () => import('@/views/vueApiPractice/jsx/Jsx.vue'),
    Mixin = () => import('@/views/vueApiPractice/mixin/Mixin.vue')

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
                { path: 'practice-vuex', name: 'practiceVuex', component: ApiVuex, meta: { title: 'practice vuex', showInMenu: true, roles: ['STUDENT'] } },
                { path: 'vue-jsx', name: 'vue-jsx', component: Jsx, meta: { title: 'vue jsx', showInMenu: true, roles: ['ADMIN'] } },
                { path: 'mixin', name: 'mixin', component: Mixin, meta: { title: 'mixin', showInMenu: true, roles: ['ADMIN'] } },
                
                { 
                    path: 'ts-keep-alive', 
                    name: 'tsKeepAlive',
                    component: TsKeepAlive, 
                    meta: { title: '测试keep-alives', showInMenu: true, roles: ['ADMIN'] },
                    children: [
                        { path: 'start', name: 'kaStart', component: Start, },
                        { path: 'edit', name: 'kaEdit', component: KaEdit, },
                        { path: 'create', name: 'kaCreate', component: KaCreate, }
                    ]
                },
            ]
        },
        {
            path: 'frequently-use-component',
            name: 'frequentlyUseComponent',
            component: Entrance,
            meta: { title: '常用组件', icon: 'el-icon-location', showInMenu: true, roles: ['ADMIN'] },
            children: [
                { path: 'all-component', name: 'allComponents', component: AllComponents, meta: { title: '所有', roles: ['ADMIN'], showInMenu: true } },
                { path: 'table', name: 'table', component: Table, meta: { title: 'table', roles: ['ADMIN'] } },
                { path: 'upload-file', name: 'uploadFile', component: UploadFile, meta: { title: 'axios 上传文件', roles: ['ADMIN'] } }
            ]
        },
        {
            path: 'third-part',
            name: 'thirdPart',
            component: Entrance,
            meta: { title: '第三方服务', icon: 'el-icon-location', showInMenu: true, roles: ['ADMIN'] },
            children: [
                { path: 'echarts', name: 'echarts', component: Echarts, meta: { title: '所有图表', roles: ['ADMIN'], showInMenu: true } },
                { path: 'financial', name: 'financial', component: Financial, meta: { roles: ['ADMIN'] } },
                { path: 'a-map', name: 'aMap', component: AMap, meta: { title: '高德地图', roles: ['ADMIN'], showInMenu: true } },
                { path: 'wy-im', name: 'wyIm', component: WyIm, meta: { title: '网易IM', roles: ['ADMIN'], showInMenu: true } }
            ]
        },
        {
            path: 'test-vue-router',
            name: 'testVueRouter',
            component: Entrance,
            meta: { title: '测试路由replace', icon: 'el-icon-location', showInMenu: true, roles: ['ADMIN'] },
            children: [
                { path: 'p1', name: 'page1', component: Page1, meta: { title: 'page1', roles: ['ADMIN'], showInMenu: true } },
                { path: 'p2', name: 'page2', component: Page2, meta: { title: 'page2', roles: ['ADMIN'], showInMenu: true } },
                { path: 'p3', name: 'page3', component: Page3, meta: { title: 'page3', roles: ['ADMIN'], showInMenu: true } },
                { path: 'p4', name: 'page4', component: Page4, meta: { title: 'page4', roles: ['ADMIN'], showInMenu: true } }
            ]
        },
        {
            path: 'element',
            name: 'eleComponents',
            component: Entrance,
            meta: { title: 'elementUI组件', icon: 'el-icon-location', showInMenu: true, roles: ['ADMIN'] },
            children: [
                { path: 'tree', name: 'tree', component: TreeWrap, meta: { title: 'tree', roles: ['ADMIN'], showInMenu: true } }
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
