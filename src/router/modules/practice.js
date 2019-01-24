import Entrance from '@/views/vueApiPractice/Entrance.vue'

import ApiPracticeList from '@/views/vueApiPractice/ApiPracticeList.vue'
import ApiVuex from '@/views/vueApiPractice/Vuex.vue'

export default {
    path: 'practice',
    component: Entrance,
    meta: { title: 'Vue API Practice', icon: 'el-icon-location' },
    children: [
        { path: 'practice-vue', name: 'practiceVue', component: ApiPracticeList, meta: { title: 'practice vue', roles: ['ADMIN'] } },
        { path: 'practice-vuex', name: 'practiceVuex', component: ApiVuex, meta: { title: 'prectice vuex' } }
    ]
}
