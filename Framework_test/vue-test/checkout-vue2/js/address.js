
var vm = new Vue({
    el:'.container',
    data: {
        message:'Hello World!',
        addressList: [],
        limitNum: 3,
        currentIndex: 0,
        shippingMethod:1
    },
    mounted: function(){
        this.$nextTick(function(){
            this.getAddressList();
        })
    },
    methods: {
    	getAddressList: function() {
            this.$http.get("data/address.json").then((res)=>{
                var res = res.data;
                if(res.status == "0") {
                    this.addressList = res.result;
                }
            })
    	},
        loadMore: function() {
            if(this.limitNum == 3) {
                this.limitNum = this.addressList.length;
            }else{
                this.limitNum = 3;
            }
            
        },
        setDefault: function(addressId) {
            this.addressList.forEach(function(item,index){
                if(item.addressId == addressId) {
                    item.isDefault = true;
                }else{
                    item.isDefault = false;
                } 
            })
        },
        
    },
    computed: {
        filterAddress: function(){
            return this.addressList.slice(0,this.limitNum)
        },
        
    }
});

    













