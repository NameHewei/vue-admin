import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/layout/Home.vue'
import Welcome from '@/views/welcome/Welcome.vue'
import TestVue from '@/views/testVue/TestVue.vue'
import AllComponents from '@/views/allComponents/AllComponents.vue'

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
                    path: 'test-vue',
                    name: 'testVue',
                    component: TestVue
                },
                {
                    path: 'all-component',
                    name: 'allComponents',
                    component: AllComponents
                }
            ]
        }
    ]
})
