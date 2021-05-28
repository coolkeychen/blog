# vue 深度作用选择器

## 引言
> 最近使用 vue 做开发，前端需要解析后台传来的带有标签的字段，（该字段是通过富文本编辑器由运营人员在后台管理系统编辑并保存），使用 <pre> 标签可以正常解析，但是样式却无法正常渲染，通过问题排查，使用 vue 深度作用选择器可以解决该问题。

## 原理
当 vue 组件 style 标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素，父组件的样式将不会渗透到子组件中，这样可以避免样式的全局污染

## 解决方法
使用 __深度作用选择器__ 可以影响子组件，可以使用 >>> 操作，
```
<style scoped>
  .a >>> .b 
</style>
```

现项目使用的是 less 预处理器，无法正常解析 >>> 。这时需要使用 /deep/ 或 :: v-deep 操作符
```
<style scoped>
  /deep/ .a {
    .b {

    }
  } 
</style>
```

## 参考
 - [Scoped CSS](https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B7%E7%94%A8%E6%9C%AC%E5%9C%B0%E5%92%8C%E5%85%A8%E5%B1%80%E6%A0%B7%E5%BC%8F)