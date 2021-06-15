<template>
    <div>
        <h2>柱状图</h2>
        <div id="main" style="width: 800px; height: 400px;background: #ededed"></div>

        <h2>横向柱状图</h2>
        <div id="mainCrosswise" style="width: 800px; height: 400px;background: #ededed"></div>
    </div>
</template>

<script>
export default {
    name: 'CustomBar',

    mounted () {
        this.setCrosswise()

        const myChart = this.$eCharts.init(document.getElementById('main'), null, {
            renderer: 'svg'
        })
        const sData = [
            {
                name: 'series-name',
                type: 'bar',
                /* 柱状图的宽度 */
                barWidth: 30,
                label: {
                    show: true
                },
                // 柱条样式
                itemStyle: {
                    color: new this.$eCharts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#83bff6' },
                            { offset: 0.5, color: '#188df0' },
                            { offset: 1, color: '#188df0' }
                        ]
                    )
                },
                // 鼠标放上去  高亮柱条样式
                emphasis: {
                    itemStyle: {
                        color: new this.$eCharts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: '#2378f7' },
                                { offset: 0.7, color: '#2378f7' },
                                { offset: 1, color: '#83bff6' }
                            ]
                        )
                    }
                },
                data: [5, 20, 36, 10, 10, 20],
                // 箭头线
                markLine: {
                    silent: true,
                    lineStyle: {
                        color: 'orange'
                    },
                    data: [{ xAxis: '1-1' }]
                }
            }
        ]
        const option = {
            /** 调色盘颜色列表。如果系列没有设置颜色，则会依次循环从该列表中取颜色作为系列颜色。 */
            color: ['lightGreen'],
            title: {
                text: 'Histogram'
            },
            legend: {
                show: true
            },
            grid: {
                left: 30,
                right: 10
            },
            /* 工具栏 */
            toolbox: {
                show: true,
                /** 图标大小 */
                itemSize: 30,
                right: 40,
                width: 400,
                feature: {
                    // 保存为图片
                    saveAsImage: {},
                    // 配置项还原
                    restore: {},
                    // 转换为图表显示
                    dataView: { readOnly: false },
                    // 数据区域缩放
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    // 图表切换
                    magicType: { type: ['line', 'bar'] },
                    myTool: {
                        show: true,
                        title: '自定义工具',
                        icon: 'image://http://echarts.baidu.com/images/favicon.png',
                        onclick: function () {
                            if (sData[0].markLine.data.length) {
                                sData[0].markLine.data = []
                            } else {
                                sData[0].markLine.data = [{ xAxis: '1-1' }]
                            }

                            myChart.setOption(option)
                        }
                    }
                }
            },
            /** 提示框组件 */
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                // 利用 z 和 inside 将x轴的值显示到柱子上
                z: 2,
                data: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6'],
                /** 是否显示x轴 */
                show: true,
                axisLabel: {
                    fontSize: 14,
                    inside: true,
                },
            },
            yAxis: {},
            series: sData
        }

        // 绘制图表
        myChart.setOption(option)
    },

    methods: {
        setCrosswise () {
            const myChart = this.$eCharts.init(document.getElementById('mainCrosswise'), null, {
                renderer: 'svg'
            })

            myChart.setOption({
                xAxis: {
                    // 坐标轴刻度最大值
                    // 可以设置成特殊值 'dataMax'，此时取数据在该轴上的最大值作为最大刻度
                    max: 'dataMax',
                    // 坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样
                    // boundaryGap: [],
                },
                yAxis: {
                    type: 'category',
                    data: ['A类', 'B', 'C', 'D', 'E'],
                    // 是否是反向坐标轴
                    inverse: true,
                    animationDuration: 300,
                    animationDurationUpdate: 300,
                    // 如果是类目轴，数值表示显示多少条类目数据，如果值为 n ，显示 n+1 条类目数据
                    // max: 3
                },
                series: [{
                    realtimeSort: true,
                    name: 'X',
                    type: 'bar',
                    data: [100, 520, 90, 199, 256],
                    label: {
                        show: true,
                        position: 'inside',
                    }
                }],
                legend: {
                    show: false
                },
                // 这里如果要在柱状条里面显示值 需要将animation设置为false 或 animationDuration 设置为 0 否者不会正常显示
                animation: false,
                animationDuration: 0,
                animationDurationUpdate: 3000,
                animationEasing: 'linear',
                animationEasingUpdate: 'linear'
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
