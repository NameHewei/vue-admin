<template>
    <div>
        <div class="draw-area">
            <div class='info'>
                操作说明：用鼠标左键点击地图，选择区域，点击鼠标右键结束选择
            </div>
            <button class="remove-area" id="removeArea">清除</button>
            <div id="container" class="a-map-container"></div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            areaCount: 0
        }
    },

    mounted () {
        this.setAMap()
    },

    methods: {
        setAMap () {
            const map = new AMap.Map('container', {
                    center: [113.246949, 23.122186],
                    zoom: 12
                }),

                mouseTool = new AMap.MouseTool(map)

                // 监听draw事件可获取画好的覆盖物
            var overlays = []

            function draw () {
                mouseTool.polygon({
                    fillColor: '#54cdfd',
                    strokeColor: '#10c4f9'
                })
            }

            mouseTool.on('draw', (e) => {
                overlays.push(e.obj)
                mouseTool.close()

                console.log('数据：', overlays[0].getPath())
            })

            draw()

            document.getElementById('removeArea').onclick = () => {
                map.remove(overlays)
                overlays = []
                draw()
                this.areaCount = 0
            }
        }
    }
}
</script>

<style scoped type="text/scss" lang="scss">
    .draw-area{
        position: relative;
        width: 100%;
        height: 100%;
        border: 2px solid rgb(230, 230, 230);

        .a-map-container{
            width: 100%;
            height: 800PX;
            color: rgb(248, 50, 50)

        }

        .info{
            position: absolute;
            padding: 6px 15px;
            right: 0;
            top: 0;
            font-size: 14px;
            z-index: 2;
            color: #fff;
            background-color: rgba(2, 166, 231, 0.6);
        }

        .remove-area{
            position: absolute;
            padding: 5px 8px;
            right: 30px;
            bottom: 30px;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 1px solid #fff;
            font-size: 18px;
            z-index: 2;
            color: #fff;
            letter-spacing: 2px;
            text-indent: 4px;
            background-color: rgb(84, 205, 253);
            cursor: pointer;
            outline: none;
        }
    }
</style>
