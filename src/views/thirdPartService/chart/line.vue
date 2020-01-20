<template>
    <div>
        <div id="line" style="width: 600px; height: 400px"></div>
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
                    textAlign: 'left',
                    subtext: '副标题',
                    textStyle: {
                        fontSize: 20
                    }
                },
                legend: {
                    /** 控制图例的显示 */
                    show: true,
                    /** legend 中 data 的值要与 series 中的name值对应一致；也可以不写直接默认 */
                    data: ['y11', 'y22', 'y33'],
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
                    /** grid 组件离容器上侧的距离 即绘制的图表距离容器四周的距离 */
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
                    data: [10, 20, 30, 40, 50, 60, 70]
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
                        data: [90, 80, 30, 30, 10, 30, 110],
                        type: 'line',
                        stack: 'st',
                        itemStyle: {
                            /** 修改的是图例颜色，线条颜色默认也会取该颜色 */
                            color: 'orange'
                        },
                        /** 图形上的文本标签, 比如值，名称等 */
                        label: {
                            show: true
                        },
                        markLine: {
                            lineStyle: {
                                color: '#09f2b8'
                            },
                            silent: true,
                            data: [
                                [
                                    {
                                        // 最大值和最小值之间的连线
                                        name: '最小值到最大值',
                                        type: 'min'
                                    },
                                    {
                                        name: '最大值',
                                        type: 'max'
                                    }
                                ]

                            ]
                        }
                    },
                    {
                        name: 'y22',
                        /** 添加了stack后 后一条数据在显示时会将前面一条的值累加在自身上，但值还是显示未累加前的值 */
                        stack: 'st',
                        data: [50, 30, 80, 100, 20, 10, 60],
                        type: 'line',
                        label: {
                            show: true
                        },
                        markLine: {
                            silent: true,
                            data: [
                                {
                                    name: 'Y 轴值为 100 的水平线',
                                    /** 注意这里的值为字符串 */
                                    xAxis: '50',
                                    label: {
                                        formatter: '格式化名称'
                                    }
                                },
                                {
                                    name: 'Y 轴值为 100 的水平线',
                                    yAxis: 60
                                }
                            ]
                        }
                    },
                    {
                        name: 'y33',
                        yAxisIndex: 1,
                        data: [10, 20, 30, 40, 50, 60, 70],
                        type: 'line',
                        markLine: {
                            silent: true,
                            data: [
                                {
                                    name: 'x',
                                    /** 注意这里的值为字符串 */
                                    xAxis: '20'
                                }
                            ]
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
