<template>
    <div style="padding: 10px;margin: 10px 0; background-color: rgba(150,150,150,.1)">
        <div>
            child count:{{ count }}
        </div>
        <el-button
            type="success"
            @click="add"
        >子组件+1  .sync 方式</el-button>

        <div style="margin-top: 20px">
            <span>一般emit方式</span>
            <input :value="name" @input="passByEmit"/>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: 'no data'
        },

        count: {
            type: Number,
            default: 0
        }
    },

    created () { },

    watch: {
        name (v) {
            // this.name = v
        }
    },

    methods: {
        passByEmit (v) {
            this.$emit('updateName', v.target.value)
        },

        add () {
            const a = this.count + 1
            this.$emit('update:count', a)
        }
    }
}
</script>

<style scoped>

</style>
