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
  data () {
    return { user: this.$store.state.user }
  },
  beforeCreate () {
    this.$store.dispatch('getPosts')
  },
  computed: {
    loggedIn () { return ('username' in this.$store.state.user) },
    threads () { return this.$store.state.posts.threads }
  }
}
</script>
