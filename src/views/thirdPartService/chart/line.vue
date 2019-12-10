<template>
    <div>
        <div id="line" style="width: 400px; height: 400px"></div>
    </div>
</template>

<script>
export default {
    name: 'CustomLine',

    mounted () {
        this.initLine()
    },

    methods: {
        initLine () {
            const myChart = this.$eCharts.init(document.getElementById('line'), null, {
                renderer: 'canvas'
            })
            // 绘制图表
            myChart.setOption({
                title: {
                    text: 'line',
                    textAlign: 'left'
                },
                legend: {
                    data: ['y11', 'y22'],
                    /** 图例组件离容器上侧的距离 */
                    top: 10
                },
                tooltip: {
                    /** 折线图只有a(图例名)、b(x轴值)、c(y轴值) */
                    formatter: '{a}: {b}<br />{c}'
                },
                grid: {
                    left: 10,
                    right: 10,
                    /** grid 组件离容器上侧的距离 */
                    top: 100,
                    bottom: 45,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        rotate: 60,
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: [
                    {
                        name: 'y1',
                        type: 'value',
                        axisLabel: {
                            formatter: (value) => {
                                const val = (value) + '值'
                                return val
                            }
                        }
                    },
                    {
                        name: 'y2',
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'y11',
                        data: [1, 2, 3, 4, 5, 6, 7],
                        type: 'line',
                        itemStyle: {
                            /** 修改的是图例颜色，线条颜色默认也会取该颜色 */
                            color: 'pink'
                        }
                    },
                    {
                        name: 'y22',
                        yAxisIndex: 1,
                        data: [11, 21, 31, 41, 51, 61, 71],
                        type: 'line',
                        itemStyle: {
                            color: 'blue'
                        }
                    }
                ]
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
