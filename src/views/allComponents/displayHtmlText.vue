<template>
    <div>
        <p> http 请求返回完整的 html  怎么预览 </p>
        <el-button type="primary" @click="handleOpenPage">打开新页面</el-button>
    </div>
</template>

<script>
export default {
    methods: {
        handleOpenPage () {
            localStorage.removeItem('displayHtmlText')
            localStorage.setItem('displayHtmlText', '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>preview</title></head><body>打开一个新页面 处理  返回一整个html </body></html>')
            window.open('./displayHtmlText.html')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
