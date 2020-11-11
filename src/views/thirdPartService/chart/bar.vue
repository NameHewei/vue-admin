<template>
    <div>
        <div id="main" style="width: 800px; height: 400px;background: #ededed"></div>
    </div>
</template>

<script>
export default {
    name: 'CustomBar',

    mounted () {
        const myChart = this.$eCharts.init(document.getElementById('main'), null, {
            renderer: 'svg'
        })
        const sData = [
            {
                name: 'series-name',
                type: 'bar',
                label: {
                    show: true
                },
                data: [5, 20, 36, 10, 10, 20],
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
                data: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6'],
                /** 是否显示x轴 */
                show: true
            },
            yAxis: {},
            series: sData
        }

        // 绘制图表
        myChart.setOption(option)
    }
}
</script>

<style lang="scss" scoped>

</style>
