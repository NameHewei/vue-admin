import Home from '@/layout/home.vue'

export default [{
    path: '/form',
    component: Home,
    name: 'form',
    meta: { title: '表单相关', icon: 'el-icon-location', menu: true, roles: ['ADMIN'] },
    children: [
        { path: 'cusForm', name: 'cusForm', component: () => import('@/views/form/cusForm.vue'), meta: { title: '表单', menu: true, roles: ['ADMIN'] } }
    ]
}]
