<!--
 * @Description: Node 如何查看地安装过的模块或包
 * @Author: 陈春凯
 * @Date: 2021-05-26 10:42:29
 * @LastEditTime: 2021-05-26 10:48:15
 * @LastEditor: 陈春凯
-->
## Node 如何查看地安装过的模块或包

#### npm ls ，可以查看当前文件夹下安装的模
  ```
  npm ls
  ```

### 可以加上 --depth 0，来限制结果的层数

1. 查看当前项目的依赖模块   

    ```
    npm ls --depth 0
    ```
2. 查看当前项目的依赖模块   

    ```
    npm ls -g --depth 0
    ```