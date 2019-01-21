import router from './router/router'

router.beforeEach((to, from, next) => {
    console.log(to.path)

    // 该函数中必须要执行next()
    next()
})
