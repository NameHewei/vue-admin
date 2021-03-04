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
export default {
    data () {
        return {
        }
    },

    mounted () {
    },

    methods: {

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
