<template>
    <div>
        <input ref="file" type="file" @change="handleFileChange">
        <div style="margin-top: 20px">
            <el-button type="primary" @click="upload">上传</el-button>
        </div>
    </div>
</template>

<script>
import { reqUploadFile } from '@/api/common/common'

export default {
    data () {
        return {
            file: null
        }
    },

    methods: {
        handleFileChange () {
            this.file = this.$refs.file.files[0]
        },

        upload () {
            const formData = new FormData()
            formData.append('file', this.file)
            reqUploadFile(formData)
        }
    }
}
</script>

<style scoped>

</style>
