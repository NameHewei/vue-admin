<template>
    <div id="main">
    </div>
</template>

<script>
export default {
    mounted () {
        const products = {
                ali: [{
                    key: 'yue',
                    title: 'yue',
                    xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }, {
                    key: 'changJiang',
                    title: '%E9%95%BF%E6%B1%9F%E5%85%BB%E8%80%81%E5%8D%8A%E5%B9%B4%E4%BA%AB',
                    xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }],
                weChat: [{
                    key: 'change',
                    title: '%E9%9B%B6%E9%92%B1%E9%80%9A',
                    xData: [1],
                    data: [2872.49]
                }, {
                    key: 'nanFang',
                    title: '%E5%8D%97%E6%96%B9%E7%8E%B0%E9%87%91%E9%80%9AE',
                    xData: [1],
                    data: [9178.27]
                }, {
                    key: 'panDz',
                    title: '%E5%B9%B3%E5%AE%89%E7%9F%AD%E5%80%BAE',
                    xData: [1],
                    data: [4909.22]
                }
                ]
            },

            initAndSetOptionn = ({ key, title, xData, data }) => {
                this.$echarts.init(document.getElementById(key), null, { renderer: 'svg' }).setOption(
                    {
                        title: {
                            text: decodeURIComponent(title)
                        },
                        tooltip: {
                            show: true
                        },
                        xAxis: {
                            type: 'category',
                            data: xData
                        },
                        yAxis: { type: 'value' },
                        series: [{
                            data,
                            type: 'line',
                            // 在点上显示值
                            itemStyle: { normal: { label: { show: true } } }
                        }]
                    })
            }

        Object.keys(products).forEach(v => {
            const div = document.createElement('div')
            div.setAttribute('class', 'tit')
            div.innerHTML = v
            document.getElementById('main').appendChild(div)
            products[v].forEach(_v => {
                const _div = document.createElement('div')
                _div.setAttribute('class', 'charts')
                _div.setAttribute('id', _v.key)
                document.getElementById('main').appendChild(_div)
                initAndSetOptionn(_v)
            })
        })
    }
}
</script>

<style>
    .tit{
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
        color: #fff;
        background-color: rgb(11, 150, 115)
    }
    .charts{
        height: 300px;
        width: 100%;
    }
</style>
