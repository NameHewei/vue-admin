<template>
    <div>
        <el-menu
            default-active="2"
            background-color="rgba(250,250,250,.3)"
            text-color="#fff"
            active-text-color="#fff"
            class="ud-menu"
            @open="handleOpen"
            @close="handleClose"
        >
            <el-submenu
                v-for="(item, index) in menu"
                :key="index"
                :index="`${index}`"
            >
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{ item.title }}</span>
                </template>
                <el-menu-item
                    v-for="(_item, _index) in item.children"
                    :key="_index"
                    :index="`${index}-${_index}`"
                    @click="routerSkip(_item.name)"
                >
                    {{ _item.title }}
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    data () {
        return {
            menu: [
                { title: 'Vue API Practice',
                    children: [
                        {title: 'prectice vue', name: 'practiceVue'},
                        {title: 'prectice vuex', name: 'practiceVuex'}
                    ]
                },
                { title: 'all components',
                    children: [
                        {title: 'components', name: 'allComponents'},
                        {title: 'table', name: 'table'}
                    ]
                },
                { title: 'ECharts', children: [{title: 'All-Charts', name: 'echarts'}] },
                { title: 'Other', children: [{title: 'no', name: 'no'}] }
            ]
        }
    },
    methods: {
        routerSkip (name) {
            this.$router.push({
                name
            })
        },

        handleClose () {
            console.log('')
        },

        handleOpen () {
            console.log('')
        }
    }
}
</script>

<style lang="scss">
@import '@/styles/layout/navbar.scss';
</style>
