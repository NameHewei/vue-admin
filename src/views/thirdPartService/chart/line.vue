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
                    /** 控制图例的显示 */
                    show: true,
                    /** legend 中 data 的值要与 series 中的name值对应一致；也可以不写直接默认 */
                    data: ['y11', 'y22'],
                    /** 图例组件离容器上侧的距离: 数字或百分比 */
                    top: 10
                },
                /** 提示框组件 */
                tooltip: {
                    /**
                        1. axis: 主要 柱状图，折线图等会使用类目轴的图表（坐标轴触发,鼠标移动到某一坐标点即触发）
                        2. item： 主要 散点图，饼图等无类目轴的图表 （是否放到某个项或点时触发）
                    */
                    trigger: 'item',
                    /** 折线图只有a(series的name属性值)、b(x轴值)、c(y轴值) */
                    formatter: '{a}: {b}<br /><i style="color:red">{c}<i/>'
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
                        /** 旋转x轴显示值 */
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
                        },
                        /** 图形上的文本标签, 比如值，名称等 */
                        label: {
                            show: true
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
