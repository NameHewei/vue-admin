const Toast = {
    install (Vue, options) {
        // 参考： https://cn.vuejs.org/v2/guide/plugins.html#%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6

        // 这里只演示简单的 mixin 和 实例方法

        Vue.mixin({
            data () {
                return {
                    pluginData: '插件中的mixin中的数据'
                }
            }
        })

        Vue.prototype.$pluginMethod = () => {
            console.warn('插件实例方法输出')
        }
    }
}

export default Toast
