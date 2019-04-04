# js 跨域问题
## 引言
> 由于 js 同源策略，跨域是前端开发中，经常会遇到的问题，当遇到跨域问题时，我们应如何解决；

## 同源策略
**同源策略**是浏览器最核心最基本的安全功能，如果没有这个功能，网站很容易受到XSS，RSF攻击。何为同源呢？如下表  

| 说明      |    url | url  |
| :-------- | :--------:| :--: |
| 端口不同  | http://www.domain.com:8000/a.js |  http://www.domain.com/b.js    |
| 协议不同  | http://www.domain.com:8000/a.js |  https://www.domain.com:8000/a.js  |
| 域名不同  | http://www.domain.com1:8000/a.js | http://www.domain.com2:8000/a.js  |
| 主域相同，子域不同  | http://api.domain.com:8000/a.js | http://shop.domain.com:8000/a.js  |
| 域名和域名对应相同ip  | http://www.domain.com:8000/a.js | http://192.168.2.122/a.js  |

**同源策略** 限制以下行为：
1. Cookie、LocalStorage 和 IndexDB 无法读取
2. DOM 和 Js对象无法获得
3. AJAX 请求不能发送

## 解决方案
就说几点比较常用主流的解决方案  
1. jsonp
2. 跨域资源共享（CORS）
3. Nginx 反向代理

### 1.通过jsonp跨域
一直觉得想到 jsonp 这个解决方式的人是很天才的，合理利用规则，另辟蹊径，把参数和全局回调函数放在网址上，来动态创建 script，以此来实现跨域通信  
缺点：只能用 get 请求
### 2. 跨域资源共享（CORS）
这个也是目前最主流的解决方案，这个在我之前的博客有写过，SSO单点登录系统
- 普通跨域：只服务端设置Access-Control-Allow-Origin即可，前端无须设置
```
 "Access-Control-Allow-Credentials", "true"   
 "Access-Control-Allow-Origin", "yourdomain"
```
- 带cookie 跨域： 前后端都需设置，前端需要开启 withCredentials = true
```
withCredentials = true
```
### 3. Nginx 反向代理
个人感觉这个解决方案是最一劳永逸的方法，也是比较推荐的方案  
 
浏览器跨域访问js、css、img等常规静态资源被同源策略许可，但iconfont字体文件(eot|otf|ttf|woff|svg)例外，此时可在nginx的静态资源服务器中加入以下配置。
> 跨域原理： 同源策略是浏览器的安全策略，不是HTTP协议的一部分。服务器端调用HTTP接口只是使用HTTP协议，不会执行JS脚本，不需要同源策略，也就不存在跨越问题。
> 实现思路：通过nginx配置一个代理服务器（域名与domain1相同，端口不同）做跳板机，反向代理访问domain2接口，并且可以顺便修改cookie中domain信息，方便当前域cookie写入，实现跨域登录。
```
server {
    listen       81;
    server_name  www.domain1.com;

    location / {
        proxy_pass   http://www.domain2.com:8080;  #反向代理
        proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
        index  index.html index.htm;

        # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
        add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
        add_header Access-Control-Allow-Credentials true;
    }
}

```