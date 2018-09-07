<template>
    <div>
        <a @click.prevent="exportData">
            <el-button
                :type="type"
            >
                {{ title }}
            </el-button>
        </a>
    </div>
</template>

<script>
import { commonUtilFn } from '@/utils'

export default {
    name: 'ExportWrap',

    props: {
        title: {
            type: String,
            default: 'export data'
        },

        type: {
            type: String,
            default: 'warning'
        },

        url: {
            type: String,
            default: ''
        },

        query: {
            type: Object,
            default: () => ({})
        }
    },

    data () {
        return { }
    },

    methods: {
        exportData () {
            const { url, query } = this,
                lenth = Object.keys(query).length

            window.location.href = `${url}${lenth ? `?${commonUtilFn.formatToQueryString(query)}` : ''}`
        }
    }
}
</script>
