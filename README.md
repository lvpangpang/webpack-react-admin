# webpack-react-admin

快速搭建前端 React 项目，减少 webpack 配置学习成本

* 支持 ts, tsx, js, jsx, less,css 等文件类型的编译打包
* 支持装饰器
* 自动使用空闲端口启动服务
* 根据引入样式的方式自动支持是否模块化
* 对 antd，antd-mobile 库自动按需打包
* 快捷配置多个环境变量
* 支持拷贝静态文件到dist
* 支持图表化显示打包输出信息
* 项目启动前自动检测脚手架是否是最新版本
* 项目启动前自动检测本地依赖和package.json中版本是否一致
* 支持文件式路由，多人项目可以不用维护路由表，减少冲突
* 生产环境react，react-dom,react-router-dom, mobx, mobx-react-lite, axios等常用库自动走CDN资源，大大减少打包体积，该功能可以配置
* 支持px自动转rem
## 1.Install

```bash
npm install webpack-react-admin --D
```

## 2.命令

```bash
//package.json
{
  "script": {
    //开发
    "start": "webpack-react-admin env=aa name=123", // 在业务代码里面就可以通过__ENV__.env获取到当前环境的值，__ENV__.name获取到name
    //打包
    "build": "webpack-react-admin build"
  }
}
```

## 3.目录结构

```
.
+-- public
|   +-- index.html(項目html模板，必須)
+-- src
|   +-- pages(必须有)
|       + -- index
|       + -- list
|   +-- index.js(入口文件，可以配置， 当启动文件式路由时不需要)
```

## 4.配置文件

允许自定义添加配置文件修改 webpack 配置,需要在根目录添加 admin.config.js 文件

## 5.配置项说明

| 属性         | 说明             | 备注  |
| ------------ | -------- | ---- |
| title        | 页面title | 默认为Document |
| icon         | 页面icon |  |
| entry        | 入口配置 | 参考[webpack entry](https://www.webpackjs.com/configuration/entry-context/#entry) |
| publicPath   | 文件输出公共前缀 | 参考[webpack publicPath](https://www.webpackjs.com/configuration/output/#output-publicpath) |
| port         | 开发服务器端口号 | 默认值：3000   |
| proxy         | 开发代理 |   |
| babelPlugins | babel 插件配置   | |
| useCopyPublic | 是否开启拷贝public文件夹下面所有静态文件到dist | 默认不开启 |
| checkAdmin | 项目启动前自动检测脚手架是否是最新版本 | 默认开启 |
| checkPackage | 项目启动前自动检测本地依赖和package.json中版本是否一致 | 默认不开启 |
| useFileRouter | 是否开启文件式路由 | 默认不开启（具体使用参考Example/fileRouter） |
| externals | 生产环境资源是否走cdn |  externals: {react: {name: 'React',url: 'https://unpkg.com/react@17.0.0/umd/react.production.min.js',},},
| isRem | px自动转rem   | 750px规格设计稿|



