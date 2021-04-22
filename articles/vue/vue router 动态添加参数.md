<!--
 * @Description: vue router 动态添加参数
 * @Author: Cat
 * @Date: 2021-02-03 15:49:02
 * @LastEditTime: 2021-02-03 16:02:19
 * @LastEditor: Cat
-->
# vue-router 动态添加参数

## 引言
> 最近在做几个后面管理系统，后台管理系统最主要增删改查，列表是最基本的功能，数据量一多，可能就需要分页功能，还有 tab 标签切换。有时需要刷新页面，列表就很难定位到原先所选择的标签和分页

## 代码实现
利用 ES6 的新语法：解构赋值，可以快速解决此类问题

```
this.$router.push({query: {...this.$route.query, type: id, page: this.pager.currentPage }})
```

ES6 的解构赋值功能还是很强大的存在！可以将属性/值 从对象/数组中取出，赋值给其它变量，而无须一个个取变量，然后再组装成一个新的变量