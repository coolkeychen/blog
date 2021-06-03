# Node 利用tree-node-cli生成目录树结构

> 在工作中，有些项目在构建并初始化完之后，在填写 README.md 时，需要展示整个项目的文件目录树功能，网上搜索一番之后， tree-node-cli 这个组件刚好适合

1. ### 安装 tree-node-cli 
```
npm install -g tree-node-cli
```   

2. ### 卸载 tree-node-cli

```
npm uninstall -g tree-node-cli
```   

3. ### 使用
```
tree -L 3 -I "node_modules|.git" -a --dirs-first
```

4. ### 例如
```
im
├── public ── ── ── ── ── ── ── ── ── ──  公共资源
│   ├── favicon.ico
│   ├── index.html  ── ── ── ── ── ── ──  首页html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src  ── ── ── ── ── ── ── ── ── ── ── 源码目录
│   ├── App.css   ── ── ── ── ── ── ── ── CSS文件
│   ├── App.js ── ── ── ── ── ── ── ── ── React组件
│   ├── App.test.js
│   ├── index.css
│   ├── index.js  ── ── ── ── ── ── ── ── 入口js文件
│   ├── logo.svg
│   ├── serviceWorker.js
│   └── setupTests.js
├── README.md  ── ── ── ── ── ── ── ── ── 介绍文档
├── package.json  ── ── ── ── ── ── ── ── npm 项目配置
└── yarn.lock  ── ── ── ── ── ── ── ── ── yarn 版本锁定配置文件
```

5. ### 解释
   
* treee：windows用户需要用treee代替tree，避免和系统的tree命令冲突。
* -L 3：指定路径的级别为3级。
* -I "node_modules|.idea|objects|.git"： 忽略文件夹（正则表达式匹配的，.git会匹配到.gitignore,所以.gitignore文件没有显示出来）。
* -a：显示所有文件（默认前缀有"."的不会显示，例如".electron-vue"）。
* --dirs-first：目录在前，文件在后（默认是字母排序，和idea显示的顺序不一致）。


6. ### 完整选项
```
-V, --version             输出版本号
-a, --all-files           打印所有文件，包括隐藏文件
--dirs-first              目录在前，文件在后
-d, --dirs-only           仅列出目录
-I, --exclude [patterns]  排除与模式匹配的文件。用 | 隔开,用双引号包裹。 例如 “node_modules|.git”
-L, --max-depth <n>       目录树的最大显示深度
-r, --reverse             按反向字母顺序对输出进行排序
-F, --trailing-slash      为目录添加'/'
-h, --help                输出用法信息
```

7. ### 备注
windows 环境下，应使用 treee, Mac 环境下，使用 tree