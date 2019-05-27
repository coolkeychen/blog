# git 常用命令
1. git config 设置名字/email
```
git config --global user.name "coolkeychen"

git config --global user.email "coolkeychen@gmail.com"
```

2. 查看全局设置
```
git config --global --list
```

3. 重新使用源文件
```
git checkout .
git pull
```

4. 解决中文乱码
```
git config --global core.quotepath false
```