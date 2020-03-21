<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>我是默认字体大小12px</div>
    <p class="test">我来测试15px = 0.2rem</p>
    <p class="test2">我来测试75px = 1rem</p>
    <p class="test3">当不需要px转换成rem的时候,font-size: 24px; /* no*/</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test {
  font-size: 15px;
  color: red;
}
.test2 {
  font-size: 75px;
  color: blue;
}
.test3 {
  font-size: 24px; /* no*/
  color: blue;
}
</style>
