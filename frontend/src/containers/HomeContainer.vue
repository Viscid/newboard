<template>
    <div id="homeContainer">
        <paginator :length="threads.length" :page="page" :pageSize="15" action="setPage"> </paginator>
        <postList :loggedIn="loggedIn" :threads="threads" :isAdmin="isAdmin"> </postList>
        <paginator v-show="threads.length" :length="threads.length" :page="page" :pageSize="15" action="setPage"> </paginator>
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
