import Vue from 'vue'

Vue.config.productionTip = true

if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function (err, vm, info) {
    console.error('errorHandler', err, vm, info)
  }
}
