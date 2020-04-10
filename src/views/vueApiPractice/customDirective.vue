<template>
    <div>
        你好
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
                console.log(bind)
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
