<template>
    <div>
        <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :file-list="fileList"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
        >
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
export default {
    model: {
        prop: 'imageUrls',
        event: 'upSuccess'
    },

    props: {
        imageUrls: {
            type: Array,
            default: () => ([])
        }
    },

    data () {
        return {
            dialogImageUrl: '',
            dialogVisible: false
        }
    },

    computed: {
        fileList (v) {
            const { imageUrls } = this
            if (imageUrls && imageUrls.length) return imageUrls.map((v, index) => ({ name: index, url: v }))
            return []
        }
    },

    methods: {
        handleRemove (file, fileList) {
            // console.log(file, fileList)
        },

        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        }
    }
}
</script>

<style scoped>

</style>
