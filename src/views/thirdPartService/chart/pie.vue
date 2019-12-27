<template>
    <div>
        <div ref="mainPie" style="width: 500px; height: 300px"></div>
        <div ref="mainPieMulti" style="width: 800px; height: 600px;border-top: 2px solid #e5e5e5"></div>
    </div>
</template>

<script>
export default {
    name: 'CustomPie',

    mounted () {
        this.setPie()
        this.setMultiPie()
    },

    methods: {
        setPie () {
            const myChart = this.$eCharts.init(this.$refs.mainPie, null)
            myChart.setOption({
                title: {
                    text: '某站点用户访问来源',
                    subtext: '纯属虚构',
                    /** x: 'center' 作用同下 left */
                    left: 'right'
                },
                tooltip: {
                    trigger: 'item'
                    /** 饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比） */
                    // formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    /** 当图例过多时可以滚动起来 */
                    type: 'scroll',
                    orient: 'vertical',
                    left: 'right',
                    top: 'center'
                    /**
                     * 这里的值与 series.data 中的 name 对应
                     * 也可以不写，直接默认
                     */
                    // data: ['直接访问:335次', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        /** 兰丁格尔图  以半径radius或面积area */
                        roseType: 'radius',
                        radius: '55%',
                        /** 饼图圆心位置 */
                        center: ['40%', '50%'],
                        data: [
                            { value: 335, name: '直接访问:335次' },
                            { value: 310, name: '邮件营销' },
                            { value: 234, name: '联盟广告' },
                            { value: 135, name: '视频广告' },
                            { value: 1548, name: '搜索引擎' }
                        ],
                        label: {
                            show: true,
                            /** inside outside */
                            position: 'outside'
                        },
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            })
        },

        setMultiPie () {
            const myChart = this.$eCharts.init(this.$refs.mainPieMulti, null)
            myChart.setOption({
                legend: {
                    orient: 'vertical',
                    left: 'center',
                    top: 'top',
                    data: ['Matcha Latte', 'Milk Tea', 'Milk Tea', 'Cheese Cocoa']
                },
                tooltip: {},
                dataset: {
                    source: [
                        /** 以下数据排列相当于表格 */
                        ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
                        ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 100, 98.7],
                        ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 100, 55.1],
                        ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 100, 82.5]
                    ]
                },
                series: [{
                    type: 'pie',
                    radius: 60,
                    center: ['25%', '30%']
                    /** 没有encode字段 默认第一条，这里是 2012 */
                }, {
                    type: 'pie',
                    radius: 60,
                    center: ['75%', '30%'],
                    encode: {
                        itemName: 'product',
                        value: '2013'
                    }
                }, {
                    type: 'pie',
                    radius: 60,
                    center: ['25%', '75%'],
                    encode: {
                        itemName: 'product',
                        value: '2014'
                    }
                }, {
                    type: 'pie',
                    radius: 60,
                    center: ['75%', '75%'],
                    encode: {
                        itemName: 'product',
                        value: '2015'
                    }
                }, {
                    type: 'pie',
                    radius: 60,
                    center: ['50%', '50%'],
                    encode: {
                        itemName: 'product',
                        value: '2016'
                    }
                }]
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
