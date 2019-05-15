# input、debounce、decorator 持续优化
## 引言
> 最近在开发一个 2d 编辑器，需求是要用户输入值，然后里面的 item 位置跟着进行相应变化。一般是在 input 输入框触发 onChange 事件时调用对应的事件，或者接口。但是发现每当用户输入一个单词，就触发一个事件，体验相当不好，是否可以等用户输完后光标离开 input 输入框，或者用户输完单词按 Enter 再触发事件，这时 PM 又说了，用户要可以实时观察 item 的变化，事与愿违，只能想想其它的解决方案，这时就想到 debounce

## Debounce 防抖机制

```
export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowNum: 3,
      columnNum: 3,
    };
    this.debounceArrangeSort = this.debounce(this.handleArrangeSort, 1000);
  }

  handleArrangeRowSort = (e) => {
    const rowNum = e.target.value;
    console.log(rowNum);
    if(!rowNum) {
      this.setState({
        rowNum: ''
      })
      return;
    }
    const regex = /^[1-9]\d*$/gi;
    const isNum = regex.test(rowNum);
    if (!isNum) {
      message.error('请输入整数!!');
      return;
    }

    this.setState({
      rowNum
    })
    this.debounceArrangeSort();
  }

  debounce  = (fn,delay) =>{
    let timer = null;
    let that = this;
    return function() {
      let args = arguments;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(function() {
        fn.apply(that, args);
      }, delay);
    }
  }

  handleArrangeSort = () => {
    const { rowNum,columnNum } = this.state;
    const rowCol = {
      rowNum:parseInt(rowNum),
      columnNum:parseInt(columnNum)
    }
    this.props.arrangeSort(rowCol)
  }

  render(){
    const {rowNum,columnNum} = this.state;
    return(
        <div className="menubar">
        <div className="menubar-inner">
          <ul className="menubar-inner-edit">
            <li>
              <dl>
                <dt><Input placeholder={rowNum} value={rowNum} onChange={(e)=>this.handleArrangeRowSort(e)}/></dt>
                <dd>Horizontal</dd>
              </dl>
            </li>
        </ul>
        </div>
        </div>
    )
  }
}
```


## Decorator 修饰器
是不是很好用，利用防抖机制已经达到了所要的效果，那我们再进一步思考下，我们是否可以用模式来做，Decorator修饰器的特性来修饰一个函数.  我们用装饰器模式来写一个 debounce 函数

```
const Debounce = (time: number) => {
  let last = null;
  return (_target, _property, descriptor) => {
    const that = this;
    const fn = descriptor.value;
    descriptor.value = function(...args) {
      if (last) {
        clearTimeout(last);
      }
      last = setTimeout(function() {
        fn.apply(that, args);
      }, time);
    };
    return descriptor;
  };
};

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  handleSetPostionX = (e) => {
    const x = e.target.value;
    console.log(x);
    this.setPostionX(x);
  }

  @Debounce(1000)
  setPostionX(x){
    // console.log(this.props);
    console.log(x);
  }

  return(
      <div className='sidebar'>
        <div className="sidebar-container">
          <ul>
            <li>
              <h2>Position</h2>
              <dl>
                <dt><Input value={x} onChange={e=>this.handleSetPostionX(e)}/></dt>
                <dd>X</dd>
              </dl>
            </li>
        </ul>
        </div>
    </div>
  )
}
```