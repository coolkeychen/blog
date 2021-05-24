<!--
 * @Description: js 获取URL参数
 * @Author: 陈春凯
 * @Date: 2021-05-21 11:15:40
 * @LastEditTime: 2021-05-24 10:28:14
 * @LastEditor: 陈春凯
-->
## js 获取URL参数
> 最近做的项目都是基于vue, vue 提供 vue-router 组件, 可以通过 this.$route 来获取对应 url 参数

#### 以下代码适用 hash ，获取URL参数 
```
const queryURL = (name) => {
  const after = window.location.hash.split('?', 2)[1]
  if (after) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    const r = after.match(reg)
    if (r != null) {
      return decodeURIComponent(r[2])
    } else {
      return null
    }
  }
}
```
#### 以下代码适用 history 模式
```
const getQueryVariable = (variable) => {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
          var pair = vars[i].split("=");
          if(pair[0] == variable){return pair[1];}
  }
  return(false);
}
```

#### 利用 searchParams 来获取对应参数
```
如果你的 URL 是 https://example.com/?name=Jonathan&age=18 ，你可以这样解析 URL，然后得到 name 和 age 的值。
let params = (new URL(document.location)).searchParams;
let name = params.get('name'); // is the string "Jonathan Smith".
let age = parseInt(params.get('age')); // is the number 18
```

```
export { getQueryVariable , queryURL };
```