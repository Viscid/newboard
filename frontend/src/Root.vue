<template>
  <div id="root">
    <menuBar></menuBar>
    <router-view></router-view>
    <statusBar :message="status.message" :visible="status.visible"></statusBar>
  </div>
</template>

<script>
import menuBar from './components/menuBar'
import statusBar from './components/statusBar'

export default {
  name: 'root',
  components: {
    menuBar,
    statusBar
  },
  computed: {
    status () {
      return this.$store.state.status
    }
  }
}
</script>

<style>
#root {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  margin: 0;
}
</style>
