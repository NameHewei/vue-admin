import menu from './modules/menu'
import table from './modules/table'

import Login from '@/views/login/Login.vue'
import Home from '@/layout/home.vue'
import Welcome from '@/views/welcome/Welcome.vue'
import NotFound from '@/views/notFound/notFound.vue'

import AllComponents from '@/views/allComponents/AllComponents.vue'

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

/* 基础路由 */
export const baseRouter = [
    { path: '/login', name: 'login', component: Login },
    { path: '*', component: NotFound }
]

export const welcome = [
    { path: '', component: Welcome }
]

export const root = [
    { path: '/', component: Home }
]

// 路由表
export const routerTable = [
    ...menu,
    ...table,
    {
        /**
         * @des 要在菜单可点击的路由，保持path值和name值一致，以便于页面刷新后保持菜单的选择状态
         * @des title icon 等信息 请放到 meta 中  如果要发在外边 请 修改 router.js 的 getPermitRouters 方法
         */
        path: '/practice',
        name: 'practice',
        component: Home,
        meta: { title: 'Vue API 练习', icon: 'el-icon-location', menu: true, roles: ['ADMIN', 'STUDENT'] },
        children: [
            { path: 'practiceVue', name: 'practiceVue', component: ApiPracticeList, meta: { title: 'practice vue', roles: ['ADMIN', 'STUDENT'], menu: true } },
            { path: 'practiceVuex', name: 'practiceVuex', component: ApiVuex, meta: { title: 'practice vuex', menu: true, roles: ['ADMIN', 'STUDENT'] } },
            { path: 'vueJsx', name: 'vueJsx', component: Jsx, meta: { title: 'vue jsx', menu: true, roles: ['ADMIN'] } },
            { path: 'mixin', name: 'mixin', component: MixinC, meta: { title: 'mixin', menu: true, roles: ['ADMIN'] } },
            { path: 'customDirective', name: 'customDirective', component: CustomDirective, meta: { title: '自定义命令', menu: true, roles: ['ADMIN'] } },

            {
                path: 'tsKeepAlive',
                name: 'tsKeepAlive',
                component: KAEntrance,
                meta: { title: '测试keep-alives', menu: true, roles: ['ADMIN'] },
                children: [
                    { path: 'kaStart', name: 'kaStart', component: Start, roles: ['ADMIN'] },
                    { path: 'kaEdit', name: 'kaEdit', component: KaEdit, roles: ['ADMIN'] },
                    { path: 'kaCreate', name: 'kaCreate', component: KaCreate, roles: ['ADMIN'] }
                ]
            }
        ]
    },
    {
        path: '/frequentlyUseComponent',
        name: 'frequentlyUseComponent',
        component: Home,
        meta: { title: '常用组件', icon: 'el-icon-location', menu: true, roles: ['ADMIN'] },
        children: [
            { path: 'allComponents', name: 'allComponents', component: AllComponents, meta: { title: '所有', roles: ['ADMIN'], menu: true } },
        ]
    },
    {
        path: '/thirdPart',
        name: 'thirdPart',
        component: Home,
        meta: { title: '第三方服务', icon: 'el-icon-location', menu: true, roles: ['ADMIN'] },
        children: [
            { path: 'echarts', name: 'echarts', component: Echarts, meta: { title: '图表', roles: ['ADMIN'], menu: true } },
            { path: 'financial', name: 'financial', component: Financial, meta: { roles: ['ADMIN'] } },
            { path: 'aMap', name: 'aMap', component: AMap, meta: { title: '高德地图', roles: ['ADMIN'], menu: true } },
            { path: 'wyIm', name: 'wyIm', component: WyIm, meta: { title: '网易IM', roles: ['ADMIN'], menu: true } }
        ]
    },
    {
        path: '/testVueRouter',
        name: 'testVueRouter',
        component: Home,
        meta: { title: '测试路由replace', icon: 'el-icon-location', menu: true, roles: ['ADMIN'] },
        children: [
            { path: 'page1', name: 'page1', component: Page1, meta: { title: 'page1', roles: ['ADMIN'], menu: true } },
            { path: 'page2', name: 'page2', component: Page2, meta: { title: 'page2', roles: ['ADMIN'], menu: true } },
            { path: 'page3', name: 'page3', component: Page3, meta: { title: 'page3', roles: ['ADMIN'], menu: true } },
            { path: 'page4', name: 'page4', component: Page4, meta: { title: 'page4', roles: ['ADMIN'], menu: true } }
        ]
    }
]
