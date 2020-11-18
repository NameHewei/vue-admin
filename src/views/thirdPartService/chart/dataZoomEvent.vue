<template>
    <div>
        <div>
            <div id="mainT1" style="width: 300px; height: 300px"></div>
        </div>
        <div>
            <el-button type="primary" @click="enlarge">放大</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DataZoomEvent',

    data () {
        return {
            chart: null,
            debounce: false
        }
    },

    mounted () {
        const myChart = this.$eCharts.init(document.getElementById('mainT1'), null, { renderer: 'svg' })

        let start = false
        let down = false
        let move = false

        myChart.on('datazoom', (params) => {
            let s = 0
            if (params instanceof Array) {
                s = params.batch[0].start
            } else {
                s = params.start
            }
            if (s === 0) {
                start = true
            } else {
                start = false
            }
        })

        myChart.on('mouseup', (params) => {
            // console.log(start, down, move, 'up')
            if (start && down && move) {
                this.$message.success('加载')
            }
            down = false
            move = false
        })

        myChart.on('mousedown', (params) => {
            down = true
            // console.log('down')
        })

        myChart.on('mousemove', (params) => {
            move = true
            // console.log('move')
        })

        const options = {
            title: {
                text: '缩放和事件'
            },
            tooltip: {
                show: true
            },
            /** 用于区域缩放 */
            dataZoom: [
                {
                    type: 'inside',
                    /** 是否实时更新视图，否，则拖动完成后再更新 */
                    realtime: true,
                    /** 这里的 start 和下面的 end 配合；如果初始化固定end，当前对象不设置end，下一对象设置end */
                    start: 0,
                    xAxisIndex: 0
                },
                {
                    end: 100
                }
            ],
            xAxis: {
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
            },
            yAxis: {},
            series: [
                {
                    name: 'value',
                    type: 'bar',
                    data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
                }
            ]
        }

        myChart.setOption(options)

        this.chart = myChart
    },

    methods: {
        enlarge () {
            /* 参见 官方文档 API 中的action */
            this.chart.dispatchAction({
                type: 'dataZoom',
                start: 20,
                end: 30
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
