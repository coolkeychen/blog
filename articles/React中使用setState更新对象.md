# React中使用setState更新对象

## 引言
> 在 React 开发中，经常要使用 state, 有时我们会在 state 定义一个对象，当对象变化时，那我们如何利用this.setState 更新对象

```
this.state = {
    selectItem: {
    x:0,
    y:0,
    width: 0,
    height: 0,
    showType: 'icon',
    }
};
```

## 实现方法
1. 使用 Object.assign()
```
let selectItem = Object.assign({},this.state.selectItem);
selectItem.x = 100;
this.setState({
    selectItem
})
```

2. 使用 **扩展运算符**

```
this.setState(prevState => ({
    selectItem: {
        ...prevState.selectItem,
        x: 100
    }
}))
```

## 总结
ES6 语法使用起来确实比较便捷，能够节省很多的代码量，所以想做为一个优秀的前端，掌握 ES6是非常有必要的

