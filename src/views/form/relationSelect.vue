<template>
    <div>
        <el-select
            @change="handleLevel1"
            v-model="sLevel1"
        >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item">
            </el-option>
        </el-select>
        <el-select
            @change="handleLevel"
            multiple
            v-model="sLevel2"
        >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item">
            </el-option>
        </el-select>
    </div>
</template>

<script>
export default {
    name: 'RelationSelect',

    data () {
        return {
            sLevel1: {},
            sLevel2: [],
            options: [{
                value: '1',
                label: '第一'
            }, {
                value: '2',
                label: '第二'
            }, {
                value: '3',
                label: '第三'
            }]
        }
    },

    methods: {
        emitData () {
            const { sLevel1, sLevel2 } = this
            this.$emit('callbackRelationSelect', [sLevel1, sLevel2])
        },

        handleLevel1 () {
            this.sLevel2 = []
            this.emitData()
        },

        handleLevel () {
            this.emitData()
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
