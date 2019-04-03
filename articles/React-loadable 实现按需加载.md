# React-loadable 实现按需加载

## 前言
> 做 React 项目时遇到首屏加载很慢，出现白屏的现象，查阅很多资料，目前 React-router v4.0 有提供 code-spliting 代码分割的功能， 目前项目所用 为 webpack3 ，暂时不支持，后面发现 React-loadable 这个插件库提供这方面的支持

## 安装

在项目下安装 react-loadable
```
 npm install react-loadable -save
 yarn add react-loadable
```

## 准备一个 loading 组件
```
import React from 'react';

/* eslint-disable */
export default function ComponnetLoading(props) {
  if (props.error) {
    return <div>Error! <button onClick={props.retry}>Retry</button></div>;
  } else if (props.timedOut) {
    return <div>Taking a long time... <button onClick={props.retry}>Retry</button></div>;
  } else if (props.pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
}
```

## 引用 react-loadable

```
import Loadable from 'react-loadable';
import ComponentLoading from 'components/ComponentLoading';

export default function loadable(loader, loading = ComponentLoading, delay = 200, timeout = 3000) {
  return Loadable({
    loader,
    loading,
    delay,
    timeout,
  });
}

export function silentLoadable(loader, delay = 200, timeout = 3000) {
  const LoadableComponent = Loadable({
    loader,
    loading: () => null,
    delay,
    timeout,
  });
  return LoadableComponent;
}
```

## 路由上使用

```
import { silentLoadable } from '@/core/utils/loadable';

export default [
  {
    transitionAnimation: true,
    path: '/user/login',
    component: silentLoadable(() => import('@/modules/user/SignIn')),
  },
  {
    exact: true,
    path: '/home',
    component: silentLoadable(() => import('@/modules/home/HomeMain')),
  },
  ...
  // 预加载
  {
    path: '/',
    exact: true,
    component: silentLoadable(() => import('@/modules/network/NetworkMain')).preLoad(),
  },
  ...
]
```

## 总结
这样我们就可以按需加载组件，而不是一次性加载所有组件，达到类似代码分割 (code-spliting) 的效果