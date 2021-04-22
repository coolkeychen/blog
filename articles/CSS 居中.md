<!--
 * @Description: 
 * @Author: Cat
 * @Date: 2021-03-02 14:27:03
 * @LastEditTime: 2021-03-02 14:31:09
 * @LastEditor: Cat
-->
## 绝对定位居中(Absolute Centering)技术
> 我们经常用margin:0 auto来实现水平居中，而一直认为margin:auto不能实现垂直居中……实际上，实现垂直居中仅需要声明元素高度和下面的CSS

```
.Absolute-Center {
  margin: auto;
  position: absolute;
  top: 0; 
  left: 0; 
  bottom: 0; 
  right: 0;
}
```

## 容器内居中
> 内容块的父容器设置为position:relative，使用上述绝对居中方式，可以使内容居中显示于父容器
```
.Center-Container {
  position: relative;
}
 
.Absolute-Center {
  width: 50%;
  height: 50%;
  overflow: auto;
  margin: auto;
  position: absolute;
  top: 0; 
  left: 0; 
  bottom: 0; 
  right: 0;

```


## 负外边距(Negative Margins)
> 这或许是当前最流行的使用方法。如果块元素尺寸已知，可以通过以下方式让内容块居中于容器显示：外边距margin取负数，大小为width/height（不使用box-sizing: border-box时包括padding，）的一半，再加上top: 50%; left: 50%;
```
.Modal {
  width: 300px;
  height: 200px;
  padding: 20px;
  position: absolute;
  top: 50%; 
  left: 50%;
  margin-left: -170px; /* (width + padding)/2 */
  margin-top: -120px; /* (height + padding)/2 */
}
```


## Flexbox
```
.Modal {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    z-index: 1;
}
```

## 变形（Transforms）

> 这是最简单的方法，不近能实现绝对居中同样的效果，也支持联合可变高度方式使用。内容块定义transform: translate(-50%,-50%) 必须带上浏览器厂商的前缀，还要加上

```
.Modal { 
  width: 50%;
  margin: auto;
  position: absolute;
  top: 50%; left: 50%;
  -webkit-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
          transform: translate(-50%,-50%);

```


## 弹性布局
```
div.parent {
  display: flex;
  justify-content: center;
  align-item: center;
}
```

## 网络布局
```
div.parent {
  display: grid;
  div.child {
    justify-self: center;
    align-self: center;
  }
}
```