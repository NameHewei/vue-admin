> 学习interview map 笔记
[https://yuchengkai.cn/docs/zh/frontend/](https://yuchengkai.cn/docs/zh/frontend/)

# js
## 类型
- 基本类型(Symbol)和引用类型(Object，array等)
```js
const symbol = Symbol('接受一个字符串参数，以作区分用') // 独一无二的
let s = Symbol('s')
s // Symbol(s)
```
- NaN属于number，两个 NaN === NaN 返回false
- 字面量只有在使用的时候才会变成对应的类型
```js
let a = 1    // 此时只是字面量
a.toString() // 此时变为引用类型
```
## typeof
- 返回的值都是小写
```js
let a = null
Object.prototype.toString.call(a) // "[object Null]"
typeof a // object
```

## 类型转换
- 条件判断时，除了undefined,null,NaN,'',0,-0,false其它值都转换为true

对象转基本类型
- 先调valueOf()然后调toString(),且都可以被重写
```js
let a = {
    [Symbol.toPrimitive](){
        return 9 //只能返回Number String，优先级更高
    },
    valueOf(){
        return 'you are'
    },
    toString(){
        return 'SB'
    }
}
console.log(a+a.toString()) 
// 没有重写valueOF 返回 SBSB
// 没有重写toString 返回 you are[object Object]
// 返回 you areSB
// 有了toPrimitive方法，即不返回valueOf的值
```

## 四则运算
- 赋值运算符是右结合性的
A = B = C = D  等价于 A = (B = (C = D))

- 加法中，其中一个是字符串，另一个也会转为字符串，其它运算，只要其中一方是数字，就会都转为数字

- 加法运算会触发三种类型转换：
  转换为原始值，转换为数字（ + 'b' 等于NaN），转换为字符串

变量,基本数据类型在栈,对象在堆.
[https://juejin.im/post/5a61ab6a51882573385fcebc](https://juejin.im/post/5a61ab6a51882573385fcebc)


# 事件
- 任意事件触发后三个阶段：捕获（window到目标），目标，冒泡。addeventListener(,,false默认(冒泡阶段执行)||true)

```html
<div id="outDiv">
  <button id="btn">按钮</button>
</div>
```
```js
document.getElementById('btn').addEventListener('click',() => {
  console.log('button 冒泡阶段')
}, false)

document.getElementById('outDiv').addEventListener('click',() => {
  console.log('外层 div 捕获阶段')
}, true)

// 点击按钮返回
// 外层 div 捕获阶段
// button 冒泡阶段
```

>attachEvent('onclick',function(){}) //兼容ie8   

addeventListener('click',function(){},false) //w3c

# event对象
1. event.stopPropagation传播():阻止事件传递(相同)，不管是冒泡还是捕获；IE8以及以下版本用event.cancelBubble冒泡 =true;
2. event.target   返回触发此事件的元素(可用于事件委托),IE下是event.srcElement;
3. 添加的事件函数中用return false来实现stopPropagation()和preventDefault()的功能。

- 同一节点同时注册冒泡和捕获事件，按注册代码先后顺序执行
- addEventListener(),第三个参数如果是对象
```
{
    capture: Boolean  // 和直接输Boolean一样
    once: Boolean // 回调只执行一次
    passive: Boolean // 永远不会调用preventDefault    
}
```

- stopPropagation 可以阻止冒泡和捕获
- stopImmediatePropagation() 可以阻止在同一元素上的后执行的事件，比如挂载了多个click当执行到有该方法的事件回调后，后面的事件即被阻止

# 事件委托优缺点
1. 减少事件注册，节省内存。
2. 子对象动态绑定。
3. 若把所有事件用代理方式容易出现误判。

# event loop

- js执行过程中会产生执行环境，这些环境会被顺序加入到执行栈中。
- 遇到异步代码，会被挂起并加入到Task(有多种)队列中
- 执行栈空了后，Event loop 便从Task队列中拿出需要执行的放入执行栈执行
- setTimeout后面的是异步函数，即便设置了0秒延迟，也是在同步之后执行，HTML5规定延迟不得小于4ms，不足自动增加，和浏览器也有关联
- 不同任务源会被分配到不同Task队列，任务源分为微任务（micro task：es6中叫jobs）和宏任务（macro task：es6中叫task）

    微任务：promise，process.nextTick，Object.observe，MutationObserver

    宏任务：script，setTimeout，setInterval，setImmediate，I/O，UI rendering

    浏览器会先执行一个宏任务，然后的异步代码会优先微任务

- 一次EventLoop顺序：
    - 执行同步代码（属于宏任务）
    - 执行栈为空，查询是否有微任务要执行
    - 执行微任务
    - 若有需要，渲染UI
    - 下一轮的EventLoop，执行宏任务的异步代码

# 存储
cookie（4K）：删除 同名加max-age=0

localStorage(5M)，sessionStorage（页面关闭就清理）:可保存的数据大小与浏览器有关

indexDB（无限）

# Service worker
[https://yuchengkai.cn/docs/zh/frontend/browser.html#service-worker](https://yuchengkai.cn/docs/zh/frontend/browser.html#service-worker)

# 渲染机制
1. 处理html并构建DOM树
2. 处理css构建CSSOM树
3. 将DOM与CSSOM合并成一颗渲染树
4. 根据渲染树来布局(layout)，计算每个节点的位置
5. 调用GPU绘制，合成图层，显示

构建CSSOM树
- 会阻塞渲染，直到构建完成。
- 十分消耗性能
- 所以应尽量保证层级扁平
- css选择器层级越多，执行越慢，最好用id，class

html解析到script标签，会暂停构建DOM，完成后继续。如果头引入了css，会等解析完样式才会执行js

# load与DOMContentLoaded
Load 事件触发代表页面中的 DOM，CSS，JS，图片已经全部加载完毕。

DOMContentLoaded 事件触发代表初始的 HTML 被完全加载和解析

# 图层
- 普通文档流看成一个图层
- 不同的图层渲染互不影响
- 某些频繁需要渲染的建议单独生成一个新图层，提高性能
- 不可生成过多图层，会有反效果

以下方法可产生新图层
- 3D变化，translate3d，translateZ
- will-change
- video，iframe标签
- 动画实现opacity动画转换
- position：fixed

# 重绘和回流
重绘：不会影响布局的样式改变

回流：布局或者几何属性需要改变，必定产生重绘

和EventLoop关系
- EventLoop执行完microtasks后，会判断是否需要document需要更新
- 判断有无resize和scroll事件需要触发
- 判断是否有media query
- 更新动画并发送事件
- 判断是否有全屏操作事件
- 执行requestAnimationFrame回调
- 执行IntersectionObserver回调，该方法用于判断元素是否可见，可以用于懒加载上，但是兼容性不好
- 更新界面
- 以上就是一帧中可能会做的事情。如果在一帧中有空闲时间，就会去执行 requestIdleCallback 回调

减少重绘和回流
- 使用translate代替top
- visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局）
- 批量更改后一次修改DOM
- 不要在循环里反复获取DOM节点属性（如node.style.offsetTop）
- 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局
- 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 requestAnimationFrame
- css查找避免深度过深（找到符合匹配规则的节点就加入结果集；直到根元素html都没有匹配，则不再遍历这条路径，从下一个最右边的规则开始）。css查询规则是从最右边开始。
- 将频繁运行的动画变为图层，图层能够阻止该节点回流影响别的元素。比如对于 video 标签

框架知识
angluar
- 脏数据检测
触发事件调用$digest(遍历所有数据观察者，判断值是否变化),有变化调用$watch,然后再调$digest,2<=循环<=10，可批量检测出更新值再统一更新UI。

vue
- 数据劫持
Object.definedProperty() 实现双向绑定
