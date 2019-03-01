
## react 性能优化

## 内存优化

### webview内存
webview内存，包括缓存的静态资源，渲染的dom树，css样式，js的计算等。 <br>
如何优化？
####  webview缓存资源内存优化
* 尽可能压缩代码，比如: webpack 提取公共代码，样式等，减少如echart等比较大的包使用。
* 使用路由按需加载的方式来请求js资源
```js
<Switch>
       <Route path="/profile" render={() => <ModuleHome {...props} /> } />
       ...
</Switch>
```
* 删除非必要的引用
#### 运行时内存优化
* 减少闭包的使用
```js
<div onClick={() => this.handleClick(this.state.id)}>
    
</div>
```
* 尽可能小的划分组件的颗粒度，提高组件的复用
* 组件接受props数据，只接受所使用到的数据，保证数据纯净度，减少非必要的props造成的render
* 子组件传递给父组件数据，使用`HOC`模式，不要使用`state`的钩子函数，可以减少render的渲染.<br>
[HOC](https://react.docschina.org/docs/higher-order-components.html)
* 非必要渲染的数据，不要放在`state`上，更不要去`setState`，减少非必要的`render`
* 尽量不要在`componentWillReceiveProps`处理逻辑或者去做`setState`操作，减少非必要的`render` <br>
大多数的在`componentWillReceiveProps`内处理的业务逻辑都可以通过`redux`或者异步的`redux`处理，有些逻辑可以在`render`内处理

* 列表渲染，必要的`key`,并且这个`key`对应的item是唯一的（使用id），不要使用`Math.random`的随机数,也可以使用`index`,但是在分页的列表内会出现问题 <br />
[React Diff](https://www.infoq.cn/article/react-dom-diff)

* 使用 `React.PureComponent` 来处理无状态组件 
```js
class Demo extends React.PureComponent {
    render() {
        return <div>this.props.title</div>
    }
}
```
* shouldComponentUpdate 来处理`render`的渲染 <br>

* 使用 `immutable.js`，immutable优化了数据存储方式，会尽量避免创建新的对象，进而可以达到减少内存的使用 <br />
[immutable.js](https://www.jianshu.com/p/c2d01a4f8a98)