# vue-admin 项目说明

vue 实践管理后台

## 启动
- npm i
- npm start

---

- 使用了 element-ui

- 更多配置说明：`vue.config.js`

## 采用 cdn 引入vue vue-router element-ui 等

1. 在官网的安装步骤中找到 cdn 的引入地址

2. 在html模板中引入相应的脚本和样式

3. 注意引入的全局变量名
```
vue 对应 Vue
vue-router 对应 VueRouter
element-ui 对应 ELEMENT
```

4. 防止 eslint 报变量未定义 ，需要在eslint配置文件中配置全局变量，或使用 externals 参见 `vue.config.js`

最终打包后的文件 js和css文件都有减小

注意：有时候免费的 cdn 会不稳定

---

目录结构

```
|- src
    |- view
        |- vueApiPractice
            |- mixin         对 Mixin 的使用
```


