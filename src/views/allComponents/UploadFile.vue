<template>
    <div>
        <input ref="file" type="file" @change="handleFileChange">
        <div style="margin-top: 20px">
            <el-button type="primary" @click="upload">上传</el-button>
        </div>
        <div style="margin: 10px 0">
            <el-button @click="handleSelectImg">选择图片</el-button>
            <h3>预览</h3>
            <div>
                <img v-for="(item, index) in images" :key="index" :src="item" alt="no" style="width:200px">
            </div>
        </div>
    </div>
</template>

<script>
import { reqUploadFile } from '@/api/common/common'
import { getFileFromLocal } from '@/utils/commonFn'

export default {
    data () {
        return {
            file: null,
            images: []
        }
    },

    methods: {
        handleFileChange () {
            this.file = this.$refs.file.files[0]
        },

        handleSelectImg () {
            getFileFromLocal(files => {
                this.images = [window.URL.createObjectURL(files[0])]
            })
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
