# 利用 Object 优化嵌套的条件语句

## 引言
> 我们是怎么提高和优化嵌套的 if 判断语句，一种有效的方法是利用 switch 语句，switch 排序整齐且易读，但 switch 调试起来也很困难繁琐，我们可以借助 object 的键值对来做为条件。

## 为什么 switch 调试起来困难

当条件一多的时候，switch 的弊病就出来了，我们要维护多条的条件
```
switch(align) {
    case (typeof align === 'string' && align === 'left'):
        this.alignLeft();
        break;
    case (typeof align === 'string' && align === 'center'):
        this.alignCenter();
        break;
    case (typeof align === 'string' && align === 'right'):
        this.alignRight();
        break;
    case (typeof align === 'string' && align === 'top'):
        this.alignTop();
        break;
    case (typeof align === 'string' && align === 'middle'):
        this.alignMiddle();
        break;
    case (typeof align === 'string' && align === 'bottom'):
        this.alignBottom();
        break;
}
```

## object 方式
```
    handleAlignPosition = (align) => {
        const { stage } = this.selectStage;
        const bgLayer = stage.findOne('.bgLayer');

        let frame = {},frameClientRect={},items = [];

        if (this.selectedFrameId) {
        frame = stage.findOne(`#${this.selectedFrameId}`);
        frameClientRect = frame.getClientRect();
        items = frame.find('.item');
        if(items.length ===0) {
            message.error('容器没东西');
            return;
        }
        } else {
        stage.find('Transformer').destroy();
        frameClientRect = stage.getClientRect();
        items =  bgLayer.find('.frame');
        if(items.length ===0) {
            message.error('大容器没东东');
            return;
        }
        }

        const alignObj = {
            left: this.alignLeft,
            center: this.alignCenter,
            right: this.alignRight,
            top: this.alignTop,
            middle: this.alignMiddle,
            bottom: this.alignBottom,
        }

        if (align.toLowerCase() in alignObj) {
        alignObj[align.toLowerCase()](frameClientRect,items,bgLayer);
        }
    }
```

## 总结：
这两种风格的代码一看，object 方法看起来简练高效，switch 相对调式麻烦，而且也繁琐很多