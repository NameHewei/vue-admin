[toc]

# Generator(生成器) 学习理解与实践
> created at 2019-04-03

## 总结
- 异步编程解决方案
- 可理解为一种状态机，封装了多个内部状态
- 可返回一个指向内部状态的指针对象（遍历器对象Interator），所以可理解为其是一个遍历器对象生成函数
- yield(产出),定义不同的内部状态，yield后跟表达式。  
- yield 表达式只能放在Generator函数中
- (yield 表达式) 整个没有返回值，next()的参数可以被认为是上一个yield的返回值。  
- V8引擎直接忽略第一次next()的参数，因为没有上一次yield  
- 调用next方法，是指针从函数头部或上一次停止的地方开始执行，直到遇到下一个yield表达式或return
- 当next的返回值的value属性为yield后表达式的结果或return后的值，done属性为true时表示遍历yield结束
- 对象中使用const obj = { * myGeneratorMethod(){} } 等同于 obj = { myGeneratorMethod：function* (){} }
- yield* 用于在一个generator函数中执行另一个generator函数，并且会将另一个的yield全部执行完毕才会继续执行当前generator中的yield


## 基础语法
```js
 function* generatorTest() {
    console.log('第一个yield之前的语句');
    yield 'yield 1'
    yield 'yield 3: 在表达式中要加括号' + (yield 'yield 2: in expression')
    console.log('yield 之后 return之前');
    return 'return'
}

const gt = generatorTest()
console.log(gt);
// 遍历器对象

/*
* 第一次调用是从函数头部开始执行，如果没有yield，也需要执行一次next才会执行这些语句
*/
console.log(gt.next());
// 第一个yield之前的语句
// {value: "yield 1", done: false}

console.log(gt.next());
// {value: "yield 2: in expression", done: false}

console.log(gt.next());
// {value: "yield 3: 在表达式中要加括号undefined", done: false}
// 上面出现undefined的原因是next没有加参数

console.log(gt.next());
// yield 之后 return之前
// {value: "return", done: true}

console.log(gt.next());
// {value: "undefined", done: true}

```

## 实现斐波拉契数列

[链接](https://github.com/NameHewei/blog-note/blob/master/algorithm/algorithm.md)


## 给原生对象添加Iterator

先展示for of 对generator的作用
```js
function* generatorForOf(){
    yield 1;
    yield 2;
    return 3;
}
/*
* for of 可以遍历Generator生成的Iterator对象
* 这里不能再遍历 gt 因为它已执行完毕
* 不会遍历return的值
*/
for (let item of generatorForOf()) {
    console.log('for of :', item);
}
```

给原生对象添加iterator, 让其可以被for of 遍历

```js
function* objectAddIterator(obj) {
    const props = Reflect.ownKeys(obj)

    for (const key of props) {
        yield [key, obj[key]]
    }
}

const nativeObj = {
    a: 12,
    b: 34,
    [Symbol('symbol c')]: 3
}

for (const [key, value] of objectAddIterator(nativeObj)) {
    console.log(typeof key === 'symbol' ? key.description : key, value);
}
```

## 应用场景

### 异步ajax请求

代码中的loading函数代码行数较多，也并非关键代码，所以不作展示。[查看loading链接](https://github.com/NameHewei/blog-note/blob/master/blog-files/toastAndLoading.md)
```html
<div id="ajax">初始数据</div>
<button onclick="getSomeList()">请求ajax数据</button>
```

```js
function requestData(callback) {
    function ajaxFn() {
        setTimeout(() => {
            ar.next('ajax返回结果')
        }, 2000);
    }

    function* asyncReqData() {
        loading(true)
        const result = yield ajaxFn()
        callback(result)
        loading(false)
    }

    const ar = asyncReqData()
    ar.next()
}

function getSomeList() {
    requestData((res) => {
        document.getElementById('ajax').innerHTML = res
    })
}
```

### 控制同步操作的流程

```js
function controlFlow() {
    const child1 = [() => {console.log('--',1); return 'return 1'}, () => {console.log('--',2); return 'return 2'}]
    const child2 = [() => {console.log('--',3); return 'return 3'}, () => {console.log('--',4); return 'return 4'}]
    function* generatorControl(child) {
        console.log('===========');
        for (let i = 0; i < child.length; i++) {
            yield child[i]()
        }
    }
    let parent = [{c: child1}, {c: child2}];

    function* parentFn(p){
        for (let i=0; i< p.length; i++){
            yield* generatorControl(p[i].c);
        }
    }

    for (let step of parentFn(parent)) {
        console.log(step);
    }
}

controlFlow()
```


本文包括对generate基础的学习与练习，与一些心得！【会持续学习，更新】

详细学习请移步下方参考链接

参考:
- [参考文章](http://es6.ruanyifeng.com/#docs/generator)


> 欢迎交流 [Github](https://github.com/NameHewei/blog-note)

