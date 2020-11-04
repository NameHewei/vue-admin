<template>
    <div class="tags-nav" @wheel="handleWheel">
        <div class="tag-nav-inner">
            <div v-for="item in tags" :key="item.name" @click="routerSkip(item.name)" :class="item.name === currentTag ? 'select-tag' : ''">
                {{ item.title }}
                <i class="el-icon-circle-close" @click.stop="handleClose(item.name)"></i>
            </div>
        </div>
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
            tags: []
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
                if (route.meta.showInMenu) {
                    this.tags.push({ title: route.meta.title, name: route.name })
                }
            }
            this.currentTag = route.name
        },

        handleClose (name) {
            const { tags, currentTag } = this
            const reTags = tags.filter(v => name !== v.name)
            this.tags = reTags

            if (reTags.length) {
                if (name === currentTag) {
                    this.$router.push({ name: reTags[reTags.length - 1].name })
                }
            } else {
                this.$router.push({ path: '/' })
            }
        },

        handleWheel (e) {
            const { left, innerEle, baseWidth } = this
            const currentLeft = left + e.deltaY
            const actualValue = innerEle.scrollWidth
            if (currentLeft < 1 && currentLeft > (baseWidth - actualValue)) {
                document.querySelector('.tag-nav-inner').setAttribute('style', `margin-left:${currentLeft}px`)
                this.left = currentLeft
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$sideW: 210px;
.tags-nav{
    margin: 0 15px 0 $sideW;
    height: 45px;
    overflow: hidden;
    user-select: none;
    background-color: rgb(243, 243, 243);
    .tag-nav-inner{
        white-space: nowrap;
        transition: margin 800ms;
        &>div{
            display: inline-block;
            padding: 5px 15px;
            margin: 3px 5px;
            border: 1px solid rgb(40, 95, 248);
        }
        .select-tag{
            color: red;
        }
    }
}
</style>
