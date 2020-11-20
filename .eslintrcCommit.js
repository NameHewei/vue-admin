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
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-debugger': 'error' ,
        'max-lines': ['error', {"max": 500, "skipBlankLines": true, "skipComments": true }],
        'no-alert': 2,
        "indent": [
            "error",
            4
        ],
        "comma-dangle": ["error", "only-multiline"],
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
