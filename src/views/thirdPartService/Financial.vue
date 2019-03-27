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
import { reqList, reqCompany } from '@/api/thirdService/thirdService'
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
        this.getCompanyData()
    },

    methods: {
        async getList () {
            const res = await reqList()

            console.log(res)
            this.initCompanyProduct(res.results)
        },

        getCompanyData () {
            reqCompany().then((res) => {
                this.createPie(res.results)
            }).catch((error) => {
                console.log(error)
            })
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

        /**
         * 创建饼图
         */
        createPie (data) {
            const formatData = data.map(value => ({
                name: value.name,
                value: value.total
            }))
            formatData.sort((a, b) => (a.value - b.value))

            const min = formatData[0].value, max = formatData[formatData.length - 1].value

            console.log(min, max, formatData)

            this.$eCharts.init(document.getElementById('pie')).setOption({
                backgroundColor: '#2c343c',

                title: {
                    text: 'Asset Statistic',
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
                    color: 'pink',
                    min: min,
                    max: max,
                    inRange: {
                        color: '#ff0000'
                    }
                },
                series: [
                    {
                        name: 'Asset Rate',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: formatData,
                        roseType: 'radius',
                        label: {
                            normal: {
                                textStyle: {
                                    color: 'rgba(255, 255, 255,1)'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.6)'
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
        width: 100%;
        height: 400px;
        margin-top: 20px;
    }
    .h_item{
        display: inline-block;
        margin-right: 10px;
    }
</style>
