<template>
    <form @submit.prevent="submitReply">
      <textarea 
        ref="replyTextarea"
        @keydown.ctrl.enter="submitReply"
        v-model="replyMessage"
        placeholder="yeah bro"> </textarea>
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
    box-sizing: border-box;
    display: block;
    width: 100vw;
    height: 300px;
    max-width: 100%;
    border: 0;
    border-top: 1px dashed #AAA;
    margin-top: 1em;
    margin-bottom: 2em;
    padding: 0.5em 1em;
    outline: none;
    font-size: 1.2em;
    font-family: inherit;
  }

  .replyFormSubmit {
    display: block;
    background-color: #aa4439;
    cursor: pointer;
    color: white;
    border: 0;
    font-weight: bold;
    height: 50px;
    font-size: 1.2em;
    margin: 0 auto;
    padding: 0;
    width: 300px;
  }

</style>
