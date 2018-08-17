<template>
  <div id="app">
    <!--<img src="./assets/logo.png">
    <router-view></router-view>-->
  <v-header :seller="seller"></v-header>
  <div class="tab border-1px">
    <router-link :to="{ name: 'goods' }" tag="div" class="tab-item" active-class="active">商品</router-link>
    <router-link :to="{ name: 'ratings' }" tag="div" class="tab-item" active-class="active">评论</router-link>
    <router-link :to="{ name: 'seller' }" tag="div" class="tab-item" active-class="active">商家</router-link>
  </div>
  <div class="content">
    <keep-alive>
        <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
  </div>
</template>

<script>
import Header from './components/header/header';
import {urlParse} from './common/js/util';
const ERR_OK = 0;
export default {
  name: 'app',
  components: {
    'v-header': Header
  },
  // created() {
  //   this.$http.get('/api/goods')
  //   .then((res) => {

  //   }, (error) => {

  //   });
  // },
  created() {
    this.$http.get('/api/seller?id=' + this.seller.id)
    .then((res) => {
      res = res.data;
      if (res.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, res.data);
      }
    });
  },
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    };
  }

};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "./common/stylus/mixin.styl"
#app
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    // border-bottom: 1px solid rgba(7,17,27,0.1)
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex: 1
      text-align: center
      font-size: 14px
      color: rgb(77,85,93)
    .active
      color: rgb(240,20,20)
</style>
