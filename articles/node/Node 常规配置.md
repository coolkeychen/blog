<!--
 * @Description: 
 * @Author: coolkeychen
 * @Date: 2019-12-23 17:56:26
 * @LastEditTime: 2021-10-08 15:40:57
 * @LastEditor: coolkeychen
-->
# Node 常规配置

## 引言
> 随着Node.js 的推出，前端工程化、模块化又上升到另一个高度，一些需要配置的东西，经常要谷歌查找，好记性不如烂笔头

1. 添加淘宝镜像源
```
npm config set registry https://registry.npm.taobao.org
```

2. 获取当前镜像源
```
npm config get registry
```

3. 列出全局安装 的插件
```
npm list --depth=0 -g
```

4. 更新
```
npm update -g xxx
```

5. 删除
```
npm uninstall -g xxx
```