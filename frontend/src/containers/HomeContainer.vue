<template>
    <div id="homeContainer">
        <paginator :length="threads.length" :page="page" :pageSize="15" @pageChange="setPage"> </paginator>
        <postList :loggedIn="loggedIn" :threads="threads" :isAdmin="isAdmin"> </postList>
        <paginator v-show="threads.length" :length="threads.length" :page="page" :pageSize="15" @pageChange="setPage"> </paginator>
    </div>
</template>

<script>
import postList from '../components/postList'
import paginator from '../components/paginator'

export default {
  name: 'HomeContainer',
  components: { postList, paginator },
  methods: {
    setPage (page) {
      this.$store.dispatch('setPage', page)
      this.$router.push({to: 'Home', query: { page }})
    }
  },
  beforeCreate () {
    if ('page' in this.$route.query) {
      this.$store.dispatch('setPage', Number(this.$route.query.page)).then(() => {
        this.$store.dispatch('getThreads')
      })
    } else this.$store.dispatch('getThreads')
  },
  computed: {
    page () { return this.$store.state.page },
    loggedIn () { return ('username' in this.$store.state.user) },
    isAdmin () { return (this.$store.state.user['role'] === 'admin') },
    threads () { return this.$store.state.threads }
  }
}
</script>
