<template>
    <div id="homeContainer">
        <paginator> </paginator>
        <postList :loggedIn="loggedIn" :threads="threads"> </postList>
    </div>
</template>

<script>
import postList from '../components/postList'
import paginator from '../components/paginator'

export default {
  name: 'HomeContainer',
  components: { postList, paginator },
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
