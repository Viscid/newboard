<template>
  <form id="composerForm" @submit.prevent="submitPost">
    <span class="editing">
    <textarea ref="postTextarea" class="postTextarea" v-model="postMessage"></textarea>
    <transition name="formatting-preview">
        <formattedMessage v-if="hasFormatting" :formattedMessage="fMessage"></formattedMessage>
    </transition>
    </span>    
    <input class="postButton" type="submit" />
  </form>
</template>

<script>
import formattedMessage from './formattedMessage'
import FormattedMessage from '../../../helpers/formattedMessage'
import tags from '../../../config/tags'

export default {
  data () {
    return {
      postMessage: ''
    }
  },
  components: { formattedMessage },
  created () {
    this.postMessage = this.$store.state.postMessage || ''
  },
  mounted () {
    this.$refs.postTextarea.focus()
  },
  computed: {
    fMessage () {
      let formattedMessage = new FormattedMessage(tags, this.postMessage || '')
      return formattedMessage.formattedMessage
    },
    hasFormatting () {
      return tags.some((tag) => {
        return (this.postMessage.search(tag.match) >= 0)
      })
    }
  },
  beforeDestroy () {
    this.$store.dispatch('stashPostMessage', {message: this.postMessage})
  },
  methods: {
    submitPost () {
      const post = {
        message: this.postMessage
      }

      this.$store.dispatch('submitPost', post).then(() => {
        this.postMessage = ''
        this.$router.push('/')
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}

</script>

<style scoped>

  .formattedMessage.formatting-preview-enter {
    height: 1px;
  }

  .formattedMessage.formatting-preview-enter-active {
    transition: height 1.5s ease;
  }

  .editing {
    text-align: left;
  }

  h3 {
    margin-bottom: 1em;
  }

  textarea {
    display: block;
    border: 0;
    padding: 15px;
    width: 95%;
    font-size: 1.25em;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    outline: none;
    height: 30vh;
  }

  .formattedMessage {
    padding: 15px;
    text-align: left;
    margin: 1em 0 2em 0;
    height: 30vh;
  }

  #composerForm {
    text-align: center;
  }

  .postButton {
    background-color: #aa4439;
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
    background-color: #aa4439;
  }

</style>
