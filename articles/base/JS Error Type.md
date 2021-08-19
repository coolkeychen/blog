<!--
 * @Description: 
 * @Author: 陈春凯
 * @Date: 2021-08-19 15:17:33
 * @LastEditTime: 2021-08-19 15:27:52
 * @LastEditor: 陈春凯
-->

# Js Error Type

### js中包含的错误详细解释

```
SyntaxError: 语法错误

ReferenceError: 引用错误 要用的东西没找到

RangeError: 范围错误  专指参数超范围

TypeError: 类型错误  错误的调用了对象的方法

EvalError: raised when an error occurs executing code in eval()  eval函数调用失败

URIError: raised when encodeURI() or decodeURI() are passed invalid parameters 编码错误
```

### 以下在浏览器可抛出错误
```
throw new SyntaxError('I dont like your syntax');

throw new TypeError('What type of variable do you take me for?');

throw new RangeError('Sorry, you just dont have the range')

throw new EvalError('That doesnt evaluate.')

throw new URIError('Uri, is that you?');

throw new ReferenceError('You didnt cite your references properly');
```