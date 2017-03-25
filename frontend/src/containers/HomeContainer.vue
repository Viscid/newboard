<template>
    <div id="homeContainer">
        <postList :posts="posts"> </postList>
    </div>
</template>

<script>
import postList from '../components/postList'

export default {
  name: 'HomeContainer',
  components: {
    postList
  },
  created () {
    this.$store.dispatch('getPosts')
    this.$store.dispatch('setStatus', 'Getting posts.')
  },
  computed: {
    posts () {
      return this.$store.state.posts
    }
  }
}
</script>

<style>

</style>
