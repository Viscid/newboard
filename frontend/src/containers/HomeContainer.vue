<template>
    <div id="homeContainer">
        <paginator :page="page" action="setPage"> </paginator>
        <postList :loggedIn="loggedIn" :threads="threads" :isAdmin="isAdmin"> </postList>
    </div>
</template>

<script>
import postList from '../components/postList'
import paginator from '../components/paginator'

export default {
  name: 'HomeContainer',
  components: { postList, paginator },
  beforeCreate () {
    this.$store.dispatch('getThreads')
  },
  computed: {
    loggedIn () { return ('username' in this.$store.state.user) },
    isAdmin () { return (this.$store.state.user['role'] === 'admin') },
    threads () { return this.$store.state.threads },
    page () { return this.$store.state.page }
  }
}
</script>
