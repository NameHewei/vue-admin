<template>
    <div>
        <div id="main" :style="{width: '300px', height: '300px'}"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        mounted(){
            var myChart = this.$echarts.init(document.getElementById('main'), null, {renderer: 'svg'});
            // 绘制图表
            myChart.setOption({
                title: {
                    text: 'Histogram'
                },
                tooltip: {
                    show:true
                },
                xAxis: {
                    data: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6']
                },
                yAxis: {},
                series: [{
                    name: 'value',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        },
        methods: {
            getA() {
                    this.$http({
                    method: 'GET',
                    url: 'cookie/',
                    successFn: (res) => {
                        console.log('res:', res);
                    },
                    errorFn: (err) => {

                    }
                })
            }
        }
    }
</script>

<style scoped type="text/scss" lang="scss">
    p{
        height:300px;
        margin:10px;
        background:#f5f5f5;
    }
</style>