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

    <p>
      在设置 echarts 宽度时，如果该元素默认是先隐藏的状态，那 echarts 将无法正确设置图表宽度
    </p>

    <div class="part">
        <h3>echarts canvas vs svg</h3>
        <p>
            Canvas(默认) 更适合绘制图形元素数量非常大（这一般是由数据量大导致）的图表（如热力图、地理坐标系或平行坐标系上的大规模线图或散点图等）;
            SVG 具有重要的优势：它的内存占用更低（这对移动端尤其重要）、渲染性能略高、并且用户使用浏览器内置的缩放功能时不会模糊
        </p>
        <p>1. 移动平台优选 SVG   </p>
        <p>2. 图表个数很多时优选 SVG</p>
        <p>3. 导出小文件高清晰时使用 SVG</p>
        <p>4. 数据量特别大时推荐使用 Canvas 渲染</p>
    </div>

    <div class="part">
      <h3>折线图</h3>
      <CustomLine/>
      <p> - 容器元素设置宽高</p>
      <p> - y轴上的值根据series的data属性自动生成 </p>
      <p> - y轴上的值，可自定义 </p>
      <p> - 当有两个 y 轴时，series 中设置一组数据的 yAxisIndex: 1 表示这组数据的y轴数据使用的是第二个y轴 </p>
    </div>

    <div class="part">
      <h3>柱状图</h3>
      <CustomBar/>
    </div>

    <div class="part">
      <h3>饼图</h3>
      <CustomPie/>
    </div>

    <div class="part">
      <h3>方法缩小示例</h3>
      <DataZoomEvent></DataZoomEvent>
    </div>
  </div>
</template>

<script>
import CustomLine from './line'
import CustomBar from './bar'
import CustomPie from './pie'
import DataZoomEvent from './dataZoomEvent'
export default {
    components: {
        DataZoomEvent,
        CustomLine,
        CustomBar,
        CustomPie
    },
    data () {
        return {}
    },
    mounted () {},
    methods: {
        handleRouteSkip () {
            this.$router.push({
                name: 'financial'
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
