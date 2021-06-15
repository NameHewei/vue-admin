import Home from '@/layout/home.vue'

export default [{
    path: '/flow',
    component: Home,
    name: 'flow',
    meta: { title: '流程图', icon: 'el-icon-location', menu: true, roles: ['ADMIN'] },
    children: [
        { path: 'flowIndex', name: 'flowIndex', component: () => import('@/views/flow/flow.vue'), meta: { title: '流程图X6', menu: true, roles: ['ADMIN'] } }
    ]
}]
