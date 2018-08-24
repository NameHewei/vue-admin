<template>
    <div>
        <div class="test-w">
            你好
            <img src="../../assets/little.png" alt="12">
        </div>
        <div
            v-for="(item, index) in data"
            :key="index"
        >
            {{ item.name }}
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      key: 1,
      data: []
    }
  },

  mounted () {
    fetch('http://localhost:1200', {

    }).then((res) => {
      return res.text()
    }).then((res) => {
    //   this.data = res.result
      console.log(res)
    })
  },

  methods: {}
}
</script>

<style scoped>
    .test-w{
        width: 200px;
        height: 200px;
        /* background: url(../../../public/img/kb.jpg) no-repeat center */
    }
</style>
