<template>
    <div id="ProfileContainer">
        <h2> {{ username }} </h2>
    </div>
</template>

<script>
export default {
  name: 'ProfileContainer',
  data () {
    return {
      username: this.$route.params.username
    }
  },
  created () {
    this.$store.dispatch('fetchProfile', this.username)
  }
}
</script>

<style scoped>
  #ProfileContainer {
    margin: 1em;
  }

h2 {

}
</style>
