<template>
    <div id="homeContainer">
        <postList :loggedIn="loggedIn" :threads="threads"> </postList>
    </div>
</template>

<script>
import postList from '../components/postList'

export default {
  name: 'HomeContainer',
  components: { postList },
  beforeCreate () {
    this.$store.dispatch('getPosts')
  },
  computed: {
    loggedIn () { return ('username' in this.$store.state.user) },
    threads () { return this.$store.state.posts.threads },
    replies () { return this.$store.state.posts.replies }
  }
}
</script>
