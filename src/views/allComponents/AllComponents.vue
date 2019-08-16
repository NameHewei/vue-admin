<template>
    <div class="main-all-components">
        <div class="part">
            <h3> 导出 </h3>
            <ExportWrap></ExportWrap>
        </div>
        <div class="part">
            <h3> 上传图片 </h3>
            <UploadImgWrap></UploadImgWrap>
        </div>
        <div class="part">
            <h3> 搜索组件 </h3>
            <Search :searchOptions="searchOptions" @callback="handleCallback"></Search>
        </div>
        <div class="part">
            <h3>表格组件</h3>
            <TableWrap></TableWrap>
        </div>
    </div>
</template>

<script>
import Search from './search/Search.vue'
import TableWrap from './table/TableWrap.vue'

export default {
    name: 'AllComponents',
    components: {
        Search,
        TableWrap
    },

    data () {
        return {
            searchOptions: [
                {
                    type: 'input', key: 'name', label: '用户名'
                },
                {
                    type: 'select',
                    key: 'status',
                    label: '状态',
                    options: [{ key: 'yes', value: '是' }, { key: 'no', value: '否' }]
                }
            ]

        }
    },

    methods: {
        handleCallback (data) {
            console.log('搜索值：', data)
        }
    }
}
</script>

<style lang="scss" scoped>
    .main-all-components {
        >div {
            margin: 10px 0;
        }
    }
    .part {
        border-top: 2px solid #eee;
        h3 {
            padding: 6px;
            border-left: solid 2px rgb(214, 214, 214);
            font-size: 16px;
            font-weight: 500;
            color: rgb(110, 110, 110);
            background-color: rgb(238, 238, 238);
        }
    }
</style>
