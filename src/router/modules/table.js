import Home from '@/layout/home.vue'

const TableWrap = () => import('@/views/table/tableWrap.vue')
const CudPage = () => import('@/views/table/cudPage.vue')

export default [{
    path: '/table',
    component: Home,
    name: 'table',
    meta: { title: '表格相关', icon: 'el-icon-location', menu: true, roles: ['ADMIN'] },
    children: [
        { path: 'tableWrap', name: 'tableWrap', component: TableWrap, meta: { title: '表格', menu: true, roles: ['ADMIN'] } },
        { path: 'edit/:id', name: 'pageEdit', component: CudPage, meta: { roles: ['ADMIN'] } },
        { path: 'tableMerge', name: 'tableMerge', component: () => import('@/views/table/tableMerge/tableMerge.vue'), meta: { title: '表格合并', menu: true, roles: ['ADMIN'] } }
    ]
}]
