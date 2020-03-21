# vue 项目 lib-flexible + px2rem-loader  实现移动端端自适应

> A Vue.js project

## vue项目初始化

``` bash
vue init webpack Vue-ProjectName
```

## 安装lib-flexible 和 px2rem-loader

```bash
cnpm install lib-flexible --save
cnpm i px2rem-loader --save
```

## 移动端meta设置

在项目根目录的index.html 头部加入手机端适配的meta的代码

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
```

## 在项目入口文件main.js中引入lib-flexible

```js
import 'lib-flexible'
```

## 修改build/untils.js配置的2处

```js
exports.cssLoaders = function (options) {
  ...
  const px2remLoader = {
    loader: "px2rem-loader",
    options: {
      remUnit: 75  // 1rem = 75px
    }
  }
  ...

  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader, px2remLoader] : [cssLoader, px2remLoader]

  ...
}
```

## ending

然后重启后，在组件中写单位直接写px，然后在浏览器中的检查就可以看到单位是rem

## 不需要px转换成rem的时候

```css
font-size: 75px; /* no*/
```

## 启动项目

```bash
npm install
npm run dev
```

serve with hot reload at localhost:8080
