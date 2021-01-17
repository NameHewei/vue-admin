<template>
    <div>
        <div id="get">I have a dream</div>
        欢迎页面
        <div>
            <p>
                使用icon 图标
                <a href="https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8cf4382a&helptype=code" style="color:blue">参考链接</a>
            </p>
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shoutao"></use>
                </svg>
            </div>
            <div id="container"></div>

        </div>
    </div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
var clock = new THREE.Clock()
// var AnimationAction = null
var mixer = null
export default {
    data () {
        return {
            scene: '',
            light: '',
            camera: '',
            controls: '',
            renderer: ''
        }
    },

    mounted () {
        this.init()
        this.loadGltf()
        this.render()
        window.that = this
    },

    methods: {
        init () {
            this.scene = new THREE.Scene()
            this.scene.add(new THREE.AmbientLight(0x999999)) // 环境光
            this.light = new THREE.DirectionalLight(0xdfebff, 0.45) // 从正上方（不是位置）照射过来的平行光，0.45的强度
            this.light.position.set(50, 200, 100)
            this.light.position.multiplyScalar(0.3)
            this.scene.add(this.light)
            // 初始化相机
            this.camera = new THREE.PerspectiveCamera(
                45,
                window.innerWidth / window.innerHeight,
                1,
                1000
            )
            this.camera.position.set(-90, -90, -90)
            // 初始化控制器
            this.controls = new OrbitControls(this.camera, this.renderer.domElement)
            this.controls.target.set(-70, 0, 0)// ------------------
            this.controls.minDistance = 80
            this.controls.maxDistance = 400
            this.controls.maxPolarAngle = Math.PI / 3
            this.controls.update()
            // 渲染
            this.renderer = new THREE.WebGLRenderer({
                alpha: true
            })
            this.renderer.setClearColor(0xffffff)
            this.renderer.setPixelRatio(window.devicePixelRatio) // 为了兼容高清屏幕
            // this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setSize(window.innerWidth - 600, window.innerHeight) // 改成这样就可以居中

            const container = document.getElementById('container')
            container.appendChild(this.renderer.domElement)
            window.addEventListener('resize', this.onWindowResize, false) // 添加窗口监听事件（resize-onresize即窗口或框架被重新调整大小）
        },
        // 窗口监听函数
        onWindowResize () {
            this.camera.aspect = window.innerWidth / window.innerHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(window.innerWidth, window.innerHeight)
        },
        render () {
            requestAnimationFrame(this.render)

            var delta = clock.getDelta()
            if (mixer != null) {
                mixer.update(delta)
            };
            this.renderer.render(this.scene, this.camera)
            mixer.update(clock.getDelta())
        },
        // 外部模型加载函数
        loadGltf () {
            const self = this
            // 加载模型
            var loader = new GLTFLoader()
            loader.load('../../../public/snm.gltf', function (gltf) { // 就是两个模型 这个是动态的,下面是静态的,这些从sketchfab上面下载即可
                // loader.load("/models/gltf/Duck.gltf", function(gltf) {
                var mesh = gltf.scene
                mesh.scale.set(20, 20, 20)
                mesh.position.set(-70, 0, 0)

                self.scene.add(mesh) // 将模型引入three
                // console.log(gltf, 'gltf')
                mixer = new THREE.AnimationMixer(mesh)
                mixer.clipAction(gltf.animations[0]).play()

                this.render()
            })
            this.scene.add(loader)
        }

    }
}
</script>

<style scoped>
.icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
#container {
  width: 800px;
  margin: 0 auto;
  height: 600px;
  overflow: hidden;
}
</style>
