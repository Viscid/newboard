<template>
  <form id="composerForm" @submit.prevent="submitPost">
    <textarea class="postTextarea" v-model="postMessage"> </textarea> <br />
    <input class="postButton" type="submit" />
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
      this.$store.dispatch('submitPost', this.postMessage).then(() => {
        this.$router.push('/')
      })
    }
  }
}

</script>

<style scoped>
  textarea {
    width: 80%;
    height: 300px;
    margin-bottom: 1em;
  }

  #composerForm {
    margin: 1em auto;
    text-align: center;
  }

  .postButton {
    background-color: #4f8ef2;
    cursor: pointer;
    color: white;
    border: 0;
    font-weight: bold;
    padding: 0.5em;
    width: 80%;
  }

</style>
