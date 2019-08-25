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
  "rules": {
    // 允许使用console
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "indent": [
      "error",
      4
    ],
    "one-var": [
      "error",
      {
        // 对已经初始化的变量，要求其连续的变量声明合并为一个声明
        "initialized": "consecutive"
      }
    ]
  },
}
