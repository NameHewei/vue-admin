<template>
    <div>
        <a @click="exportData">
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
            default: () => 'export data'
        },
        type: {
            type: String,
            default: () => 'warning'
        },
        url: {
            type: String,
            default: () => ''
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
        exportData (e) {
            e.preventDefault()
            const { url, query } = this
            const lenth = Object.keys(query).length
            window.location.href = `/api${url}${lenth ? `?${commonUtilFn.formatToQueryString(query)}` : ''}`
        }
    }
}
</script>
