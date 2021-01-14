import Home from '@/layout/home.vue'

export default [{
    path: '/menu',
    component: Home,
    name: 'menuinfinity',
    meta: { title: '支持无限层级-1', icon: 'el-icon-location', menu: true, roles: ['ADMIN'] },
    children: [
        {
            path: 'infinityMenu',
            name: 'infinity1',
            component: Home,
            meta: { title: '1-1', menu: true, roles: ['ADMIN'] },
            children: [
                { path: 'infinityMenu', name: 'infinity11', component: Home, meta: { title: '1-1-1', menu: true, roles: ['ADMIN'] } },
            ]
        },
    ]
}]
