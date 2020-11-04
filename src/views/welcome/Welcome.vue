<template>
    <div>
        <div id="get">I have a dream</div>
        欢迎页面
        <div>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shoutao"></use>
            </svg>

            <el-row>
                <el-button plain >朴素按钮</el-button>
                <el-button :autofocus="true" type="primary" plain >主要按钮</el-button>
                <el-button type="success" plain >成功按钮</el-button>
                <el-button type="info" plain >信息按钮</el-button>
                <el-button type="warning" plain >警告按钮</el-button>
                <el-button type="danger" plain >危险按钮</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
import { upgradeReqGet, upgradeReqPost, upgradeReqPut, upgradeReqGetId } from '@/api/common/common.js'

export default {
    data () {
        return {
            key: 0,
            data: []
        }
    },

    mounted () {
        if (this.key) {
            upgradeReqGetId({
                id: 'get',
                p: 77,
                pp: 777
            })
            upgradeReqGet({
                p: 1,
                pp: 22
            })
            upgradeReqPost({
                p: 3,
                pp: 33
            })
            upgradeReqPut({
                p: 5,
                pp: 55
            })
        }
    },

    methods: { }
}
</script>

<style scoped>
.icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
