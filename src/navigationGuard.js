import router from './router/router'
import store from './store/store'

router.beforeEach(async (to, from, next) => {
    console.log(to.path)

    try {
        await store.dispatch('user/actionSetUserInfo')
        await store.dispatch('permistion/actionSetUserInfo')
        const userInfo = store.state.user

        console.log('navigationquard', userInfo)
    } catch (error) {
        next()
        console.error('beforeEach catch error:', error)
    }

    // 该函数中必须要执行next()
    next()
})
