## 使用 react.lazy 和 suspense 延迟加载 React Components

## 引言
> 随着 React 16.8.1 面世，hooks 倍受瞩目，该版本也包含一些吸引人的特性，可以让我们在不依赖第三方库的情况下简化对延迟加载（lazy loading） 的处理。

## React.lazy() 是什么？
这项新功能使得可以不借助任何附加库就能通过代码分割（code splitting）延迟加载 react 组件。延迟加载是一种优先渲染必须或重要的用户界面项目，而将不重要的项目悄然载入的技术。

## Suspense
Suspense 是一个延迟函数所必须的组件，通常用来包裹延迟加载组件。

## 延迟和挂起为何重要？
首先，打包工具将所有代码组件相继归纳到一个 javascript 块中，并将其传递给浏览器；但随着应用增长，我们注意到打包的体积也与日俱增。这会导致应用因为加载慢而难以使用。借助代码分割，代码包能被分割成更小的块，最重要的块先被加载，而其余将要的则延迟加载。  
同时，我们知道构建应用的一个最佳践是：应该考虑到用户在使用移动互联网数据和其他慢速网络连接时的情况。作为开发者就应该在哪怕是在资源读取到 DOM 中的挂起阶段也能控制好用户体验。

## code
```
import React, { lazy, Suspense } from ‘react’;
import ReactDOM from ‘react-dom’;
import ‘./index.css’;
const Artists = lazy(() => import(‘./Artists’))
const Performers = lazy(() => import(‘./Performers’))
class App extends React.Component {
 render(){
  return(
   <div className=”App”>
    <Suspense fallback={<h1>Still Loading…</h1>}>
     <Artists />
     <Performers />
    </Suspense>
   </div>
  );
 }
}
ReactDOM.render(<App />, document.getElementById(‘root’));
```