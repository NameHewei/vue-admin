import router, { permiteRouters } from './router/router'
import store from './store/store'

router.beforeEach(async (to, from, next) => {
    await store.dispatch('user/actionSetUserInfo')
    next()
    // if (to.path === '/login') {
    //     // 该函数中必须要执行next()
    //     next()
    // } else {
    //     // 判断用户信息是否已经有了，如果有了就不进行获取和添加路由等操作
    //     if (store.state.user.roles.length === 0) {
    //         try {
    //             await store.dispatch('user/actionSetUserInfo')

    //             // 根据当前登录用户的角色，添加路由
    //             router.addRoutes(permitRouters(store.state.user.roles))

    //             next({ ...to, replace: true })
    //             // console.log('navigationGuard', userInfo)
    //         } catch (error) {
    //             next({ path: '/login' })
    //             console.error('beforeEach catch error:', error)
    //         }
    //     }
    // }
})
