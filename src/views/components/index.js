import Vue from 'vue'

/* 将首字母大写 */
function capitalizeFirstLetter (string) {
    /* string: ExportWrap */
    return string.charAt(0).toUpperCase() + string.slice(1)
}

/*
    参考 https://webpack.js.org/guides/dependency-management/#require-with-expression
    webpack 提供的 require.context
    参数： 1.引入文件的目录 2.是否查找该目录的子级目录 3. 匹配文件类型
    返回： 返回值为一个 require 函数（可用于加载文件模块），并且有3个属性 resolve(函数), keys(函数), id

    具体查看某个值，可console打印在控制台查看
*/
const requireComponent = require.context('.', false, /\.vue$/)

requireComponent.keys().forEach(fileName => {
    /* fileName: ./ExportWrap.vue */
    const componentConfig = requireComponent(fileName)

    // 因为得到的filename格式是: './baseButton.vue', 所以这里我们去掉头和尾，只保留真正的文件名
    const componentName = capitalizeFirstLetter(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))

    Vue.component(componentName, componentConfig.default || componentConfig)
})
