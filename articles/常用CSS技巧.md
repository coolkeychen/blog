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

## 修改滚动条默认样式
```
&.active {
  // transition: opacity .5;
  opacity: 1;
  transition: all 2s linear;
  height: calc(100vh - 499px);
  overflow-y: scroll;
  &::-webkit-scrollbar {/*滚动条整体样式*/
    width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 6px;
    // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,.2);
  }
  &::-webkit-scrollbar-track {/*滚动条里面轨道*/
    // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 6px;
    background-color: rgba(144,147,153,.3);
  }
}
```

- [参考资料](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align-last)
- [掘金参考资料](https://juejin.im/post/5da3a357f265da5b6723ee1e)