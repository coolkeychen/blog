## CSS3 :nth-child() 选择器
> css3 的伪类，该伪类首先找到当前元素的所有兄弟元素，然后按照位置先后顺序从1开始序，在平常生活中，运用还是挺多的

### 示例

1. HTML表格中的奇数行
```
tr:nth-child(2n+1)
tr:nth-child(odd)
```

2. HTML表格中的偶数行
```
tr:nth-child(2n)
tr:nth-child(even)
```

3. 匹配前三个子元素中的span元素。
```
span:nth-child(-n+3)
```



4. 【限制范围】选择第6个到第9个，取两者的交集
```
span:nth-child(-n+9):nth-child(n+6)
```

### 实践
这个是最近在做一个专题页,所遇到的具体情况

![jiben](https://github.com/coolkeychen/blog/blob/master/images/issue-36-01.png)
```
ul {
  margin-bottom: .6rem;
  li {
    font-size: .30rem;
    font-weight: bold;
    color: #333333;
    padding-bottom: .5rem;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      left: .1rem;
      bottom: -.02rem;
      width: .03rem;
      height: .5rem;
      border-left: .05rem dotted #2984FF;
    }
    &:last-child {
      padding-bottom: 0;
      &:before {
        display: none;
      }
    }
    i {
      color: #6B75FF;
    }
    em {
      display: inline-block;
      width: .26rem;
      height: .26rem;
      border-radius: .13rem;
      vertical-align: middle;
      margin-right: .25rem;
    }
    &:nth-child(-n+3){
      em {
        background-color: #FFE484;
      }
    }
    &:nth-child(-n+5):nth-child(n+4){
      em {
        background-color: #849EFF;
      }
    }
    &:nth-child(n+6){
      em {
        background-color: #FF8745;
      }
    } 
  }
}
```