<template>
  <div id="root">
    <div id="menuBar"> 
      <a href="/login"> Login </a>
      <a href="/registration"> Register </a>
      <a href="/"> Home </a>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'root'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
