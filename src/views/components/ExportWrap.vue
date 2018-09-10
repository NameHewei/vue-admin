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
import { formatToQueryString } from '@/utils'

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
            default: 'http://www.a.com'
        },

        query: {
            type: Object,
            default: () => ({
                p1: '23'
            })
        }
    },

    data () {
        return { }
    },

    methods: {
        exportData () {
            const { url, query } = this,
                lenth = Object.keys(query).length

            window.location.href = `${url}${lenth ? `?${formatToQueryString(query)}` : ''}`
        }
    }
}
</script>
