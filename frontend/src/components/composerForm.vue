<template>
  <form @submit.prevent="submitPost">
    <textarea v-model="postMessage" rows="10" cols="50"> </textarea> <br />
    <input type="submit" />
  </form>
</template>

<script>
export default {
  data () {
    return {
      postMessage: undefined
    }
  },
  methods: {
    submitPost () {
      this.$store.dispatch('submitPost', this.postMessage)
    }
  }
}

</script>

<style>

</style>
