<!--
 * @Description: 常用CSS技巧
 * @Author: Cat
 * @Date: 2021-04-21 23:13:44
 * @LastEditTime: 2021-04-21 23:23:39
 * @LastEditor: Cat
-->
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
 #### windows系统默认自带滚动条, 不是那么美观，作为折腾不息为原则, 底下对 chrome 兼容性不错，其他浏览器酌情使用吧！

 1. ::-webkit-scrollbar 滚动条整体部分
 2. ::-webkit-scrollbar-thumb  滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
 3. ::-webkit-scrollbar-track  滚动条的轨道（里面装有Thumb）
 4. ::-webkit-scrollbar-button 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
 5. ::-webkit-scrollbar-track-piece 内层轨道，滚动条中间部分（除去）
 6. ::-webkit-scrollbar-corner 边角，即两个滚动条的交汇处
 7. ::-webkit-resizer 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件

 底下为我经常用到的样式，有兴趣的小伙伴可以参考一下
```
*定义滚动条轨道 内阴影+圆角*/
&::-webkit-scrollbar {
  width: 3px;
  background-color: @white;
}
&::-webkit-scrollbar-thumb {
  background-color: #E8E8E8;
  border-radius: 3px;
}
```

- [参考资料](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align-last)
- [掘金参考资料](https://juejin.im/post/5da3a357f265da5b6723ee1e)