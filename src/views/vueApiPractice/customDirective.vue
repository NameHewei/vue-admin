<template>
    <div>
        自定义【v-xxx】命令
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
            inserted: function (el, bind) {
                el.focus()
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
