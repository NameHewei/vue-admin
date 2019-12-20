<template>
    <div>
        <div id="main" style="width: 400px; height: 400px"></div>
    </div>
</template>

<script>
export default {
    name: 'CustomBar',

    mounted () {
        const myChart = this.$eCharts.init(document.getElementById('main'), null, {
            renderer: 'svg'
        })
        // 绘制图表
        myChart.setOption({
            /** 调色盘颜色列表。如果系列没有设置颜色，则会依次循环从该列表中取颜色作为系列颜色。 */
            color: ['lightGreen'],
            title: {
                text: 'Histogram'
            },
            legend: {
                show: true
            },
            /** 提示框组件 */
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6'],
                /** 是否显示x轴 */
                show: true
            },
            yAxis: {},
            series: [
                {
                    name: 'series-name',
                    type: 'bar',
                    label: {
                        show: true
                    },
                    data: [5, 20, 36, 10, 10, 20]
                }
            ]
        })
    }
}
</script>

<style lang="scss" scoped>

</style>
