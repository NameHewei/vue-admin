<template>
    <div>
        <h3> http 请求返回完整的 html  怎么预览 </h3>
        <p>将html注入到 localStorage</p>
        <pre>
            localStorage.removeItem('displayHtmlText')
            localStorage.setItem('displayHtmlText', '这是一个后端返回的完整html文件字符串')
            window.open('./displayHtmlText.html')
        </pre>
        <p>在打开页面将 localStorage 中的html显示出来 </p>
        <pre>
            document.open();
            document.write(localStorage.getItem('preview'))
            document.close();
        </pre>
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
