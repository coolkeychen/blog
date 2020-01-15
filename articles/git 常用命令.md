# git 常用命令
1. git config 设置名字/email
```
git config --global user.name "coolkeychen"

git config --global user.email "coolkeychen@gmail.com"
```

2. 列出所有 Git 当时能找到的配置
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

5. 推送关联到远程分支
```
git push --set-upstream origin feature/BMS-403
```

6. 删除远程分支 
```
git push origin --delete Chapater6 
```

7. 删除本地分支
```
git branch -d Chapater6
```

8. 在本地新建分支cat拉取远程分支代码，并自动切换到该本地分支cat
```
git checkout -b cat origin/cat
```