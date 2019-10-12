<template>
  <div>
    <div class="part">
      <h3>安装与引用</h3>
    </div>
    <div>
      <pre> npm install echarts --save </pre>
      <pre> Vue.prototype.$echarts = echarts </pre>
      <pre> import echarts from 'echarts'</pre>
      <div>
        <b>
          参考链接：
          <a
            href="http://echarts.baidu.com/tutorial.html#%E5%9C%A8%20webpack%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts"
            target="_blank"
          >echarts 官网</a>
        </b>
      </div>
    </div>
    <div>
      <el-button @click="handleRouteSkip">Financial</el-button>
    </div>

    <div class="part">
      <h3>echarts canvas vs svg</h3>
      <p>
        Canvas 更适合绘制图形元素数量非常大（这一般是由数据量大导致）的图表（如热力图、地理坐标系或平行坐标系上的大规模线图或散点图等）;
        SVG 具有重要的优势：它的内存占用更低（这对移动端尤其重要）、渲染性能略高、并且用户使用浏览器内置的缩放功能时不会模糊
      </p>
    </div>

    <div class="part">
      <h3>折线图</h3>
      <div id="line" style="width: 300px; height: 300px"></div>
      <p> - y轴上的值根据series的data属性自动生成 </p>
      <p> - y轴上的值，可自定义 </p>
      <p> - legend 中 data 的值要与 series 中的name值对应一致 </p>
      <p> - 当有两个 y 轴时，series 中设置一组数据的 yAxisIndex: 1 表示这组数据的y轴数据使用的是第二个y轴 </p>
    </div>

    <div class="part">
      <h3>柱状图</h3>
      <div id="main" style="width: 300px; height: 300px"></div>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {}
    },
    mounted () {
        var myChart = this.$eCharts.init(document.getElementById('main'), null, {
            renderer: 'svg'
        })
        // 绘制图表
        myChart.setOption({
            title: {
                text: 'Histogram'
            },
            tooltip: {
                show: true
            },
            xAxis: {
                data: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6']
            },
            yAxis: {},
            series: [
                {
                    name: 'value',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }
            ]
        })

        this.initLine()
    },
    methods: {
        getA () {
            this.$http({
                method: 'GET',
                url: 'cookie/',
                successFn: res => {
                    console.log('res:', res)
                },
                errorFn: err => {
                    console.log(err)
                }
            })
        },

        handleRouteSkip () {
            this.$router.push({
                name: 'financial'
            })
        },

        initLine () {
            const myChart = this.$eCharts.init(document.getElementById('line'), null, {
                renderer: 'canvas'
            })
            // 绘制图表
            myChart.setOption({
                title: {
                    text: 'line'
                },
                legend: {
                    data: ['y11', 'y22']
                },
                grid: {
                    left: 10,
                    right: 10,
                    top: 50,
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
                        type: 'line'
                    },
                    {
                        name: 'y22',
                        yAxisIndex: 1,
                        data: [11, 21, 31, 41, 51, 61, 71],
                        type: 'line'
                    }
                ]
            })
        }
    }
}
</script>

<style scoped type="text/scss" lang="scss">
.part {
  border-top: 2px solid #eee;
  h3 {
    padding: 6px;
    border-left: solid 2px rgb(214, 214, 214);
    font-size: 16px;
    font-weight: 500;
    color: rgb(110, 110, 110);
    background-color: rgb(238, 238, 238);
  }
}
</style>
