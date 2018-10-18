<template>
    <div>
        <div class="draw-area">
            <div class='info'>
                操作说明：用鼠标左键点击地图，选择区域，点击鼠标右键结束选择
            </div>
            <button class="start-edit" id="startEdit">编辑</button>
            <button class="end-edit" id="endEdit">结束</button>

            <button class="remove-area" id="removeArea">清除</button>
            <button class="save-area" @click="handleSavePath">保存</button>
            <div id="aMapContainer" class="a-map-container"></div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            path: []
        }
    },

    mounted () {
        this.initialPolygon()
    },

    methods: {
        handleSavePath () {
            const { path } = this
            if (path.length > 1) {
                this.$message.success('保存成功')
                console.log(path)
            } else {
                this.$message.error('请先清除范围，重新设置范围后保存')
            }
        },

        initialPolygon () {
            const map = new AMap.Map('aMapContainer', {
                    center: [104.068074, 30.552835],
                    zoom: 12
                }),

                path = [
                    [104.067602, 30.556743],
                    [104.066593, 30.55374],
                    [104.071078, 30.556281]
                ],

                polygon = new AMap.Polygon({
                    path: path,
                    isOutline: true,
                    borderWeight: 3,
                    strokeColor: '#10c4f9',
                    strokeWeight: 6,
                    strokeOpacity: 0.2,
                    fillOpacity: 0.4,
                    // 线样式还支持 'dashed'
                    fillColor: '#54cdfd',
                    zIndex: 50
                })

            polygon.setMap(map)
            // 缩放地图到合适的视野级别
            map.setFitView([ polygon ])

            const polyEditor = new AMap.PolyEditor(map, polygon)

            polyEditor.on('end', function (event) {
                console.log(event.target.getPath())
                // event.target 即为编辑后的多边形对象
            })

            document.getElementById('startEdit').onclick = () => {
                polyEditor.open()
            }

            document.getElementById('endEdit').onclick = () => {
                polyEditor.close()
            }

            document.getElementById('removeArea').onclick = () => {
                map.remove(polygon)

                this.setAMap()
            }
        },

        setAMap () {
            const map = new AMap.Map('aMapContainer', {
                    center: [104.068074, 30.552835],
                    zoom: 12
                }),

                mouseTool = new AMap.MouseTool(map)

            // 监听draw事件可获取画好的覆盖物
            let overlays = []

            function draw () {
                mouseTool.polygon({
                    fillColor: '#54cdfd',
                    strokeColor: '#10c4f9'
                })
            }

            mouseTool.on('draw', (e) => {
                overlays.push(e.obj)

                // 禁止用户画第二个覆盖物
                mouseTool.close()

                this.path = overlays[0].getPath().map(v => ([v.lng, v.lat]))
            })

            draw()

            document.getElementById('removeArea').onclick = () => {
                map.remove(overlays)
                overlays = []
                draw()
                this.path = []
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
            background-color: rgba(2, 166, 231, 0.8);
        }

        .remove-area {
            right: 110px;
            bottom: 30px;
        }

        .save-area {
            right: 30px;
            bottom: 30px;
        }

        .start-edit{
            right: 320px;
            bottom: 30px;
        }

        .end-edit{
            right: 240px;
            bottom: 30px;
        }

        .remove-area, .save-area, .start-edit, .end-edit{
            position: absolute;
            padding: 5px 8px;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 0;
            box-shadow: 2px 4px 2px 0px rgb(104, 104, 104);
            font-size: 16px;
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
