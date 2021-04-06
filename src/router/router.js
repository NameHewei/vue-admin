import Vue from 'vue'
import Router from 'vue-router'
import utils from '@/utils/index.js'

import { baseRouter, routerTable, root } from './routerTable'

/*
   利用push 跳转路由，当重复点击跳转同一个路由地址时会报错 NavigationDuplicated 一下为处理该报错
   Vue-router在3.1之后把$router.push()方法改为了Promise
*/
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    /* 添加 catch 不抛出错误 */
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const router = new Router({
    /* 这里的键名必须是 routes */
    routes: baseRouter
})

/**
 * @des 根据权限生成路由
 */
const getPermitRouters = function (currentAccountRoles) {
    const recursionRouter = (arr) => {
        const tempModels = []
        arr.forEach(({ name, path, meta, component, children }) => {
            const roles = meta ? (meta.roles || []) : []
            // 判断当前模块是否有权限
            if (utils.arrayIntersection(currentAccountRoles, roles).length) {
                const tempModel = {}
                tempModel.path = path
                tempModel.name = name
                tempModel.meta = meta
                tempModel.component = component
                if (children && children.length) {
                    tempModel.children = recursionRouter(children)
                }
                tempModels.push(tempModel)
            }
        })
        return tempModels
    }
    return recursionRouter(routerTable)
}

const getMenu = (currentAccountRoles) => {
    const recursionRouter = (arr) => {
        const tempMenu = []
        arr.forEach(({ name, meta, children }) => {
            meta = meta || {}
            const { roles, title, icon, menu } = meta
            // 判断当前模块是否有权限
            if (utils.arrayIntersection(currentAccountRoles, roles).length && menu) {
                const tempChildren = {}
                tempChildren.name = name
                tempChildren.title = title
                tempChildren.icon = icon
                if (children && children.length) {
                    tempChildren.children = recursionRouter(children)
                }
                tempMenu.push(tempChildren)
            }
        })
        return tempMenu
    }

    return recursionRouter(routerTable)
}

export const permitRouters = function (currentAccountRoles) {
    const arr = [...root, ...getPermitRouters(currentAccountRoles)]
    arr.forEach(rc => {
        router.addRoute(rc)
    })
}

/**
 * @des 根据权限生成菜单
 */
export const permitMenu = function (currentAccountRoles) {
    return getMenu(currentAccountRoles)
}

export default router
