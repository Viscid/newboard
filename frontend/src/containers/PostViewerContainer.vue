<template>
    <div id="postViewerContainer">
        <postList :loggedIn="loggedIn" :posts="thread" :isAdmin="isAdmin" :settings="settings"> </postList>
    </div>
</template>

<script>
import postList from '../components/postList'

export default {
  name: 'PostViewerContainer',
  components: { postList },
  data () {
    return {
      slug: this.$route.params.slug
    }
  },
  created () {
    this.$store.dispatch('getThreadBySlug', this.slug)
  },
  computed: {
    loggedIn () { return ('username' in this.$store.state.user) },
    thread () { return ('_id' in this.$store.state.activeThread) ? [this.$store.state.activeThread] : [] },
    isAdmin () { return (this.$store.state.user['role'] === 'admin') },
    isMod () { return (this.$store.state.user['role'] === 'mod') },
    settings () { return this.$store.state.settings }
  },
  destroyed () {
    this.$store.dispatch('clearPostViewer')
  }
}
</script>

<style>
#postViewerContainer {
  padding: 50px 1em 1em 0.5em;
  padding-top: calc(50px + 2em)
}
</style>
