
var vm = new Vue({
    el:'#app',
    data: {
        message:'Hello World!',
        totalMoney: 0,
        productList: [],
        totalCheckMoney:0,
        checkAllFlag:false,
        showFlag:false,
        curProduct: ''
    },
    mounted: function(){
        this.$nextTick(function(){
            this.createView();
        })
    },
    filters: {
        formatMoney: function(value) {
            return "￥" + value.toFixed(2)
        }
    },
    methods: {
    	createView: function() {
            this.$http.get("data/cartData.json",{"id":123}).then((res)=>{
                this.productList = res.body.result.list;
                this.totalMoney = res.body.result.totalMoney;
            })
    	},
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
        },
        deleteItem: function(index) {
            this.productList.splice(index,1);
            this.calcTotalPrice();
        },
        selectItem: function(item) {
            if(typeof item.checked == "undefined") {
                this.$set(item,"checked",false)
            } 
            item.checked = !item.checked
            this.calcTotalPrice();
        },
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
        },
        calcTotalPrice: function() {
            var _this = this;
            this.totalCheckMoney = 0;
            this.productList.forEach(function(item,index){
                if(item.checked) {
                    _this.totalCheckMoney += item.productPrice * item.procuctQuentity
                }
            })  
        },
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
    },
});
Vue.filter("money",function(value,type){
    return "￥" + value.toFixed(2) + type
})
    













