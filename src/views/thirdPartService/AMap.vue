<template>
    <div>
        <div class="draw-area">
            <div class='info'>
                操作说明：用鼠标左键点击地图，选择区域，点击鼠标右键结束选择
            </div>
            <button
                class="remove-area"
                id="removeArea">清除</button>
            <button
                v-show="canEdit"
                class="edit-area"
                id="editArea"
            >编辑</button>
            <button
                class="get_address"
                id="getAddress"
            >经纬度转地址</button>
            <button
                class="set_mark"
                id="setMark"
            >自定义图标打点</button>
            <button
                class="save-area"
                id="saveArea"
            >保存</button>
            <div
                id="aMapContainer"
                class="a-map-container"></div>
        </div>
    </div>
</template>

<script>
import AMap from 'AMap'

export default {
    data () {
        return {
            map: null,
            type: 'CREATE',
            canEdit: false,
            path: [
                [116.403322, 39.920255],
                [116.410703, 39.897555],
                [116.402292, 39.892353]
            ]
        }
    },

    mounted () {
        const map = new AMap.Map('aMapContainer', {
            zoom: 12
        })

        this.map = map
        // this.getArea()
        document.getElementById('setMark').addEventListener('click', () => {
            this.setMark()
        })

        document.getElementById('getAddress').addEventListener('click', () => {
            this.getAddress()
        })

        this.getCurrentPosition()
    },

    methods: {
        /**
        * 其他坐标转高德坐标
        * api https://lbs.amap.com/api/javascript-api/guide/transform/convertfrom
         */
        convertFrom () {
            var gps = [116.3, 39.9]
            AMap.convertFrom(gps, 'gps', function (status, result) {
                if (result.info === 'ok') {
                    console.log(result.locations) // Array.<LngLat>
                }
            })
        },

        /**
         * @des 获取当前位置
         * @des api地址 https://lbs.amap.com/api/javascript-api/reference/location/?sug_index=2
         */
        getCurrentPosition () {
            const map = new AMap.Map('iCenter')
            map.plugin('AMap.Geolocation', function () {
                const geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true, // 是否使用高精度定位，默认:true
                    timeout: 10000, // 超过10秒后停止定位，默认：无穷大
                    maximumAge: 0, // 定位结果缓存0毫秒，默认：0
                    convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                    showButton: true, // 显示定位按钮，默认：true
                    buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
                    buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
                    showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
                    panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
                    zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                })
                map.addControl(geolocation)
                geolocation.getCurrentPosition()
                AMap.event.addListener(geolocation, 'complete', (data) => {
                    // 返回定位信息
                    alert('当前位置获取成功,请看控制台')
                    console.log('当前位置', data)
                })
                AMap.event.addListener(geolocation, 'error', () => {
                    // 返回定位出错信息
                    alert('获取当前信息失败')
                })
            })
        },

        /**
        * 根据经纬度获取地址
        * 注意先添加plugin AMap.Geocoder
        */
        getAddress () {
            const geoCoder = new AMap.Geocoder({})
            geoCoder.getAddress([104.065715, 30.65756], function (status, result) {
                if (status === 'complete' && result.regeocode) {
                    alert(`得到的地址是：${result.regeocode.formattedAddress}`)
                } else {
                    alert('获取地址发生错误')
                    console.log(result)
                }
            })
        },

        /**
         * 打点
         */
        setMark () {
            // 设置地图中心点
            this.map.setCenter([104.0689, 30.554876])

            /**
             * api https://lbs.amap.com/api/javascript-api/reference/overlay/#icon
             * */
            const icon = new AMap.Icon({
                    // 图标尺寸
                    size: new AMap.Size(40, 40),
                    // Icon的图像
                    image: '/img/car.png',
                    // 图像相对展示区域的偏移量，适于雪碧图等
                    imageOffset: new AMap.Pixel(0, 0),
                    // 根据所设置的大小拉伸或压缩图片
                    imageSize: new AMap.Size(40, 40)
                }),
                marker = new AMap.Marker({
                    icon: icon,
                    position: [104.0689, 30.554876],
                    // 偏移的位置，这只为图标size的一半较好
                    offset: new AMap.Pixel(-20, -20)
                })
            marker.setMap(this.map)
        },

        /**
         * 画区域
         */
        getArea () {
            if (this.path.length) {
                this.initialPolygon()
                this.type = 'EDIT'
                this.canEdit = true
            } else {
                this.canEdit = false
                this.setAMap()
            }
        },

        initialPolygon () {
            const map = new AMap.Map('aMapContainer', {
                    zoom: 12,
                    center: [113.246949, 23.122186]
                }),

                { path } = this,

                polygon = new AMap.Polygon({
                    path,
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
            map.setFitView([polygon])

            document.getElementById('removeArea').onclick = () => {
                map.remove(polygon)

                this.path = []
                this.canEdit = false

                this.setAMap()
            }

            // 编辑地图
            const polyEditor = new AMap.PolyEditor(map, polygon)

            document.getElementById('editArea').onclick = () => {
                polyEditor.open()
            }

            document.getElementById('saveArea').onclick = () => {
                polyEditor.close()
                console.log(2)
            }

            polyEditor.on('end', (e) => {
                this.path = e.target.getPath().map(v => ([v.lng, v.lat]))
                this.handleSavePath()
            })
        },

        setAMap () {
            const map = new AMap.Map('aMapContainer', {
                    center: [113.246949, 23.122186],
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

            document.getElementById('saveArea').onclick = () => {
                console.log(1)
                this.handleSavePath()
            }
        },

        handleSavePath () {
            const { path } = this

            if (path.length > 1) {
                this.getArea()
                this.$message.success('保存成功')
            } else {
                this.$message.error('设置范围')
            }
        }
    }
}
</script>

<style scoped type="text/scss" lang="scss">
    .draw-area{
        position: relative;
        width: 100%;
        border: 2px solid rgb(230, 230, 230);

        .a-map-container{
            width: 100%;
            height: 100%;
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
            left: 30px;
            top: 30px;
            width: 80px;
            height: 80px;
            border-radius:50%;
            background-color: rgb(13, 112, 224);
        }

        .save-area{
            right: 30px;
            bottom: 30px;
            width: 120px;
            height: 40px;
            border-radius: 4px;
            background-color: rgb(13, 112, 224);
        }
        .get_address{
            right: 370px;
            bottom: 30px;
            width: 160px;
            height: 40px;
            border-radius: 4px;
            background-color: rgb(13, 112, 224);
        }
        .set_mark{
            right: 180px;
            bottom: 30px;
            width: 160px;
            height: 40px;
            border-radius: 4px;
            background-color: rgb(13, 112, 224);
        }
        .edit-area{
            right: 170px;
            bottom: 30px;
            width: 120px;
            height: 40px;
            border-radius: 4px;
            background-color: rgb(13, 112, 224);
        }

        .remove-area, .save-area, .edit-area, .set_mark, .get_address{
            position: absolute;
            padding: 0;
            border: 0;
            box-shadow: 2px 2px 2px 0px rgb(104, 104, 104);
            font-size: 16px;
            z-index: 2;
            color: #fff;
            letter-spacing: 2px;
            text-indent: 4px;
            cursor: pointer;
            outline: none;
        }
    }
</style>
