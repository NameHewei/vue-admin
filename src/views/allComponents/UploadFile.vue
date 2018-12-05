<template>
    <div>
        <input ref="file" type="file" @change="handleFileChange">
    </div>
</template>

<script>
import { uploadFile } from '@/api/common/common'
export default {
    data () {
        return {
            fileName: ''
        }
    },

    methods: {
        handleFileChange () {
            console.log(this.$refs.file.files[0])
            const formData = new FormData()
            formData.append('file', this.$refs.file.files[0])
            uploadFile(formData)
        }
    }
}
</script>

<style scoped>

</style>
