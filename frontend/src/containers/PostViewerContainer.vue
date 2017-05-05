<template>
    <div id="postViewerContainer">
        <postList :loggedIn="loggedIn" :threads="thread"> </postList>
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
    thread () { return this.$store.state.posts.threads }
  }
}
</script>

<style scoped>
  #postViewerContainer {
    margin: 20px 0;
  }

</style>
