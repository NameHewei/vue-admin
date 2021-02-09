import Vue from 'vue'
import router from '@/router/router'

/* 按钮权限 */
Vue.directive('permission', {
    /* 添加inserted钩子函数 当元素被插入时执行 */
    inserted: function (el, binding) {
        const permission = ['2012'].includes(binding.value)
        el.innerHTML = permission ? '有权限' : '无权限'
        if (!permission) {
            el.setAttribute('disabled', true)
        }
    }
})

/* 返回 */
Vue.directive('goBack', {
    /* 添加inserted钩子函数 当元素被插入时执行 */
    inserted: function (el) {
        el.onclick = () => {
            router.go(-1)
        }
    },
    /**
     * @des 只调用一次，指令与元素解绑时调用
     */
    unbind: function (el) {
        console.warn('unbind')
        el.onclick = null
    }
})
