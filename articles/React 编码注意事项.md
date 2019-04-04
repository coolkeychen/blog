# React 编码注意事项
## 1.state使用不规范

**容易产生的问题**：页面频繁渲染

-[正确示例](https://www.jianshu.com/p/c6257cbef1b1)

## 2.异步回调setState
**容易产生问题**：异步回调在组件卸载后执行，从而导致内存漏  
**正确示例**  
```

componentDidMount(){
  this.mounted = true;
 
  this.props.fetchData().then((response) => {
    //判断组件是否已经卸载
    if(this.mounted) {
      this.setState({ data: response })
    }
  })
}
 
componentWillUnmount(){
  this.mounted = false;
}
```
## 3. 使用redux的MapStateToProps
**容易产生问题**:   
1. 把一些无用的全局state映射到组件上的props，每次redux的action触发引起的state变化都会导致组件重新渲染。如果需要多个状态值来计算属性，则可以把计算结果直接复制给props，如果是复杂的计算则使用reselect中间件。

2. state映射给了默认值，如  devInfo:state.device.devInfo || {}，如此会导致重复渲染  

**正确示例**  
```
mapStateToProps = (state) => {
    const { checkedItems } = state;
    return {
        disableAll: checkedItems.length === 0，
        - devInfo:state.device.devInfo || {}，
        + devInfo:state.device.devInfo
    }
}
```
## 4. 组件props变化时，触发接口调用
**容易产生的问题**:  请求重复触发，顺序错乱  
**正确示例**：
```
class ExampleComponent extends React.Component {
  state = {};
 
  static getDerivedStateFromProps(nextProps, prevState) {
    // Store prevUserId in state so we can compare when props change.
    // Clear out any previously-loaded user data (so we don't render stale stuff).
    if (nextProps.userId !== prevState.prevUserId) {
      return {
        prevUserId: nextProps.userId,
        profileOrError: null,
      };
    }
 
    // No state update necessary
    return null;
  }
 
  componentDidMount() {
    //组件挂载成功后进行第一次接口调用
    this._loadUserData();
  }
     
  componentDidUpdate(prevProps, prevState) {
    //属性发生变化后，触发接口调用
    if (this.state.profileOrError === null) {
      // At this point, we're in the "commit" phase, so it's safe to load the new data.
      this._loadUserData();
    }
  }
 
  render() {
    if (this.state.profileOrError === null) {
      // Render loading UI
    } else {
      // Render user data
    }
  }
 
  _loadUserData() {
    // Cancel any in-progress requests
    // Load new data and update profileOrError
  }
}
```

## 5. 定时器
**容易产生的问题**：定时器没有及时释放，导致内存泄露  
**正确示例**：  
```

componentDidMount(){
  this.interval = setInterval(()=>{});
}
 
//组件卸载时，清除定时器
componentWillUnmount(){
  clearInterval(this.interval);
}
```

## 6. 事件监听
**容易产生的问题**：事件未及时清除导致内存泄露  
**正确示例**： 
```

componentDidMount(){
  onDeviceDeleteCallback（this.callback）
}
 
//组件卸载时，清除事件监听
componentWillUnmount(){
  offDeviceDeleteCallback(this.callback);
}
```