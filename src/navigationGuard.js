import router, { permitRouters } from './router/router'
import store from './store/store'

router.beforeEach(async (to, from, next) => {
    if (to.path === '/login') {
        // 如果是进入登录页面不需要进行校验
        next()
    } else {
        // 判断用户信息是否已经有了，如果没有，进行获取和添加路由等操作
        if (store.state.user.roles.length === 0) {
            try {
                await store.dispatch('user/actionSetUserInfo')
                // 根据当前登录用户的角色，添加路由
                router.addRoutes(permitRouters(store.state.user.roles))

                next({ ...to, replace: true })
            } catch (error) {
                next({ path: '/login' })
                console.error('beforeEach catch error:', error)
            }
        } else {
            next()
        }
    }
})
