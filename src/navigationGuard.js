import router, { permiteRouters } from './router/router'
import store from './store/store'

router.beforeEach(async (to, from, next) => {
    console.log(to.path)
    if (to.path === '/login') {
        // 该函数中必须要执行next()
        next()
    } else {
        try {
            await store.dispatch('user/actionSetUserInfo')

            // 根据当前登录用户的角色，添加路由
            router.addRoutes(permiteRouters(store.state.user.roles))

            // console.log('navigationquard', userInfo)
        } catch (error) {
            next({ path: '/login' })
            console.error('beforeEach catch error:', error)
        }
    }
})
