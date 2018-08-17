<font color="#4590a3" size = "5px">慕课网vue2.0实现购物车和地址选配功能</font>


<font color="#4590a3" size = "4px">河畔一角</font>
[TOC]
# Vue介绍
渐进式JavaScript 框架

+ 1.易用
+ 2.灵活	
	- 声明式渲染	 
	- 组件系统	
	- 客户端路由	
	- 大规模状态管理	
	- 构建工具	
+ 3.性能	
	- 17kb min+gzip 运行大小	
	- 超快虚拟 DOM 	
	- 最省心的优化	

# 项目结构
- checkout-vue2
	+ cart.html
	+ css
		* style.css
	+ js
		* cart.js
		* vue.js
		* vue-resource.js
	+ data
		* cartData.json

## 列表渲染
cart.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>创建第一个 Vue 应用</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.3.3/vue.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue-resource/1.3.3/vue-resource.min.js"></script>
    <script src="js/cart.js"></script>
</head>
<body>
    <div id="app">
   		<div class="checkout-title">
   			购物车
   		</div>
   		<ul>
   			<li>商品信息</li>
   			<li>商品金额</li>
   			<li>商品数量</li>
   			<li>总金额</li>
   			<li>编辑</li>
   		</ul>
   		<ul class="cart-item-list">
   			<li v-for="item in productList">
	            <div class="cart-tab-1">
	                <div class="item-include">
	                    <dl>
	                        <dt>赠送</dt>
	                        <dd v-for="part in item.parts">                       	 	{{part.partsName}}
	                        </dd>
	                    </dl>
	                </div>
	            </div> 
	            <div class="cart-tab-2"></div> 
	            <div class="cart-tab-3"></div> 
	            <div class="cart-tab-4"></div>      
	            <div class="cart-tab-5"></div>      
            </li>
        </ul>
    </div>

</body>
</html>
```
### v-for 嵌套循环

* 外层 `<li v-for="item in productList">`
* 内层 `<dd v-for="part in item.parts"> `

cartData.json
```json
{
	"status": 1,
	"result": {
		"totalMoney": 59,
		"list": [
			{
				"productId": "111111",
				"productName": "黄鹤楼香烟",
				"productPrice": 19,
				"procuctQuentity": 1,
				"productImage": "img/goods-1.jpg",
				"parts": [
					{
						"partsId": 10001,
						"partsName": "打火机"
					}
				]
			},
			{
				"productId": "222222",
				"productName": "加多宝",
				"productPrice": 8,
				"procuctQuentity": 5,
				"productImage": "img/goods-2.jpg",
				"parts": [
					{
						"partsId": 20001,
						"partsName": "吸管"
					}
				]
			}
		]
	},
	"message": ""
}
```

cart.js
```js
var vm = new Vue({
    el:'#app',
    data: {
        message:'Hello World!',
        totalMoney: 0,
        productList: []
    },
    mounted: function(){
    	this.createView()
    },
    methods: {
    	createView: function() {
            var _this = this;
    		this.$http.get("data/cartData.json",{"id":123}).then(function(res){
    			_this.productList = res.body.result.list;
                _this.totalMoney = res.body.result.totalMoney;
    		})
    	}
    }
});
```

```js
 mounted: function(){
    	this.createView()
    }
```

vue2 中的生命周期钩子函数mounted，类似jqury中的ready，也是Vue1中ready的替换。

[https://cn.vuejs.org/v2/guide/instance.html#生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#生命周期图示)

为了[保证实例插入文档](https://cn.vuejs.org/v2/guide/migration.html#ready-替换)，可以用vm替换this使用，修正以上函数
```js
mounted: function(){
        this.$nextTick(function(){
            vm.createView();
        })
    }
```

```js
methods: {
	createView: function() {
	   var _this = this;
	   this.$http.get("data/cartData.json",{"id":123}).then(function(res){
			_this.productList = res.body.result.list;
			_this.totalMoney = res.body.result.totalMoney;
		})
	}
}
```
需要注意`var _this = this` , `res.body` 中的才是data.json中的数据。


### es6写法，箭头函数，`this`新指向
```js
createView: function() {
  this.$http.get("data/cartData.json",{"id":123}).then((res)=>{
      this.productList = res.body.result.list;
      this.totalMoney = res.body.result.totalMoney;
  })
}
```
## 过滤器使用
### 局部过滤
new Vue 实例中使用
如何定义filter
```js
var vm = new Vue({
    el:'#app',
    filters: {
        formatMoney: function(value) {
            return "￥" + value.toFixed(2)
        }
    }
})
```
如何使用filter
```html
<div class="item-price">{{item.productPrice | formatMoney}}</div>
```

### 全局过滤器
全部都能使用
```js
Vue.filter("money",function(value,type){
    return "￥" + value.toFixed(2) + type
})
```
回调函数可接收第二个或更多参数，区别于Vue1过滤器的写法
使用
```html
 <div class="item-price-total">{{item.productPrice | money("元")}}</div>
```

## 商品数量加减
```html
<a href="javascript:;" @click="changeMoney(item,-1)">-</a>
<input type="text" value="0" v-model="item.procuctQuentity" disabled>
<a href="javascript:;" @click="changeMoney(item,1)">+</a>
```
```js
methods: {
	changeMoney: function (product,way) {
       if(way>0)
       {
           product.procuctQuentity++;
       }
       else{
           product.procuctQuentity--;
           if(product.procuctQuentity<1){
               product.procuctQuentity=1;
           }
       }
       this.calcTotalPrice();
   }
}
```
## 选择一个商品
```html
<a href="javascript:;" class="item-check-btn" :class="{'selectme':item.checked}" @click="selectItem(item)">选择</a>
```
当data.json中的item里并没有`checked`字段时,该如何新增
```js
methods: {
    selectItem: function(item) {
       if(typeof item.checked == "undefined") {
           //Vue.set(item,"checked",true);//全局注册checked
           this.$set(item,"checked",false)//局部注册checked

       } 
       item.checked = !item.checked
       this.calcTotalPrice();
   }
}
```
## 全选/取消全选
```html
<a href="javascript:;" @click="checkAll" :class="{'selectme':checkAllFlag}">全选</a>
```
```js
methods: {
    checkAll: function() {
       var _this = this;
       var checkAllFlag = this.checkAllFlag;

       if(checkAllFlag) {
           this.productList.forEach(function(item,index){
               _this.$set(item,"checked",false)
           });
       }else{
           this.productList.forEach(function(item,index){
               _this.$set(item,"checked",true)
           }); 
       }
       this.checkAllFlag =! this.checkAllFlag
       this.calcTotalPrice();
   }
}
```
## 计算总价
```html
总价:<span class="total-price">{{totalCheckMoney}}</span>
```

```js
methods: {
	calcTotalPrice: function() {
       var _this = this;
       this.totalCheckMoney = 0;
       this.productList.forEach(function(item,index){
           if(item.checked) {
               _this.totalCheckMoney += item.productPrice * item.procuctQuentity
           }
       })  
   }
}
```
每次选择商品，全选，增减商品数量后都要调用此方法，更新总价

## 删除商品
### 删除简版
```html
<li v-for="(item,index) in productList">
	......
		<a href="javascript:;" @click="deleteItem(index)">删除</a>
```
vue2已经不能用$index,带索引循环`(item,index) in productList`
```js
methods: {
	deleteItem: function(index) {
       this.productList.splice(index,1);
       this.calcTotalPrice();
   }
}
```
### 弹窗询问是否删除
```html
<a href="javascript:;" @click="delConfirm(item)">删除</a>
......
<div class="md-modal modal-msg md-modal-translation" id="showModal" v-show="showFlag">
  <div class="md-modal-inner">
      <div class="md-top">
          <button class="md-close" @click="closePop">关闭</button>
      </div>
      <div class="md-content">
          <div class="confirm-tips">
              <p id="cusLanInfo">你确定删除此订单信息吗？</p>
          </div>
          <div class="btn-wrap col2">
              <div class="button btn btn-m" id="btnModalConfirm" @click="delProduct">Yes</div>
              <div class="button btn btn-m btn-red" id="btnModalCancel" @click="closePop">No</div>
          </div>
      </div>
  </div>
</div>
```
```js
data: {
    ...
   showFlag:false,
   curProduct: ''
},
...
methods: {
    delConfirm: function(item) {
       this.showFlag = true;
       this.curProduct = item;  
   },
   closePop: function() {
       this.showFlag = false
   },
   delProduct: function() {
       var index = this.productList.indexOf(this.curProduct);
       this.productList.splice(index,1);
       this.showFlag = false
       this.calcTotalPrice();
   }
}
```
# 地址列表
## 通过v-for指令渲染地址数据以及数组过滤 

[替换 limitBy 过滤器](https://cn.vuejs.org/v2/guide/migration.html#插入文本之外的过滤器-移除)

显示三条数据
```html
<li v-for="(item,index) in filterAddress">
```
```js
computed: {
   filterAddress: function(){
       return this.addressList.slice(0,3)
   }
}
```
加载全部数据
```html
<a href="javascript:;" class="addr-more-btn" @click="loadMore">more</a>
```
```js
    data: {
        addressList: [],
        limitNum: 3
    },
    methods: {
        loadMore: function() {
            this.limitNum = this.addressList.length 
        }
    },
    computed: {
        filterAddress: function(){
            return this.addressList.slice(0,this.limitNum)
        },
        
    }
```
或者
```html
<a href="javascript:;" class="addr-more-btn" @click="limitNum = addressList.length">more</a>
```
> HTML页面视图的指令中不能使用 `this`

## 地址卡片选择
```html
<li v-for="(item,index) in filterAddress" :class="{'checkme': index == currentIndex }" @click="currentIndex = index">
```
```js
data: {
   addressList: [],
   limitNum: 3,
   currentIndex: 0
},
```
### 设为默认
法一，利用index
```html
<a href="javascript:;" class="addr-set-default-btn" @click="setDefault(index)">设为默认</a>
```
```js
methods: {
	setDefault: function(index) {
      this.addressList.forEach(function(item,index){
           item.isDefault = false;
       })
       this.addressList[index].isDefault = true;
   }
}
```
法二，利用每个item.addressId
```html
<a href="javascript:;" class="addr-set-default-btn" @click="setDefault(item.addressId)">设为默认</a>
```
```js
methods: {
	setDefault: function(addressId) {
      this.addressList.forEach(function(item,index){
           if(item.addressId == addressId) {
               item.isDefault = true;
           }else{
               item.isDefault = false;
           } 
       })
   }
}
```
### 移入li显示设为默认btn,移出不显示btn
```css
.addr-list li a.addr-set-default-btn {
	display:none;
}
.addr-list li:hover a.addr-set-default-btn {
	display: block;
}
```
### 配送方式
两种方式的切换
```html
<ul>
    <li :class="{'checkme': shippingMethod == 1 }" @click="shippingMethod = 1">
        <div class="name">标准配送</div>
        <div class="price">free</div>
    </li>
    <li :class="{'checkme': shippingMethod == 2 }" @click="shippingMethod = 2">
        <div class="name">高端配送</div>
        <div class="price">180</div>
    </li>
</ul>
```
```js
data: {
   shippingMethod:1
},
```

