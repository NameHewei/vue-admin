<template>
    <div style="padding: 10px">
        <div>
            child:{{ count }}
        </div>
        <el-button
            @click="add"
        >+1</el-button>

        <div style="margin-top: 20px">
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

    watch: {
        name (v) {
            this.name = v
        }
    },

    methods: {
        passByEmit (v) {
            this.$emit('updateName', v.target.value)
        },

        add () {
            const a = this.count + 1
            // this.count = a
            this.$emit('update:count', a)
        }
    }
}
</script>

<style scoped>

</style>
