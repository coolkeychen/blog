# js 代码简洁之道
> 做为一名程序员，难免会接手别人的项目，或者项目进行重构时，看着一些老旧的代码没有注释就算了，还经常会出现一些很莫名其妙的命名，如a，b，代码可读性之差，遭到吐槽就再所难免。有可能这些老旧的代码就是自己写的，然后过了一周或者更长时间，你就会怀疑这些屎一样的代码真的是自己写的吗？  
代码不仅要**可读性**高，而且还要**简洁**明了，让人一眼明了，如慕春风，所以平时对自己要有高要求，写出来的代码质量才有高保证

## 命名
 变量的命名是一项技术活，也是吐槽最多的地方，给变量命名就像给自己的孩子命名一样，要优美，要知其名而得其意，不要中英混搭，这样的中西结合不伦不类；  
 大多数变量赋值完不需要再改变，优先使用 const ，无法避免重新赋值就使用 let，var 会使用变量提升，容易出现一些不必要的 bug

 ### 1.常量应该命名
 ```
 // bad
 circle = {
     circumference: 3.1415926 * 2 * r;
 }

 // good 
 const Pi = 3.1415926;
 circle = {
     circumference: Pi * 2 * r;
 }
 ```

 ### 2.知其名得其意
 ```
 // bad
 let n = 'cat';

 // good
 let name = 'cat';
 ```

 看到函数名知道函数是什么功能
 ```
 // bad
 function getList(){}

 // good
 function getDevices(){}
 ```

 ### 3.减少命名冗余

```
// Bad
const favoriteList = [];
// good
const favorite = [];
```

## 函数
### 1.简化代码
利用三目运算符和 ES6+ 语法简化代码
```
// Bad
const celebrationDayChange = isSameDay => {
    if (isSameDay) {
        $dateSelect.addClass('hide');
    } else {
        $dateSelect.removeClass('hide');
    }
};

// Good
const celebrationDayChange = isSameDay => {
    const action = isSameDay ? 'addClass' : 'removeClass';
    $dateSelect[action]('hide');
};
```

### 2.函数参数
参数尽量简短，如有 3 个以上建议直接换成对象的方式：
```
// bad
function say(title,name,content,date){};
say('title','cat','我在写博客','2019/04/09')

// good
function say({title,name,content,date}){}
say({
    title:'title',
    name:'cat',
    content:'我在写博客',
    date:'2019/04/09',
})
```

### 3.设置对象默认属性
利用 Object.assign

```
const options = {
    name:'cat',
    age: 30
}


// bad
function createPerson(options={}){
    options.name = options.name || 'He';
    options.age = options.age || 1;
}

// good 
funciton createPerson(options={}){
    options = Object.assign({
        name: 'He',
        age:1
    },options)
}
```

### 4.参数默认值
```
// Bad
function Person(name) {
    name = name || 'Cat';
    // ...
}

// Good
function Person(name = 'Cat') {
    // ...
}
```
### 4.函数式风格

```
// bad
function querify(object={}){
    const keys = Object.keys(object);
    for(let i=0; i<keys.length; i++) {
        result += `&${keys[i]}=${object[keys[i]]}`;
    }
    result = result.slice(1);
    return result;
}

// good
function querify(object={}){
    const keys = Object.keys(object);
    const result = keys.reduce((prev,cur)={
        prev += `&${cur}=object[cur]`;
        return prev;
    },''),slice(1);
    return result
}
```

### 5. 优化嵌套的条件语句
很多条件嵌套语句 if 经常使用 switch 语句，但是用 switch 有个问题，单个条件判断多时，调试问题就突显出来了，我们可以借用 object，效率高
```
// Bad
function reducer(state = 0, {type}) {
    switch (type) {
        case 'INCREASE':
            return state + 1;
        case 'DECREASE':
            return state - 1;
        default:
            return state;
    }
}

// Good
function reducer(state = 0, {type}) {
    const mapping = {
        'INCREASE': state + 1,
        'DECREASE': state - 1,
    };
    const effective = Object.keys(mapping).includes(type);
    return effective ? mapping[type] : state;
}

// bad
switch(true) {
  case (typeof color === 'string' && color === 'black'):
    printBlackBackground();
    break;
  case (typeof color === 'string' && color === 'red'):
    printRedBackground();
    break;
  case (typeof color === 'string' && color === 'blue'):
    printBlueBackground();
    break;
  case (typeof color === 'string' && color === 'green'):
    printGreenBackground();
    break;
  case (typeof color === 'string' && color === 'yellow'):
    printYellowBackground();
    break;
}

// good
var colorObj = {
  'black': printBlackBackground,
  'red': printRedBackground,
  'blue': printBlueBackground,
  'green': printGreenBackground,
  'yellow': printYellowBackground
};

if (color in colorObj) {
  colorObj[color]();
}
```

### 6.封装 if 判断条件
不要把条件判断语句直接放在 if里，可以先给个函数变量再进行判断
```
// bad
if(/lsi/gi).test(rule)){
    ...
}


// good
const isTure = rule => /lsi/gi.test(rule);
if(isTure) {
    ...
}

```

### 7.不用「否定」语法命名函数
```
// Bad
const isNotSupport = () => {};
const canNotUpdate = () => {};

// Good
const isSupport = () => {};
const canUpdate = () => {};
```

## 尽量使用 ES6+ 语法
### 1.解构和析构
```
// Bad
const name = person.name;
const age = person.age;

// good
const { name, age } = person;

// Bad
function Person(options){
    options({
        name:options.name,
        age:options.age,
    })
}

// Good
function Person({name,age}) {
    options({
        name:name,
        age:age,
    })
}

// Best 
function Person({name,age}){
    options({name,age})
}
```

### 2.模板字符串

```
// Bad
const greeting = name => 'Hello ' + name + '!';

// Good
const greeting = name => `Hello ${name}!`;
```
### 3.箭头函数
```
// Bad
function greeting(name) {
    return `Hello ${name}!`;
}

// Good
const greeting = name => `Hello ${name}!`;
```
### 4.promise代替回调函数

```
// Bad
fetchCurrentUser((error, currentUser) => {
    if(error) throw Error;
    fetchArticles(currentUser.id, (error, articles) => {
        if(error) throw Error;
        ...
    });
});

// Good
fetchCurrentUser
.then(currentUser => currentUser.id)
.then(fetchArticles)
.then(articles => {
    ...
})
.catch(() => {
    throw Error;
});

// Best
try {
    const currentUser = await fetchCurrentUser();
    const articles = await fetchArticles(currentUser.id);
    // articles here...
} catch() {
    throw Error;
}

```

## 总结
写代码还是要规范一些，要经得起时间的考验，经得起别人的推敲，可读性强，代码不规范，维护两行泪