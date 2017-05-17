<template>
  <div id="root">
    <menuBar :newPosts="newPosts"></menuBar>
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
    },
    newPosts () {
      return this.$store.state.newPosts.filter((post) => {
        if (!('username' in this.$store.state.user)) return true
        return (post.username !== this.$store.state.user.username)
      })
    }
  },
  created () {
    this.$store.dispatch('loginUser', {})
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
  box-sizing: border-box;
}

input { /* iOS rounded input button fix */
  -webkit-border-radius:0; 
  border-radius:0;
}
</style>
