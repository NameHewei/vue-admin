import router from './router/router'
import store from './store/store'

router.beforeEach(async (to, from, next) => {
    console.log(to.path)
    if (to.path === '/login') {
        // 该函数中必须要执行next()
        next()
    } else {
        try {
            await store.dispatch('user/actionSetUserInfo')
            const userInfo = store.state.user

            console.log('navigationquard', userInfo)
        } catch (error) {
            next({ path: '/login' })
            console.error('beforeEach catch error:', error)
        }
    }
})
