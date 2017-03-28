<template>
  <form id="composerForm" @submit.prevent="submitPost">
    <textarea ref="postTextarea" class="postTextarea" v-model="postMessage"></textarea>
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
  created () {
    this.postMessage = this.$store.state.postMessage
  },
  mounted () {
    this.$refs.postTextarea.focus()
  },
  beforeDestroy () {
    this.$store.dispatch('stashPostMessage', this.postMessage)
  },
  methods: {
    submitPost () {
      this.$store.dispatch('submitPost', this.postMessage).then(() => {
        this.$router.push('/')
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}

</script>

<style scoped>
  textarea {
    display: block;
    height: calc(100vh - 150px);
    width: 95%;
    border: 0;
    padding: 15px;
    font-size: 1.25em;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    outline: none;
    margin: 0 auto;
  }

  #composerForm {
    text-align: center;
  }

  .postButton {
    background-color: #AA4439;
    cursor: pointer;
    color: white;
    border: 0;
    font-weight: bold;
    height: 50px;
    font-size: 1.2em;
    margin: 0;
    padding: 0;
    width: 300px;
  }

    .postButton:hover {
      background-color: #8c352b;

  }

</style>
