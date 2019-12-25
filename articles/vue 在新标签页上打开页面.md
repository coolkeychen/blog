## Vue 在新标签页上打开页面
> 最近在做一个 Vue 项目，需求是在打开帮助文档时，在新的标签页上重开一个新的页面，避免用户重复回退。项目使用的 Vue 版本为 3.0

1. 使用 <router-link>组件实现
```
<router-link target="_blank" :to="{path:'/home',query:{id:'1'}}">新页面打开home页</router-link>
```

2. 编程式导航

有些时候需要在单击事件或者在函数中实现页面跳转，那么可以借助router的示例方法，通过编写代码来实现。我们常用的是 $router.push 和 $router.go 但是vue2.0以后，这种方式就不支持新窗口打开的属性了，
这个时候就需要使用this.$router.resolve,如下：
```
seeShare(){
     let routeUrl = this.$router.resolve({
          path: "/share",
          query: {id:96}
     });
     window.open(routeUrl .href, '_blank');
}
```