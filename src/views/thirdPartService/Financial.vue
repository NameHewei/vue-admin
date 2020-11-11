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
            <div id="totalValue"></div>
            <div id="pie"></div>
        </div>
    </div>
</template>

<script>
import { reqCompany, reqProducts, reqCompanyChange, reqUpdateProduct } from '@/api/thirdService/thirdService'
import { isNumber } from '@/utils/validate'

export default {
    data () {
        return {
            productsSelect: [],
            company: [],
            product: '',
            change: ''
        }
    },

    created () {
        this.getProducts()
        this.getCompanyData()
    },

    methods: {
        async getCompa () {
            const res = await reqCompanyChange()

            // console.log(res)
            this.initCompanyProduct(res.results)
        },

        getCompanyData () {
            reqCompany().then((res) => {
                // console.log(res)
                this.createPie(res.results)

                res.results.forEach(v => {

                })
            }).catch((error) => {
                console.error(error)
            })
        },

        getProducts () {
            reqProducts().then((res) => {
                // console.log(res)
                this.productsSelect = res.results.map(v => ({
                    label: v.name, value: v.id
                }))
            }).catch((error) => {
                console.error(error)
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
            const xData = []; const yData = []
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
            let totalValue = 0
            const formatData = data.map(value => {
                totalValue += value.total
                return {
                    name: value.name,
                    value: value.total
                }
            })

            document.getElementById('totalValue').innerHTML = totalValue

            this.$eCharts.init(document.getElementById('pie')).setOption({
                backgroundColor: '#ebf5ff',

                title: {
                    text: 'Asset Statistic',
                    padding: [20, 0, 50, 0],
                    left: 'center',
                    textStyle: {
                        color: '#214365'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                series: [
                    {
                        name: 'Asset',
                        type: 'pie',
                        radius: '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: formatData,
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

        handleSubmit () {
            const { product, change } = this
            if (!product) {
                this.$message.error('please select')
            }
            if (!isNumber(change)) {
                this.$message.error('please enter number')
            }

            // console.log(product, change)
            reqUpdateProduct({
                data: {
                    product,
                    change: parseFloat(change)
                }
            })
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
    #totalValue{
        padding-top: 20px;
        color: red;
        font-weight: 700;
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
