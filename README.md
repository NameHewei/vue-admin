# vue-admin 

## Project setup
- npm run serve
- npm run build

## Overview
事件机制
- 同一节点同时注册冒泡和捕获事件，按注册代码先后顺序执行
- addEventListener(),第三个参数如果是对象
```
{
    capture: Boolean  // 和直接输Booolean一样
    once: Boolean // 回调只执行一次
    passive: Boolean // 永远不会调用preventDefault    
}
```

- stopPropagation 可以阻止冒泡和捕获

框架知识
angluar
- 脏数据检测
触发事件调用$digest(遍历所有数据观察者，判断值是否变化),有变化调用$watch,然后再调$digest,2<=循环<=10，可批量检测出更新值再统一更新UI。

vue
- 数据劫持
Object.definedProperty() 实现双向绑定



