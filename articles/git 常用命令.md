# git 常用命令

## 前言
> 随着 分布式版本控制系统GIT 越来越受欢迎，平时进行代码提交，把经常用到的一些命令记录下来，防止遗忘，好记录不如烂笔头。

1. git config 设置全局名字/email
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

10. 记录用户命令  

    设置记住密码（默认15分钟）

    ```
    git config --global credential.helper cache
    ```

    自定义设置多长时间  
    ```
    git config credential.helper 'cache --timeout=3600'
    ```
    长期存储密码
    ```
    git config --global credential.helper store
    ```

    增加远程地址的时候带上密码也是可以的。      
    ```
    git pull https://yourname:password@github.comcoolkeychen/blog.git
    ```
11. 当前仓库配置
    ```
    git config --local user.name '你的名字'
    git config --local user.email '你的邮箱'
    ```

12. 查看当前仓库配置
    ```
    git config --local --list
    ```

13. git clone 使用用户名及密码

    git clone http://邮箱(或用户名):密码@仓库地址   
    
    ```
    邮箱: coolkeychen@gmail.com
    密码: xxxxxx
    仓库: https://github.com/coolkeychen/blog.git
    注意: 邮箱中的 @ 要使用 %40 代替。
    ```
    实例：   

    ```
    git clone https://coolkeychen%40gmail.com:xxxxxx@github.com/coolkeychen/blog.git
    ```

14. 初始化 git 本地仓库
    ```
    git init
    ```

15. 查看在你上次提交之后是否有对文件进行再次修改
    ```
    git status
    ```
16. git add 
    - 添加一个或多个文件到暂存区
        ```
        git add [file1] [file2]
        ```
    - 添加当前目录下的所有文件到暂存区
        ```
        git add .
        ```
    - 从暂存区撤销所有文件
        ```
        git reset HEAD
        ```
    - 从暂存区撤销一个或多个文件
        ```
        git reset HEAD [file1] [file2]
        ```
17. 将暂存区内容添加到本地仓库中
    ```
    git commit -m [message]
    ```
18. 查看提交修改日志
    ```
    git log
    ```
19. 查看分支
    ```
    git branch
    git branch --all
    ```
20. 推送到远程分支上
    ```
    git push
    ```
21. 将本地的master分支推送到origin主机，同时指定origin为默认主机
    ```
    git push -u origin master
    ```
22. 创建并切换到新分支
    ```
    git checkout -b 分支的名称
    ```
23. 切换分支
    ```
    git checkout 分支名称
    ```
24. 代码回退，回滚
    ```
    git reset --hard commit_id
    ```
25. 合并分支
    ```
    git merge 分支名称
    ```
26. 删除本地分支
    ```
    git branch -d 分支名称
    ```
27. 强制删除本地分支
    ```
    git branch -D 分支名称
    ```
28. 删除远程分支
    ```
    git push origin --delete 分支名称
    ```
29. 代码拉取
    ```
     git pull
    ```
30. 存储代码
    ```
    git stash
    ```
31. 查看stash了哪些存储
    ```
    git stash list
    ```
32. 恢复之前缓存的工作目录，将缓存堆栈中的对应stash删除，并将对应修改应用到当前的工作目录下,默认为第一个stash
    ```
    git stash pop
    git stash pop stash@{$num} 1 应用 第二个
    ```
33. 从缓存列表中删除这个存储
    ```
    git stash drop
    git stash drop stash@{$num}
    ```
34. 删除所有缓存的stash
    ```
    git stash clear
    ```
