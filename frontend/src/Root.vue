<template>
  <div id="root">
    <menuBar :newPosts="newPosts"></menuBar>
    <router-view class="activeView"></router-view>
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
      }).length
    }
  },
  created () {
    this.$store.dispatch('loginUser', {}).then(() => {
      this.$socket.emit('login', this.$store.state.user.token)
    }).catch(() => { console.log('No session found.') })
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

ul {
  list-style: none;
}

input { /* iOS rounded input button fix */
  -webkit-border-radius: 0; 
  border-radius: 0;
}

.activeView {
  padding: 50px 7px 1em 7px;
}

.noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */   
}
</style>
