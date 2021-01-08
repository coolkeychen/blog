<!--
 * @Description: 
 * @Author: Cat
 * @Date: 2021-01-08 17:57:21
 * @LastEditTime: 2021-01-08 18:06:55
 * @LastEditor: Cat
-->
# 常用 js 技巧

> 在做前端开发时，有一些常用却容易忘记的 js 技巧，在此文章做一下收录，防止遗忘

```
filterConditon (list, condition) {
  let filterList = list;
  const classArray = filterList.filter(item => {
      return item == condition;
  })
  if (!classArray.length) {
      filterList.push(condition);
  } else {
      filterList = filterList.filter(item=>{
          return item != condition;
      })
  }
  console.log('filterList',filterList);
  return filterList;
}
```

## 判断数组或者对象是否为空
数据联调时，有时数据需要数据，却默认给了空数组；有时需要数组，却给了空对象；有的组件 props 需要限制类型，控制台就一堆红红的报错信息，对于有强迫症的我，这怎么能忍
```
(Array.isArray(lessonClass) && lessonClass.length !== 0) || (Object.prototype.isPrototypeOf(lessonClass) && Object.keys(lessonClass).length !== 0)
```