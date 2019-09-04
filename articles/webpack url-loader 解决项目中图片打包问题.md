# webpack url-loader 解决项目中图片打包问题

## 引言
> 在使用 webpack 对项目进行打包时，图片引用遇到一些问题，一个 wepback 配置，导致转换为 base64, json 太大，后台字段存储太小，接口联调出错;

## url-loader
```
1. 安装：npm i url-loader -D
2. webpack.config.js配置文件中添加处理规则：
module：{
    rules：[
        { test: /\.(jpg|png|gif|bmp|jpeg)$/,//正则表达式匹配图片规则
        use: [{
            include: paths.appSrc, //表示哪些目录中的图片文件需要进行 url-loader
            exclude: paths.iconPath, // 表示哪些目录中的图片文件不要进行 url-loader
            loader: require.resolve('url-loader'),
            options:{
                limit:8192,//限制打包图片的大小：
                //如果大于或等于8192Byte，则按照相应的文件名和路径打包图片；如果小于8192Byte，则将图片转成base64格式的字符串。
                name:'images/[name]-[hash:8].[ext]',//images:图片打包的文件夹；
                //[name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
                //[hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
            }
        }]}
    ]
}
```