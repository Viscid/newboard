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
  data () {
    return {
      page: Number(this.$route.query.page) || 1
    }
  },
  methods: {
    setPage (page) {
      this.$router.push({ path: '/', query: { page } })
    }
  },
  beforeUpdate () {
    let page = Number(this.$route.query.page)
    if ((page > 0) && (page !== this.page)) {
      this.page = page
      this.$store.dispatch('getThreads', this.page)
    }
  },
  created () {
    this.$store.dispatch('getThreads', this.page)
  },
  computed: {
    loggedIn () { return ('username' in this.$store.state.user) },
    isAdmin () { return (this.$store.state.user['role'] === 'admin') },
    threads () { return this.$store.state.threads }
  }
}
</script>
