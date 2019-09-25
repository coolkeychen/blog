# 解决部份手机video层级过高问题

## 引言
> 部份手机在播放视频 video 时，需要在播放页增加弹窗遮罩层，来完成一些操作，但是弹出层会被 video 给覆盖住，即使设置了 z-index 播放层级也无法解决问题。

## 解决方法
1. 弹出遮罩层的时候，先把 video 给隐藏掉；
2. 关闭遮罩层时，再把 video 给显示出来；

## code

```
<div class="video-area" :class=" {hiddenVideo:isShowDialog}">
   <video></video>                 
</div>
```

```
/deep/ .hiddenVideo video{
    height: 1px !important;
    visibility: hidden !important;
    display: none !important;
}
```