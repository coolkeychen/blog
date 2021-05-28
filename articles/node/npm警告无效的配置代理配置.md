# npm警告无效的配置代理配置必须是带有’http：//’的完整URL
> 最近想通过 react 学习下 typescript， 顺便巩固一下 react 知识体系 ，首先利用 npm init 命令初始化工程，第一步就遇到了问题，npm 警告无效的配置，代理配置必须带有 'http://' 的完整 URL

![image](https://github.com/coolkeychen/blog/blob/master/images/npm-01.png?raw=true)


**通过 stackoverflow找到解决方案**

```
npm config set registry "http://registry.npmjs.org"
npm config set strict-ssl false
```