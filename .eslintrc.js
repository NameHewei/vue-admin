module.exports = {
  root: true,
  env: {
      node: true
  },
  'extends': [
      'plugin:vue/essential',
      '@vue/standard'
  ],
  parserOptions: {
      parser: 'babel-eslint'
  },
  rules: {
      // 允许使用console
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      "indent": [
          "error",
          4
      ]
  },
  // 允许一些全局的变量，如在html中引入的高德地图全局变量
  globals: {
      AMap: true,
      Vue: true,
      VueRouter: true,
      ELEMENT: true,
      AMapUI: true
  }
}
