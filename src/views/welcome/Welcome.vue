<template>
    <div>
        <div id="get">I have a dream</div>
        欢迎页面
        <div>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shoutao"></use>
            </svg>
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
