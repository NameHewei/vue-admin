<template>
    <div>
        <div style="padding: 10px 0;background-color:#f2f2f2;">
            安装与引用
            <pre>
                npm install echarts --save
            </pre>
            <pre>
                Vue.prototype.$echarts = echarts
                import echarts from 'echarts'
            </pre>
            <div><b>参考链接：<a href="http://echarts.baidu.com/tutorial.html#%E5%9C%A8%20webpack%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts" target="_blank">echarts 官网</a></b></div>
        </div>
        <div id="main" :style="{width: '300px', height: '300px'}"></div>
        <div>
            <el-button @click="handleRouteSkip">跳转</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {}
    },
    mounted () {
        var myChart = this.$eCharts.init(document.getElementById('main'), null, { renderer: 'svg' })
        // 绘制图表
        myChart.setOption({
            title: {
                text: 'Histogram'
            },
            tooltip: {
                show: true
            },
            xAxis: {
                data: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6']
            },
            yAxis: {},
            series: [{
                name: 'value',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        })
    },
    methods: {
        getA () {
            this.$http({
                method: 'GET',
                url: 'cookie/',
                successFn: (res) => {
                    console.log('res:', res)
                },
                errorFn: (err) => {
                    console.log(err)
                }
            })
        },

        handleRouteSkip () {
            this.$router.push({
                name: 'financial'
            })
        }
    }
}
</script>

<style scoped type="text/scss" lang="scss">

</style>
