<template>
    <div>
        <h1>
            自定义【v-xxx】命令
        </h1>
        <hr>
        <section >
            <h3>全局指令：按钮权限</h3>
            <button style="margin: 10px" v-permission="'20123'">全局权限按钮</button>
            <button style="margin: 10px" v-permission="'2012'">全局权限按钮</button>
        </section>
        <hr>
        <section>
            <h3>局部指令：自动获取焦点</h3>
            <input type="text" v-focus:[par]="val">
        </section>
        <hr>
        <section>
            <h3>全局指令：点击返回</h3>
            <el-button type="primary" v-goBack>返回</el-button>
        </section>
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
