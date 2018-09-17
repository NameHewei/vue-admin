import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/layout/Home.vue'
import Welcome from '@/views/welcome/Welcome.vue'
import ApiPracticeList from '@/views/vueApiPractice/ApiPracticeList.vue'
import AllComponents from '@/views/allComponents/AllComponents.vue'
import Table from '@/views/table/Table.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Home,
            children: [
                {
                    path: '',
                    name: 'welcome',
                    component: Welcome
                },
                {
                    path: 'practice-vue',
                    name: 'practiceVue',
                    component: ApiPracticeList
                },
                {
                    path: 'all-component',
                    name: 'allComponents',
                    component: AllComponents
                },
                {
                    path: 'table',
                    name: 'table',
                    component: Table
                }
            ]
        }
    ]
})
