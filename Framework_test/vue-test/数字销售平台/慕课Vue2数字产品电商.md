<font color="#4590a3" size = "6px">慕课网vue2.0数字产品电商平台</font>

<font color="#4590a3" size = "6px">TODOList -- fishenal</font>

[TOC]
# Vue 三个特点
- 1. 响应式-双向绑定
- 2. 组件化-模块化
- 3. 单文件组件-js,css,html 存在于一个文件内
	+ 3.1 样式作用域		
`<style scoped></style>`
	+ 3.2 预加载器	
`<template lang='jade'></template>`
`<style lang='less'></style>`

## 组件
### 全局注册
```
Vue.component('my-header',{
	template: '',
	data:
})
```
相当于
```
Vue.component('my-header',new Vue({}))
```
使用：
```
<div id="app">
  <my-header><my-header>
</div>
```

### 局部注册
```
var myHeader = {
	template: '',
	components: {
		'my-header-child':myHeaderChild
	},
	data: function() {
		return {
			f: 1
		}
	}
};

new Vue({
	el: '#app',
	data: {
		word: ''
	},
	components: {
		'my-header':myHeader
	}
});
```
注意子组件data赋值时用function，不要直接引用赋值，避免多个子组件共用的情况

## 文本渲染
### v-html、v-text
使用注意：不能在属性值中使用
例如
```html
<div title="{{hello}}">

</div>
```
这样在Vue2.0中是不允许的
但是可以这样用
```html
<div :title="hello">

</div>
```
v-text的简写法{{}},里面可以运算或写表达式
```
{{ num + 1 }}
{{ status ? "success" : "false" }}
```

## 引入子组件
1.引入模块
```
import componentA from './components/a'
```
2.注册
```
export default{
	components: {componentA}
}
```
ES6缩写法，等价于以下
```
export default{
	components: {componentA:componentA}
}
```
3.使用
```
<componentA><componentA>
```
vue2.0不在区分<componentA>与<component-a>
html标签不区分大小写
但是推荐中线形式，还有属性的写法，也是不支持大写的

## 修改data
有两种方法修改data.list不会触发视图
1，修改list长度，
`vm.items.length = newLength`
2，用索引修改某一项
`vm.items[indexOfItem] = newValue`

解决办法,使用Vue.set
```
Vue.set(example.item,indexOfItem,newValue)
```

## [计算属性](https://vuefe.cn/v2/guide/computed.html)

### 计算缓存 vs Methods
计算属性是基于它的依赖缓存

## 组件
[DOM 模版解析说明](https://cn.vuejs.org/v2/guide/components.html#DOM-模版解析说明)

`<p is="com-a"></p>`
动态组件
```
<p :is="currentView"></p>
import ComA from './components/a';
export default {
	components:{ComA}
	data(){
		return {
			currentView: 'com-a'
		}
	}
}
```

## slot插槽传递模板
显示父组件中的内容
[单个slot](https://cn.vuejs.org/v2/guide/components.html#单个-Slot)
[具名slot](https://cn.vuejs.org/v2/guide/components.html#具名-Slot)

# 过度
## [css动画](https://vuefe.cn/v2/guide/transitions.html#CSS-过渡)
[过渡的-CSS-类名](https://vuefe.cn/v2/guide/transitions.html#过渡的-CSS-类名)
```
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
</head>
<body>
    <div id="app">    
        <button @click="showme = !showme">toggle</button>
        <transition name="fade">
            <p v-if="showme">
                {{ message }}
            </p>
        </transition>
    </div>

<script>
new Vue({
    el:'#app',
    data: {
        showme: true,
        message:'Hello World!'
    }
});
</script>
```
## [js动画](https://vuefe.cn/v2/guide/transitions.html#JavaScript-钩子)

# [自定义指令](https://vuefe.cn/v2/guide/custom-directive.html)

# mixins

# 插件

# vue-cli优势
成熟的 vue 项目架构设计
本地测试服务器
集成打包上线方案

# vue-router
## 引入
定义组件，这里使用从其他文件import进来
```
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Apple from '@/components/apple'
import Banana from '@/components/banana'
```

`Vue.use(VRouter);`

创建 router 实例，然后传 routes 配置

```
let router = new VRouter({	  
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/apple',
      component: Apple
    },
    {
      path: '/banana',
      component: Banana
    }
  ]
});
```
vue-router 默认 hash 模式`#`,如果不想要很丑的 hash，我们可以用路由的 history 模式。

创建和挂载根实例。通过 router 配置参数注入路由，从而让整个应用都有路由功能
`new Vue({ router: router })`

页面上渲染位置
```
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
```

## [\<router-link\>](http://router.vuejs.org/zh-cn/)

```
<router-link :to="{path: 'apple'}">apple</router-link>
<router-link :to="{path: 'banana'}">banana</router-link>
```
渲染结果
```
<a href="/apple">apple</a>
```
\<router-link>
```
<!-- 字符串 -->
<router-link to="home">Home</router-link>
<!-- 渲染结果 -->
<a href="home">Home</a>

<!-- 使用 v-bind 的 JS 表达式 -->
<router-link v-bind:to="'home'">Home</router-link>

<!-- 不写 v-bind 也可以，就像绑定别的属性一样 -->
<router-link :to="'home'">Home</router-link>

<!-- 同上 -->
<router-link :to="{ path: 'home' }">Home</router-link>

<!-- 命名的路由 -->
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>

<!-- 带查询参数，下面的结果为 /register?plan=private -->
<router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>

```

## [路由参数](http://router.vuejs.org/zh-cn/essentials/dynamic-matching.html)
```
export default new Router({
  routes: [
    {
      path: '/apple/:color',
      component: Apple
    }
  ]
})
```
```
<p>{{$route.params.color}}</p>
methods: {
    getparam() {
      console.log(this.$route.params)
    }
  }
```
`/apple/:color` 只能匹配 `http://localhost:8080/apple/red` 这种形式，
如果缺少color参数`http://localhost:8080/apple/`则无法跳转到Apple页面

`this.$route.params` 得到 `Object {color: "red"}`

## [嵌套路由](http://router.vuejs.org/zh-cn/essentials/nested-routes.html)

```
export default new Router({
  routes: [
    {
      path: '/apple',
      component: Apple,
      children:[
      	{
      		path: 'red',
      		component:RedApple
      	}
      ]
    }
  ]
})
```
在apple.vue中加入router-view
```
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-view></router-view>
  </div>
</template>
```

```html
<router-link :to="{path: 'apple/red'}">to apple red</router-link>
```

## [命名路由](http://router.vuejs.org/zh-cn/essentials/named-routes.html)

## [命名视图](http://router.vuejs.org/zh-cn/essentials/named-views.html)

## [重定向](http://router.vuejs.org/zh-cn/essentials/redirect-and-alias.html)

## [过度动效](http://router.vuejs.org/zh-cn/advanced/transitions.html)

# vuex

## [vuex原理](https://github.com/vuejs/vuex)

保持单向数据流

## [vuex实例](http://vuex.vuejs.org/zh-cn/structure.html)

1.	应用层级的状态应该集中到单个 store 对象中。 
2.	提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。 
3.	异步逻辑都应该封装到 action 里面。


```
<!--app.vue-->
总价：{{totalPrice}}
<apple></apple>
<banana></banana>
    
import Apple from '@/components/apple'
import Banana from '@/components/banana'

export default {
  computed:{
    totalPrice(){
      return this.$store.state.totalPrice
    }
  },
  components: { ComponentA ,Apple,Banana}
}
```

```
<!--main.js-->
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
	state: {
		totalPrice: 0
	},
	mutations: {
		increment(state,price){
			state.totalPrice += price; 
		},
		decrement(state,price){
			state.totalPrice -= price;
		}
	},
	actions: {
		increase(context,price){
			context.commit('increment',price)
		}
	}
})

new Vue({
  el: '#app',
  store,
  components: { App }
})
```

```
<!--banana.vue-->
<button @click="addOne">add one</button>
<button @click="minusOne">minus one</button>
 export default {
  data () {
    return {
      msg: 'i am an banana',
      price: 15
    }
  },
  methods: {
    addOne() {
      this.$store.commit('increment',this.price)
    },
    minusOne() {
      this.$store.commit('decrement',this.price)
    }
  }
}
```

```
<!--apple.vue-->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="addOne">add one</button>
    <button @click="minusOne">minus one</button>
  </div>
</template>

export default {
  data () {
    return {
      msg: 'i am an apple',
      price: 5
    }
  },
  methods: {
    addOne() {
      this.$store.dispatch('increase',this.price)
    },
    minusOne() {
      this.$store.commit('decrement',this.price)
    }
  }
}
```


# [vue-resource](https://github.com/pagekit/vue-resource)实现Ajax获取信息数据
```js
import VueResource from 'vue-resource'
Vue.use(VueResource);

created: function() {
    this.$http.get('url')
    .then(function(res){
      console.log(res.body)//成功
    },function(err){
      console.log(err)// 错误
    })
  },
```
# [json-server](https://github.com/typicode/json-server)模拟数据

1.先在项目里安装
```
cnpm install json-server --save
```

2.在配置build/dev-server.js中添加    
 
```js
app.use(staticPath, express.static('./static'))

//add start
var jsonServer = require('json-server')
const apiServer = jsonServer.create()
// 这里的 db.json 是和 index.html 同级的
const apiRouter = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

apiServer.use(middlewares)
apiServer.use('/api',apiRouter)
apiServer.listen(port+1, () => {
  console.log('JSON Server is running')
})
//add end

var uri = 'http://localhost:' + port

```    
3.重新启动`npm run dev`,打开浏览器[http://localhost:8081/](http://localhost:8081/)

4.添加代理 config/index.js
```
proxyTable: {
	'/api/':'http://localhost:8081/'
}
```
5.使用
```
created: function() {
    this.$http.get('api/getNewsList')
    .then(function(res){
      //console.log(res);
      this.newsList = res.data;
    },function(err){
      console.log(err)
    })
  },
```

想访问[http://localhost:8081/api/getNewsList](http://localhost:8081/api/getNewsList)

# css 超出省略显示
```css
.new-item {
  display: inline-block;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

```

# express来启动我们的apiServer
原因：json-server 只能通过get请求获取数据
首先安装：body-parser
修改dev-server.js
```js
//expressServer start
var apiServer = express()
var bodyParser = require('body-parser')
apiServer.use(bodyParser.urlencoded({ extended: true }))
apiServer.use(bodyParser.json())
var apiRouter = express.Router()
var fs = require('fs')
apiRouter.route('/:apiName')
.all(function (req, res) {
  fs.readFile('./db.json', 'utf8', function (err, data) {
    if (err) throw err
    var data = JSON.parse(data)
    if (data[req.params.apiName]) {
      res.json(data[req.params.apiName])  
    }
    else {
      res.send('no such api name')
    }
    
  })
})


apiServer.use('/api', apiRouter);
apiServer.listen(port + 1, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + (port + 1) + '\n')
})

//expressServer end

```

完整参见[http://blog.csdn.net/weiweismile123/article/details/70210934](http://blog.csdn.net/weiweismile123/article/details/70210934)

# 幻灯片组件

## js中引入图片地址
```
src: require('../assets/slideShow/pic3.jpg'),
```

父组件index.vue
```html
<slideShow :slides="slides" :inv="invTime"></slideShow>

<script>
import slideShow from '../components/slideShow'
export default {
  components: {
    slideShow
  },
  data () {
    return {
      invTime: 2000,
      slides: [
        {
          src: require('../assets/slideShow/pic1.jpg'),
          title: 'xxx1',
          href: 'detail/analysis'
        },
        {
          src: require('../assets/slideShow/pic2.jpg'),
          title: 'xxx2',
          href: 'detail/count'
        },
        {
          src: require('../assets/slideShow/pic3.jpg'),
          title: 'xxx3',
          href: 'http://xxx.xxx.com'
        },
        {
          src: require('../assets/slideShow/pic4.jpg'),
          title: 'xxx4',
          href: 'detail/forecast'
        }
      ],
		}
	}
}
</script>
```

子组件slideShow.vue
```html
<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <a :href="slides[nowIndex].href">
        <img :src="slides[nowIndex].src">
      </a>
    </div>
    <h2>{{ slides[nowIndex].title }}</h2>
    <ul class="slide-pages">
      <li @click="goto(prevIndex)">&lt;</li>
      <li v-for="(item,index) in slides" @click="goto(index)">
         <a :class="{on: index === nowIndex}">{{ index + 1 }}</a>
      </li>
      <li @click="goto(nextIndex)">&gt;</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      default: []
    },
    inv: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      nowIndex: 0
    }
  },
  computed: {
    prevIndex () {
      if(this.nowIndex == 0) {
        return this.slides.length-1
      }else{
        return this.nowIndex-1
      } 
    },
    nextIndex () {
      if(this.nowIndex == this.slides.length-1) {
        return 0
      }else{
        return this.nowIndex+1
      } 
    }
  },
  methods: {
    goto(index) {
      this.nowIndex = index
    },
    runInv() {
      this.invId = setInterval(()=> {
        this.goto(this.nextIndex)
      },this.inv)
    },
    clearInv() {
      clearInterval(this.invId)
    }
  },
  mounted() {
    this.runInv();
  }
}
</script>
```
其中props从父组件传入的值slides，type表示传入数据类型，default默认值

```
 slides: {
	 type: Array,
	 default: []
},
```

## 加上动画效果

```html
<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <a :href="slides[nowIndex].href">
        <transition name="slide-trans">
          <img v-if="isShow" :src="slides[nowIndex].src">
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[nowIndex].src">
        </transition>
      </a>
    </div>
    <h2>{{ slides[nowIndex].title }}</h2>
    <ul class="slide-pages">
      <li @click="goto(prevIndex)">&lt;</li>
      <li v-for="(item,index) in slides" @click="goto(index)">
         <a :class="{on: index === nowIndex}">{{ index + 1 }}</a>
      </li>
      <li @click="goto(nextIndex)">&gt;</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      default: []
    },
    inv: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      nowIndex: 0,
      isShow: true
    }
  },
  computed: {
    prevIndex () {
      if(this.nowIndex == 0) {
        return this.slides.length-1
      }else{
        return this.nowIndex-1
      } 
    },
    nextIndex () {
      if(this.nowIndex == this.slides.length-1) {
        return 0
      }else{
        return this.nowIndex+1
      } 
    }
  },
  methods: {
    goto(index) {
      this.isShow = false
      setTimeout(()=>{
        this.isShow = true
        this.nowIndex = index;
      },10); 
    },
    runInv() {
      this.invId = setInterval(()=> {
        this.goto(this.nextIndex)
      },this.inv)
    },
    clearInv() {
      clearInterval(this.invId)
    }
  },
  mounted() {
    this.runInv();
  }
}
</script>

<style scoped>
.slide-trans-enter-active {
  transition: all .5s;
}
.slide-trans-enter {
  transform: translateX(900px);
}
.slide-trans-old-leave-active {
  transition: all .5s;
  transform: translateX(-900px);
}
<style>
```

# 登录组件
## 三个弹窗关闭按钮，使用方法传参
```html
<li @click="logClick">登录</li>
<li @click="regClick">注册</li>
<li @click="aboutClick">关于</li>

<my-dialog :is-show="isShowAboutDialog" @on-close="closeDialog('isShowAboutDialog')">
    about
</my-dialog>
    
<my-dialog :is-show="isShowLogDialog" @on-close="closeDialog('isShowLogDialog')">
    log
</my-dialog>

<my-dialog :is-show="isShowRegDialog" @on-close="closeDialog('isShowRegDialog')">
    reg
</my-dialog>
```
```js
<script>
import Dialog from './base/dialog';
export default {
  components: {
    myDialog:Dialog
  },
  data () {
    return {
      isShowAboutDialog: false,
      isShowLogDialog: false,
      isShowRegDialog: false
    }
  },
  methods: {
    logClick() {
      this.isShowLogDialog = true
    },
    regClick() {
      this.isShowRegDialog = true
    },
    aboutClick() {
      this.isShowAboutDialog = true
    },
    closeDialog (attr) {
      this[attr] = false
    }
  }
}
</script>
```

最主要的传参
```html
<my-dialog :is-show="isShowLogDialog" @on-close="closeDialog('isShowLogDialog')">
    log
</my-dialog>

```
```js
closeDialog (attr) {
  this[attr] = false
}
```

### 登录框错误信息适合用computed实时计算

```
<input type="text" v-model="usernameModel" placeholder="请输入用户名">
<span class="g-form-error">{{ userErrors.errorText }}</span>

data () {
    return {
      usernameModel: '',
    }
  },
  computed: {
    userErrors() {
      let status,errorText;
      if(!/@/g.test(this.usernameModel)){
        status = false;
        errorText = '不包含@'
      }else{
        status = true;
        errorText = ''
      }
      return {
        status,
        errorText
      }
    } 
  },

```

### 解决开始就报错的问题
设置userFlag和passwordFlag
```
if(!this.userFlag){
   errorText = '';
   this.userFlag = true
 }
```
# detail详情页，添加路由

## 动态路由
detail.vue
```
<router-link v-for="item in products" :to="{ path: item.path }" tag="li" active-class="active">
  {{ item.name }}
</router-link>

...
 products: [
   {
     name: '数据统计',
     path: 'count',
     icon: require('../assets/images/1.png'),
     active: false
   },
]

```

## 获取路由对象
尝试获取以下路由
http://localhost:8080/detail/
```
this.$route.path
```
结果为
`/detail/`

## 图片映射
```
<img :src="productIcon">
...
imgMap: {
   '/detail/count': require("../assets/images/1.png"),
   '/detail/forecast': require("../assets/images/2.png"),
   '/detail/analysis': require("../assets/images/3.png"),
   '/detail/publish': require("../assets/images/4.png")
 }
...
computed: {
    productIcon () {
      return this.imgMap[this.$route.path]
    },
  }
```
## 下拉组件
selection.vue
```js
<template>
    <div class="selection-component">
      <div class="selection-show" @click="toggleDrop">
        <span>{{ selections[nowIndex].label }}</span>
        <div class="arrow"></div>
      </div>
      <div class="selection-list" v-if="isDrop">
        <ul>
          <li v-for="(item, index) in selections" @click="chooseSelection(index)">{{ item.label }}</li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    selections: {
      type: Array,
      default: [{
        label: 'test',
        value: 0
      }]
    }
  },
  data () {
    return {
      isDrop: false,
      nowIndex: 0
    }
  },
  methods: {
    toggleDrop () {
      this.isDrop = !this.isDrop
    },
    chooseSelection (index) {
      this.nowIndex = index
      this.isDrop = false
      this.$emit('on-change', this.selections[this.nowIndex])
    }
  }
}
</script>
```
analysis.vue
```js
import VSelection from '../../components/base/selection'
export default {
  components: {
    VSelection
  },
data () {
    return {
      buyNum: 0,
      buyType: {},

      buyTypes: [
        {
          label: '入门版',
          value: 0
        },
        {
          label: '中级版',
          value: 1
        },
        {
          label: '高级版',
          value: 2
        }
      ]
    }
  }, 
}
```

单选组件chooser.vue
```
<template>
    <div class="chooser-component">
        <ul class="chooser-list">
          <li
          v-for="(item, index) in selections"
          @click="chosenSelection(index)"
          :title="item.label"
          :class="{active:index === nowIndex}"
          >{{ item.label }}</li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    selections: {
      type: Array,
      default: [{
        label: 'test',
        value: 0
      }]
    }
  },
  data () {
    return {
      nowIndex: 0
    }
  },
  methods: {
    chosenSelection (index) {
      this.nowIndex = index
      this.$emit('on-change', this.selections[index])
    }
  }
}
</script>
```

## 多选组件multiplyChooser
```
<template>
    <div class="chooser-component">
        <ul class="chooser-list">
          <li
          v-for="(item, index) in selections"
          @click="toggleSelection(index)"
          :title="item.label"
          :class="{active: checkActive(index)}"
          >{{ item.label }}</li>
        </ul>
      </div>
    </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    selections: {
      type: Array,
      default: [{
        label: 'test',
        value: 0
      }]
    }
  },
  data () {
    return {
      nowIndexes: [0]
    }
  },
  methods: {
    toggleSelection (index) {
      if (this.nowIndexes.indexOf(index) === -1) {
        this.nowIndexes.push(index)  
      }
      else {
        this.nowIndexes = _.remove(this.nowIndexes, (idx) => {
          return idx !== index
        })
      }
      let nowObjArray = _.map(this.nowIndexes, (idx) => {
        return this.selections[idx]
      })
      this.$emit('on-change', nowObjArray)
    },
    checkActive (index) {
      return this.nowIndexes.indexOf(index) !== -1
    }
  }
}
</script>
```
# 总价计算
## 子组件给父组件传递数据
父组件analysis.vue
```
<v-counter @on-change="onParamChange('buyNum', $event)"></v-counter>

methods: {
    onParamChange(attr,val){
      this[attr] = val;
      console.log(attr,this[attr])
    }
  }
```
子组件counter.vue
```
watch: {
    number () {
      this.$emit('on-change', this.number)
    }
  },

```
## 发送购买参数和获取后端总价
```
<script>
import VCounter from '../../components/base/counter'
import VSelection from '../../components/base/selection'
import VChooser from '../../components/base/chooser'
import VMulChooser from '../../components/base/multiplyChooser'
import _ from 'lodash'
export default {
  components: {
    VCounter,
    VSelection,
    VChooser,
    VMulChooser
  },
  data () {
    return {
      buyNum: 0,
      buyType: {},
      versions: [],
      period: {},
      price: 0,
      versionList: [
        {
          label: '客户版',
          value: 0
        },
        {
          label: '代理商版',
          value: 1
        },
        {
          label: '专家版',
          value: 2
        }
      ],
      periodList: [
        {
          label: '半年',
          value: 0
        },
        {
          label: '一年',
          value: 1
        },
        {
          label: '三年',
          value: 2
        }
      ],
      buyTypes: [
        {
          label: '入门版',
          value: 0
        },
        {
          label: '中级版',
          value: 1
        },
        {
          label: '高级版',
          value: 2
        }
      ],
      isShowPayDialog: false,
      bankId: null,
      orderId: null,
      isShowCheckOrder: false,
      isShowErrDialog: false
    }
  },
  methods: {
    onParamChange(attr,val){
      this[attr] = val;
      this.getPrice()
    },
    getPrice() {
      let buyVersionsArray = _.map(this.versions, (item) => {
        return item.value
      });
      let reqParams = {
        buyNumber: this.buyNum,
        buyType: this.buyType.value,
        period: this.period.value,
        version: buyVersionsArray.join(',')
      };
      this.$http.post('/api/getPrice',reqParams).then((res)=>{
        this.price = res.data.amount
      })
    }
  },
  mounted() {
    this.buyNum = 1
    this.buyType = this.buyTypes[0]
    this.versions = [this.versionList[0]]
    this.period = this.periodList[0]
    this.getPrice()
  }
 
}
</script>
```
mounted 初始赋值求得的总价
  `this.versions = [this.versionList[0]]`是为了确保 `_.map(this.versions, 。。。);`map的versions是数组
onParamChange 修改组件重新获取总价

# 选择银行
子组件bankChooser.vue
```js
<template>
  <div class="chooser-component">
    <ul class="chooser-list">
      <li
      v-for="(item, index) in banks"
      @click="chooseSelection(index)"
      :title="item.label"
      :class="[item.name, {active: index === nowIndex}]"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nowIndex: 0,
      banks: [
          {
              id: 201,
              label: '招商银行',
              name: 'zhaoshang'
          },
          {
              id: 301,
              label: '中国建设银行',
              name: 'jianshe'
          },
          {
              id: 601,
              label: '浦发银行',
              name: 'pufa'
          },
          {
              id: 1101,
              label: '交通银行',
              name: 'jiaotong'
          },
          {
              id: 101,
              label: '中国工商银行',
              name: 'gongshang'
          },
          {
              id: 401,
              label: '中国农业银行',
              name: 'nongye'
          },
          {
              id: 1201,
              label: '中国银行',
              name: 'zhongguo'
          },
          {
              id: 501,
              label: '中信银行',
              name: 'zhongxin'
          }
      ]
    }
  },
  methods: {
    chooseSelection (index) {
      this.nowIndex = index
      this.$emit('on-change', this.banks[index])
    }
  }
}
</script>
```
analysis.vue
```js
<bank-chooser @on-change="onChangeBanks"></bank-chooser>
export default {
  components: {
    BankChooser
  },
  data () {
    return {
      bankId: null,
    }
  },
  methods: {
    onChangeBanks(bankObj) {
      this.bankId = bankObj.id;
    }
  },
}
</script>
```
父组件中自定义事件中没参数，则第一个参数代表子组件传回来的参数
父组件中自定义事件中有参数，需要传递$event，事件中第二个参数是子组件传回来的

```
<bank-chooser @on-change="onChangeBanks"></bank-chooser>
onChangeBanks(bankObj) {
  this.bankId = bankObj.id;
}
//////
this.$emit('on-change', this.banks[index])
```
```
<v-counter @on-change="onParamChange('buyNum', $event)"></v-counter>
onParamChange(attr,val){
   this[attr] = val;
   console.log(attr,this[attr])
}
//////
this.$emit('on-change', this.number)
```

## [datepicker日历组件](https://github.com/charliekassel/vuejs-datepicker)

## select组件完善
点击外面的时候让select下拉收起来
使用 [vm.$on()和vm.$emit](https://cn.vuejs.org/v2/api/#vm-on)

eventBus.vue
```
import Vue from 'vue'

const eventBus = new Vue()

export { eventBus }

```

父组件layout.vue
```
<div @click="resetComponent"></div>

import { eventBus } from '../eventBus.js'
methods: {
	resetComponent() {
	 eventBus.$emit('reset-component')
	}
}

```
子组件selection.vue
```
import { eventBus } from '../../eventBus.js'

mounted() {
    eventBus.$on('reset-component',()=>{
      this.isDrop = false
    })
  }

```

当有两个下拉组件时，点击一个收起另外一个
```
methods: {
    toggleDrop (event) {
      eventBus.$emit('reset-component')
      this.isDrop = !this.isDrop
    },
}
```

# vuex在项目中使用
[https://vuex.vuejs.org/zh-cn/](https://vuex.vuejs.org/zh-cn/)

[vuex官方例子](https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart)


在src下components同级新增store目录

- src
	+ main.js
	+ components
	+ pages
		- orderList.vue
	+ router
	+ store
		- index.js
		- modules
			+ orderList.js
			

index.js
```js
import Vuex from 'vuex'  
import Vue from 'vue'
import orderList from './modules/orderList'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        orderList
    }
})
```

main.js
```js
import Vue from 'vue'
import Layout from './components/layout'
import router from './router'
import VueResource from 'vue-resource'
import store from './store/index'

Vue.config.productionTip = false;
Vue.use(VueResource);

new Vue({
  el: '#app',
  router,
  store,
  template: '<Layout/>',
  components: { Layout }
})

```
orderList.vue
```
mounted() {
    this.getList()
    console.log(this.$store)
  }
```

有数据的时候
orderList.js
```js
import Vue from 'vue'
const state = {
    orderList : [],
    params: {}
}

const getters = {
    getOrderList: state => state.orderList
}

const actions = {
    fetchOrderList({commit,state}) {
        Vue.http.post('/api/getOrderList',state.params)
        .then((res) => {
            commit('updateOrderList',res.data.list)
            // state.orderList = res.data.orderList;
            // state.total = res.data.total
        },(err) => {

        })
    }
}
const mutations = {
    updateOrderList(state,payload) {
        state.orderList = payload
    },
    // updateParams(state,payload) {
    //     state.params[payload.key] = payload.val
    // }
    updateParams(state,{key,val}) {
        state.params[key] = val
        console.log(state.params)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
 
```

orderList.vue
```
computed: {
    tableData() {
      return this.$store.getters.getOrderList
    }
  },
  mounted() {
    this.$store.dispatch('fetchOrderList')
    //console.log(this.$store)
  }

```
当改变下拉框和时间的时候也去调用commit和dispatch
```js
methods: {
    productChange(obj) {
      this.$store.commit('updateParams',{
        key: 'productId',
        val: obj.value
      })
      this.$store.dispatch('fetchOrderList')
      // this.productId = obj.value
      // this.getList()
    },
    getStartDate (date) {
      this.$store.commit('updateParams',{
        key: 'startDate',
        val: date
      })
      this.$store.dispatch('fetchOrderList')
      // this.startDate = date
      // this.getList()
    },
    getEndDate (date) {
      this.$store.commit('updateParams',{
        key: 'endDate',
        val: date
      })
      this.$store.dispatch('fetchOrderList')
      // this.endDate = date
      // this.getList()
    },
}
```

