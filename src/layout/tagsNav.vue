<template>
    <div class="tags-nav" @wheel="handleWheel">
        <div class="tag-nav-inner">
            <div v-for="item in tags" :key="item.name" @contextmenu.prevent="handleTagMenu($event, item.name)"  @click="routerSkip(item.name)" :class="item.name === currentTag ? 'select-tag' : ''">
                {{ item.title }}
                <i class="el-icon-circle-close" @click.stop="handleClose(item.name)"></i>
            </div>
        </div>
        <ul v-show="menuVisible" class="tag_menu" :style="`left:${menuLeft}px;top: ${menuTop}px`">
            <li @click="handleCloseCurrent">关闭当前</li>
            <li @click="handleCloseOther">关闭其它</li>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'TagsNav',
    data () {
        return {
            currentTag: '',
            baseWidth: 0,
            innerEle: '',
            left: 0,
            tags: [],
            menuLeft: 0,
            menuTop: 0,
            menuVisible: false,
            menuCurrent: ''
        }
    },

    mounted () {
        this.baseWidth = document.querySelector('.tags-nav').clientWidth - 100
        this.innerEle = document.querySelector('.tag-nav-inner')
    },

    watch: {
        $route: {
            immediate: true,
            handler (route) {
                this.addTag(route)
            }
        },

        menuVisible (v) {
            if (v) {
                /* 点击任何地方 关闭menu */
                document.body.addEventListener('click', () => {
                    this.menuVisible = false
                })
            } else {
                document.body.removeEventListener('click', () => {})
            }
        }
    },

    methods: {
        routerSkip (name) {
            this.$router.push({ name })
        },

        addTag (route) {
            const { tags } = this
            if (!tags.some(val => val.name === route.name)) {
                /* 只显示菜单中有的路由 */
                if (route.meta.menu) {
                    this.tags.push({ title: route.meta.title, name: route.name })
                }
            }
            this.currentTag = route.name
        },

        handleClose (name, type) {
            const { tags, currentTag } = this

            /* 默认删除传入的name 指向的tag */
            type = type || 'current'

            let reTags = []

            if (type === 'current') {
                /* 过滤删除当前选择项 */
                reTags = tags.filter(v => name !== v.name)
                if (name === currentTag && reTags.length) {
                    /* 删除当前选中的tag 自动打开当前tag的前一个tag */
                    this.$router.push({ name: reTags[reTags.length - 1].name })
                }
            } else if (type === 'other') {
                /* 删除其它标签 */
                reTags = tags.filter(v => name === v.name)
                this.$router.push({ name: reTags[0].name })
            }

            this.tags = reTags

            if (!reTags.length) {
                this.$router.push({ path: '/' })
            }
        },

        /* tag过多后，利用鼠标滚轮 左右滑动tag */
        handleWheel (e) {
            const { left, innerEle, baseWidth } = this
            const currentLeft = left + e.deltaY
            const actualValue = innerEle.scrollWidth
            if (currentLeft < 1 && currentLeft > (baseWidth - actualValue)) {
                document.querySelector('.tag-nav-inner').setAttribute('style', `margin-left:${currentLeft}px`)
                this.left = currentLeft
            }
        },

        handleTagMenu (e, name) {
            this.menuLeft = e.clientX + 15
            this.menuTop = e.clientY + 10
            this.menuVisible = true
            this.menuCurrent = name
        },

        handleCloseCurrent () {
            const { menuCurrent } = this
            this.handleClose(menuCurrent)
        },

        handleCloseOther () {
            const { menuCurrent } = this
            this.handleClose(menuCurrent, 'other')
        }
    }
}
</script>

<style lang="scss" scope>
</style>
