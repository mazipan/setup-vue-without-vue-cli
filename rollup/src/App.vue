<template>
  <div 
    id="app" 
    class="app">

    <h1>Welcome to Vue</h1>
    <h2>{{ message }}</h2>

    <footer>
      <p>Copyright © 2018 <a href="https://mazipanneh.com/blog/">Irfan Maulana</a>, All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      message: 'Hello World!!!'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>

