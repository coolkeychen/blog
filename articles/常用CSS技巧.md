# 常用CSS技巧
## 引言
> 在做前端开发时，有一些常用却容易忘记的css 技巧，在此文章做一下收录，防止遗忘

## CSS文本两端对齐
文本两端对齐，在 label 有经常使用到，这样的排版对整段文字来说清淅且易读
```
.label {
  display: inline-block;
  height: 100%;
  min-width: 100px;
  text-align: justify;
  text-align-last: justify;
}
```

- [参考资料](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align-last)
- [掘金参考资料](https://juejin.im/post/5da3a357f265da5b6723ee1e)