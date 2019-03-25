<template>
    <div id="main">
        <div>
            <div class="tit">Daily Update</div>
            <div class="handle_part">
                <div class="h_item">
                    <el-select v-model="product" placeholder="please select">
                        <el-option
                            v-for="item in productsSelect"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="h_item">
                    <el-input v-model="change" placeholder="money"></el-input>
                </div>
                <div class="h_item">
                    <el-button type="danger"  @click="handleSubmit">submit</el-button>
                </div>
            </div>
        </div>
        <div id="line"></div>
        <div id="piePart">
            <div class="tit">总计</div>
            <div id="pie"></div>
        </div>
    </div>
</template>

<script>
import { reqList } from '@/api/thirdService/thirdService'
import { isNumber } from '@/utils/validate'

export default {
    data () {
        return {
            productsSelect: [
                { key: 'yue', value: 'y' }, { key: '天', value: 'w' }
            ],
            product: '',
            change: ''
        }
    },

    created () {
        this.getList()
    },

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
                this.$eCharts.init(document.getElementById(key), null, { renderer: 'svg' }).setOption(
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
                            /**
                             * 在点上显示值
                             */
                            itemStyle: { normal: { label: { show: true } } }
                        }]
                    })
            }

        // Object.keys(products).forEach(v => {
        //     const div = document.createElement('div')
        //     div.setAttribute('class', 'tit')
        //     div.innerHTML = v
        //     document.getElementById('line').appendChild(div)
        //     products[v].forEach(_v => {
        //         const _div = document.createElement('div')
        //         _div.setAttribute('class', 'charts')
        //         _div.setAttribute('id', _v.key)
        //         document.getElementById('line').appendChild(_div)
        //         initAndSetOptionn(_v)
        //     })
        // })

        this.initPie()
    },

    methods: {
        async getList () {
            const res = await reqList()

            console.log(res)
            this.initCompanyProduct(res.results)
        },

        /**
         * 将公司的产品实例化
         */
        initCompanyProduct (products) {
            this.createElement({
                parentId: 'line',
                title: 'ali'
            })
            products.forEach(value => {
                this.createElement({
                    parentId: 'line',
                    childId: `ali${value.id}`
                })
                this.createLine(value)
            })
        },

        /**
         * 创建折线图
         */
        createLine (data) {
            const xData = [], yData = []
            data.list.forEach(({ total, date }) => {
                xData.push(date)
                yData.push(total)
            })
            this.$eCharts.init(document.getElementById(`ali${data.id}`)).setOption(
                {
                    title: {
                        text: decodeURIComponent(data.name)
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
                        data: yData,
                        type: 'line',
                        /**
                         * 在点上显示值
                         */
                        itemStyle: { normal: { label: { show: true } } }
                    }]
                })
        },

        createElement ({ parentId, title, childId }) {
            const div = document.createElement('div')
            div.setAttribute('class', 'tit')
            if (childId) {
                div.setAttribute('class', 'charts')
                div.setAttribute('id', childId)
            } else {
                div.innerHTML = title
            }
            document.getElementById(parentId).appendChild(div)
        },

        initPie () {
            this.$eCharts.init(document.getElementById('pie')).setOption({
                backgroundColor: '#2c343c',

                title: {
                    text: 'Customized Pie',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },

                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },

                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [
                            { value: 335, name: '直接访问' },
                            { value: 310, name: '邮件营销' },
                            { value: 274, name: '联盟广告' },
                            { value: 235, name: '视频广告' },
                            { value: 400, name: '搜索引擎' }
                        ].sort(function (a, b) { return a.value - b.value }),
                        roseType: 'radius',
                        label: {
                            normal: {
                                textStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#c23531',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },

                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200
                        }
                    }
                ]
            })
        },

        handleSubmit () {
            const { product, change } = this
            if (!product) {
                this.$message.error('please select')
            }
            if (!isNumber(change)) {
                this.$message.error('please enter number')
            }

            console.log(product, change)
        }
    }
}
</script>

<style>
    .handle_part{
        padding: 30px 0;
    }
    .tit{
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
        font-weight: 700;
        color: #fff;
        background-color: rgb(250, 10, 10)
    }
    .charts{
        height: 300px;
        width: 100%;
    }
    #pie {
        width: 400px;
        height: 400px;
    }
    .h_item{
        display: inline-block;
        margin-right: 10px;
    }
</style>
