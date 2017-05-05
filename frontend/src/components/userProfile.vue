<template>
    <div>
        <h3> Username </h3>
        <p> {{ user.username }} </p>
    </div>
</template>

<script>
  export default {
    name: 'userProfile',
    computed: {
      user () {
        return this.$store.state.user
      }
    }
  }
</script>

<style scoped>

h3 {
  margin: 0;
}

</style>
