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

9. 在 linux 环境下，git pull、 git push 都需要输入用户名跟密码，使用以下命令，让 linux 环境自动记录用户中跟密码，避免重复输入的烦恼; 以下命令也是长期存储密码的意思

```
git config --global credential.helper store
```
或者
```
sudo vim ~/.gitconfig

编辑 git 配置文件，然后输入

[credential]
    helper = store
```

10.记录用户命令  

1.设置记住密码（默认15分钟）;
```
git config --global credential.helper cache
```
2.自定义设置多长时间
```
git config credential.helper 'cache --timeout=3600'
```
3.长期存储密码
```
git config --global credential.helper store
```
4.增加远程地址的时候带上密码也是可以的。
```
git pull https://yourname:password@github.comcoolkeychen/blog.git
```