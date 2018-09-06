<template>
    <div class="wang-editor">
        <h2>rich text wangEditor</h2>
        <div ref="editor" class="editor-container"></div>
        <el-button type="primary" @click='getContent'>get content</el-button>
    </div>
</template>

<script>
    import Editor from 'wangeditor';

    export default {
        data() {
            return {
                editContent: ''
            }
        },

        mounted(){
            const editor = new Editor(this.$refs.editor);
            editor.customConfig.onchange = (html) => {
                this.editContent = html;
            };
            editor.create();
        },

        methods: {
            getContent(){
                console.log(this.editContent)   
            }
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
    .wang-editor{
        color: #fff;
        h2{
            text-align: center;
        }
        .editor-container{
            padding: 10px 0;
        }
    }

</style>