<template>
    <div class="main-all-components">
        <div class="part">
            <h3>返回</h3>
            <BackHeader></BackHeader>
        </div>
        <div class="part">
            <h3>axios 上传文件</h3>
            <UploadFile></UploadFile>
        </div>
        <div class="part">
            <h3>导出  利用url下载</h3>
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
        <div class="part">
            <h3>树组件</h3>
            <TreeWrap></TreeWrap>
        </div>
        <div class="part">
            <h3>表单</h3>
            <CusForm></CusForm>
        </div>
    </div>
</template>

<script>
import BackHeader from '@/views/components/backHeader'
import UploadFile from './UploadFile'
import Search from './search/Search.vue'
import TableWrap from './table/TableWrap.vue'
import TreeWrap from './tree/TreeWrap.vue'
import CusForm from './form/cusForm.vue'

export default {
    name: 'AllComponents',
    components: {
        Search,
        TableWrap,
        TreeWrap,
        UploadFile,
        CusForm,
        BackHeader
    },

    data () {
        return {
            searchOptions: [
                { type: 'input', key: 'name', label: '文本框', defaultValue: 'default' },
                {
                    type: 'select',
                    key: 'status',
                    label: '下拉选择',
                    // multiple: ,
                    options: [{ key: 'yes', value: '是' }, { key: 'no', value: '否' }]
                },
                { type: 'date', key: 'date', label: '日期' },
                { type: 'dateTime', key: 'dateTime', label: '日期带时间' },
                { type: 'dateRange', key: 'dateRange', label: '日期范围' },
                { type: 'dateTimeRange', key: 'dateTimeRange', label: '日期范围' },
                {
                    type: 'cascade',
                    key: 'cascade',
                    label: '层级选择',
                    defaultValue: 'yizhi',
                    options: [{
                        value: 'zhinan',
                        label: '指南',
                        children: [{
                            value: 'shejiyuanze',
                            label: '设计原则',
                            children: [{
                                value: 'yizhi',
                                label: '一致'
                            }]
                        }, {
                            value: 'daohang',
                            label: '导航',
                            children: [{
                                value: 'cexiangdaohang',
                                label: '侧向导航'
                            }]
                        }]
                    }]
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
