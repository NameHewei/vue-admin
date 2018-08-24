<template>
    <div class="img-upload-main">
        <input type="text" v-model="b">
        <div>{{a}}</div>
        <div>{{b}}</div>
        <input ref="fileInput" type="file" accept="image/*" @change='imgChange' v-show="false">
        <el-button type="primary" @click="upImg">上传图片</el-button>
        <div class="img-preview">
            <h3>预览图片</h3>
            <img :src="item.url" alt="no" v-for="(item, i) in images" :key="i">
        </div>

        <div>
            <h3>服务器图片</h3>
            <img v-for="(item, i) in serverImg" :src="item" :key="i" alt="no">
        </div>
    </div>
</template>

<script>
import { file } from '@/api/index.js'
const { UPLOAD_IMG } = file
export default {
  data () {
    return {
      a: 12,
      b: 9,
      images: [],
      serverImg: []
    }
  },

  mounted () {
    ajaxFn()

    function ajaxFn () {
      var xhr = new XMLHttpRequest()
      xhr.open('get', 'http://localhost:2018/wx' + '?' + location.href, true)
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
          wxConfig(JSON.parse(xhr.responseText))
        }
      }
      xhr.send()
    }

    function wxConfig (res) {
      var secondShare = location.href.split('?form')[1]
      if (secondShare) {
        location.href = location.href.split('?form')[0]
        return
      }

      var datas = res.data
      wx.config({
        debug: false,
        appId: 'wx39376379b817cc33',
        timestamp: datas.timestamp,
        nonceStr: datas.nonceStr,
        signature: datas.signature,
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ'
        ]
      })
      // 标题
      var titleMain = '全民票选，为你心目中最佳照片投票吧！'
      var desc = '厉害了word哥，没想到他们摄影技术那么好'
      var imgUrl = 'http://c.klicen.com/web_items/motorShowH5Activity4Compile/h5_static4/imgs/share_logo.jpg'// 80*80
      var link = 'http://c.klicen.com/web_items/motorShowH5Activity4Compile/motor_photo_index.html'
      wx.ready(function () {
        // 分享到朋友圈
        wx.onMenuShareTimeline({
          title: titleMain,
          link: link,
          imgUrl: imgUrl,
          trigger: function (res) {
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            // alert('用户点击发送给朋友');
          },
          success: function () {

          },
          cancel: function () {
          }
        })
        // 分享到朋友
        wx.onMenuShareAppMessage({
          title: titleMain,
          desc: desc,
          link: link,
          imgUrl: imgUrl,
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          trigger: function (res) {
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            // alert('用户点击发送给朋友');
          },
          success: function () {
            console.log(2)
          },
          cancel: function () {
          }
        })
        // 分享到qq
        wx.onMenuShareQQ({
          title: titleMain,
          desc: desc,
          link: link,
          imgUrl: imgUrl,
          trigger: function (res) {
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            // alert('用户点击发送给朋友');
          },
          success: function () {

          },
          cancel: function () {
          }
        })
      })
    }
  },

  methods: {
    imgChange (e) {
      const fileObj = e.target.files[0]
      console.log(fileObj.size / 1024)
      const dataBlob = window.URL.createObjectURL(fileObj)

      this.images.push({
        url: dataBlob
      })

      const upload = () => {
        this.$http({
          method: UPLOAD_IMG.METHOD,
          url: UPLOAD_IMG.URL,
          data: {
            name: fileObj.name,
            data: e.target.result
          },
          successFn: (res) => {
            console.log(res)
          }
        })
      }

      const formData = new FormData()
      formData.append('name', fileObj.name)
      formData.append('data', fileObj)
      this.$http({
        method: UPLOAD_IMG.METHOD,
        url: UPLOAD_IMG.URL,
        data: formData,
        successFn: (res) => {
          this.serverImg.push(res)

          console.log(res)
        }
      })

      const fileReader = new FileReader()
      fileReader.readAsDataURL(fileObj)
      fileReader.onload = (e) => {
        // console.log(e.target.result)

      }
    },

    upImg () {
      const obj = this.$refs.fileInput
      obj.value = ''
      obj.click()
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
    .img-upload-main{
        img{
            width: 200px;
            margin: 0 10px 10px 0
        }
    }
    .img-preview{
        padding-top: 20px;
    }
</style>
