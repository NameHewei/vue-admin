<template>
    <div>
        <h1>
            自定义【v-xxx】命令
        </h1>
        <section>
            <button type="primary" v-permission="'20123'">权限按钮</button>
        </section>
        <input type="text" v-focus:[par]="val">

    </div>
</template>

<script>
export default {
    name: 'CustomDirective',
    data () {
        return {
            val: 'everyone',
            par: 'params'
        }
    },
    directives: {
        focus: {
            /* 添加inserted钩子函数 当元素被插入时执行 */
            inserted: function (el, binding) {
                // el 可以用来直接操作 DOM
                el.focus()
                // console.log('value', binding.value) // everyone  返回绑定的值
                // console.log('arg', binding.arg) // params 传给指令的参数
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
