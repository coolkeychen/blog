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