# CSS过滤器：彩色图片变白

## 引言
> 如何使一张带有透明底的彩色png 格式图片保留透明底，彩色部份变成白色的图片，这个在 hover或者 active 可能会用到

## 方法
```
&:hover {
    background-color: #424751;
    img {
        filter: brightness(0) invert(1);
        -webkit-filter: brightness(0) invert(1);
    }
}
```

## 实现说明
1. brightness(0) 使彩色部分置成黑色，透明部份保留透明
2. invert(1) 使置成黑色的部份变成白色

## 总结
css filter ，过滤器功能蛮强大的，就是兼容性差了些

## 参考
- [MDN-CSS3-filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)