<!--
 * @Description: 
 * @Author: cat
 * @Date: 2021-10-09 16:53:40
 * @LastEditTime: 2021-12-20 11:18:05
 * @LastEditor: cat
-->
# 使用 Object.prototype.toString.call(obj) 

> 检测类型在前端开发中经常遇到，面试也是常有， 这是一个十分常见的问题，用 typeof 是否能准确判断一个对象，答案是否定的， null 的结果 也是 object, 数组也是 object

使用以下方式可以很好的区分各种类型
```
console.log(Object.prototype.toString.call(obj) === "[object Object]")
```

```
console.log(Object.prototype.toString.call("jerry"));//[object String]
console.log(Object.prototype.toString.call(12));//[object Number]
console.log(Object.prototype.toString.call(true));//[object Boolean]
console.log(Object.prototype.toString.call(undefined));//[object Undefined]
console.log(Object.prototype.toString.call(null));//[object Null]
console.log(Object.prototype.toString.call({name: "jerry"}));//[object Object]
console.log(Object.prototype.toString.call(function(){}));//[object Function]
console.log(Object.prototype.toString.call([]));//[object Array]
console.log(Object.prototype.toString.call(new Date));//[object Date]
console.log(Object.prototype.toString.call(/\d/));//[object RegExp]
console.log(Object.prototype.toString.call(val) === '[object File]')
console.log(Object.prototype.toString.call(new Blob("a"))) === '[object Blob]';
```