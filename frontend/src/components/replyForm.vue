<template>
    <form @submit.prevent="submitReply">
      <textarea ref="replyTextarea" v-model="replyMessage"> </textarea>
      <input class="replyFormSubmit" type="submit" value="Reply" />
    </form>
</template>

<script>
export default {
  data () {
    return {
      replyMessage: undefined
    }
  },
  mounted () {
    this.$refs.replyTextarea.focus()
  },
  methods: {
    submitReply () {
      this.$store.dispatch('submitPost', {
        message: this.replyMessage,
        parentId: this.parentId
      }).then(() => {
        this.$router.push('/')
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  props: ['parentId']
}
</script>

<style scoped>
  textarea {
    display: block;
    height: 200px;
    width: 100vw;
    max-width: 100%;
    margin-bottom: 2em;
    outline: none;
    border: none;
    font-size: 1.2em;
    font-family: inherit;
  }

  .replyFormSubmit {
    max-width: 100%;
    width: 100vw;
    background-color: #aa4439;
    cursor: pointer;
    color: white;
    border: 0;
    font-weight: bold;
    height: 50px;
    font-size: 1.2em;
    margin: 0;
    padding: 0;
  }

  .replyFormSubmit:hover {
    background-color: #ff6666;
  }  
</style>
