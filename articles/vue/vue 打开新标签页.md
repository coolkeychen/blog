<!--
 * @Description: 
 * @Author: Cat
 * @Date: 2021-12-13 17:51:47
 * @LastEditTime: 2021-12-13 17:57:09
 * @LastEditor: Cat
-->
# vue 打开新标签页

## 引言
> 一般单页面应用，vue 都是通过 vue-router 来实现页面跳转，（this.$router.push, this.$router.replace）。如果想要在新标签页打开页面，该如何处理呢

```
let routeData = this.$router.resolve({
    name: 'OnlineEditor',
    query: {
        chapterId: this.chapterId,
        type: this.editorType
    }
  })
window.open(routeData.href, '_blank');
```

此方式，可以把 sessionStorage 中的 token 一起带过去。   
但是也存在不足及缺点： 新旧标签页，组件之间的方法调用会失效