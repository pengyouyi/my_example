<font color="#4590a3" size = "6px">慕课网vue.js入门基础</font>

<font color="#4590a3" size = "6px">TODOList -- fishenal</font>

[TOC]
# 一、准备工作
1. 了解流行的前端项目搭建方式 webpack + gulp
2. 用 vue-cli 脚手架工具初始化vue项目

http://npm.taobao.org/    安装淘宝镜像，以后使用cnpm代替npm安装命令

```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```


### 全局安装vue-cli

```bash
$ npm install -g vue-cli
```

### 创建一个基于webpack模板的新项目
```bash
$ vue init webpack my-project
```
### 安装依赖
```bash
$ cd my-project
$ npm install
$ npm run dev
```


## todolist

```html
<template>
  <div id="app">
    <h1>{{test}}</h1>
    <input v-model="newItem" @keyup.enter="addNew"/>
    <ul>
      <li v-for="item in items" v-bind:class="{lifinish:item.isFinished}" v-on:click="toggleFinish(item)">
        {{item.label}}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return {
      test:"this is a todo list",
      items:Store.fetch(),
      newItem: ""
    }
  },
  watch: {
    items: {
      handler: function(val, oldVal){
        Store.save(val);
      },
      deep: true
    }
  },
  methods: {
    toggleFinish: function(item) {
      item.isFinished = !item.isFinished
    },
    
    addNew: function() {
      this.items.push(
        {
          label: this.newItem,
          isFinished: false
        }
      );
      this.newItem = ""
    }
  },
}
</script>

<style>
.lifinish {
  color:red
}
</style>
```

#二、知识点

```js
export default { 
	data() {
		return {test:"mytest"}
	}
 }

```

data等价于：

```js
export default { 
	data:function() {
		return {test:"mytest"}
	}
}

```

export default 是es6写法   
http://es6.ruanyifeng.com/#docs/module#export-default-命令

为模块指定默认输出

```js
// export-default.js
export default function () {
  console.log('foo');
}

```

调用时，customName是可以被任意命名的

```js
// import-default.js
import customName from './export-default';
customName(); // ‘foo’

```

**export default 与export 区别**	
一个模块只能有一个默认输出，因此export default命令只能使用一次。


## 浏览器使用localStorage来存储TODOlist数据
store.js

```js
const STORAGE_KEY = 'todos-vuejs';

export default {
	fetch() {
		return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
	},
	save(items){
		window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items))
	}
}

```

如何调用

```js
import Store from './store';

export default {
  name: 'app',
  data(){
    return {
      test:"this is a todo list",
      items:Store.fetch(),
      newItem: ""
    }
  },
  watch: {
    items: {
      handler: function(val, oldVal){
        Store.save(val);
      },
      deep: true
    }
  },
……
}

```
## 使用外部子组件
app.vue想使用componentA组件

- 1.app.vue 首先需要导入`import ComponentA from './components/componentA'` 

- 2.然后还需要注册`components: { ComponentA }`

- 3.最后在HTML或者template中使用`<component-a></component-a>`,需要注意在模板中使用的组件名是写成驼峰式的，Vue自动完成的转换

```html
<!--componentA.vue-->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'hello from componentA'
    }
  }
}
</script>
```

```html
<!--app.vue-->
<template>
  <div id="app">
    <component-a msgfromfather="you die"></component-a>
  </div>
</template>

<script>
import ComponentA from './components/componentA'

export default {
  name: 'app',
  data(){
    return {
      test:"this is a todo list"
    }
  },
  components: { ComponentA }
}
</script>
```

## 自定义事件
每个Vue实例都是一个事件触发器

- 使用 `$on()` 监听事件；
- 使用 `$emit()` 在它上面触发事件；
- 使用 `$dispatch()` 派发事件，事件沿着父链冒泡；
- 使用 `$broadcast()` 广播事件，事件向下传导给所有的后代

> 不同于DOM事件，Vue事件在冒泡过程中第一次触发回调后自动停止冒泡，除非回调明确返回 true 。

vue2移除了 `$dispatch()` 和 `$broadcast()`

## 组件之间通信
### 父组件向子组件传参
是通过props属性

子组件
```html
//this is header.vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ msgfromfather }}</h1>
    <button v-on:click="onClickMe">click</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'hello from componentA'
    }
  },
  props:['msgfromfather'],
	methods: {
		onClickMe: function(){
			console.log(this.msgfromfather)
		}
	}
}
</script>
```
父组件
```html
<!--this is app.vue-->
<header msgfromfather="something interesting"></header>
<footer></footer>
```

父组件定义`<header msg="something interesting"></header>`	
子组件要先注册 `props:['msg']`,才能使用

两种使用方法:

-  在模板中直接`{{ msg }}`
-  在methods方法里 `this.msg`调用


### 子组件向父组件传参
#### 父组件on & 子组件emit

1，父组件app.vue `<component-a msgfromfather="you die" 
    v-on:child-tell-me-something='listenToMyBoy'></component-a>`绑定自定义事件 child-tell-me-something，

2，子组件componentA 在button上点击`this.$emit('child-tell-me-something',this.msg)
` 触发事件child-tell-me-something，并传值

```html
<!--父组件app.vue-->
<template>
  <div id="app">
    <p>child tells me: {{ childWords }}</p>
    <component-a msgfromfather="you die" 
    v-on:child-tell-me-something='listenToMyBoy'></component-a>
  </div>
</template>

<script>
import ComponentA from './components/componentA'

export default {
  name: 'app',
  data(){
    return {
      childWords: ''
    }
  },
  methods: {
    listenToMyBoy: function(msg) {
      this.childWords = msg
    }
  },
  components: { ComponentA }
}
</script>
```

```html
<!--子组件componentA-->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button v-on:click="onClickMe">open mouse</button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'hello from componentA'
    }
  },
  methods: {
    onClickMe: function() {
      this.$emit('child-tell-me-something',this.msg)
    }
  }
}
</script>
```
#### 子组件使用diapatch(),父组件events事件
[http://v1-cn.vuejs.org/guide/components.html#自定义事件](http://v1-cn.vuejs.org/guide/components.html#自定义事件)


# 发布vue项目

```bash
npm run build
```

如果出现页面没有内容，反而出现以下4条错误的解决办法是

`GET http://localhost/static/css/app.b67f9407924deaaf6b09c0a6333f4cf5.css `


解决：更改config/index.js 中的参数

`assetsPublicPath:'/' `改成`assetsPublicPath:'./'`

