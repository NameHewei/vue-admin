<template>
    <div>
        <div class="tit">ali</div>
        <div class="charts" id="yue"></div>
        <div class="charts" id="changJiang"></div>
        <div class="tit">weChat</div>
        <div class="charts" id="change"></div>
    </div>
</template>

<script>
export default {
    mounted () {
        const setOption = ({ tit, xData, data }) => {
            return {
                title: {
                    text: tit
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
                    type: 'line'
                }]
            }
        }

        var yue = this.$echarts.init(document.getElementById('yue'), null, { renderer: 'svg' })
        yue.setOption(setOption({
            tit: 'yue',
            xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }))

        var changJiang = this.$echarts.init(document.getElementById('changJiang'), null, { renderer: 'svg' })
        changJiang.setOption(setOption({
            tit: '长江养老半年享',
            xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }))
    }
}
</script>

<style scoped>
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
