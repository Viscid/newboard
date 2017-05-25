<template>
  <form id="composerForm" @submit.prevent="submitPost">
    <div class="editing">
    <textarea ref="postTextarea" class="postTextarea" v-model="postMessage"></textarea>
    <transition name="formatting-preview">
        <formattedMessage v-if="hasFormatting" :formattedMessage="fMessage" :settings="settings"></formattedMessage>
    </transition>
    </div>    
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
      return tags.some(tag => this.postMessage.search(tag.match) >= 0)
    },
    settings () {
      return this.$store.state.settings
    }
  },
  beforeDestroy () {
    this.$store.dispatch('stashPostMessage', {message: this.postMessage})
  },
  methods: {
    submitPost () {
      const post = { message: this.postMessage }
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
    display: flex;
    height: calc(100vh - 110px);
    flex-direction: column;
  }

  h3 {
    margin-bottom: 1em;
  }

  textarea {
    display: block;
    box-sizing: border-box;
    border: 0;
    padding: 15px;
    font-size: 1.25em;
    width: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    outline: none;
    flex: 2;
  }

  .formattedMessage {
    display: block;
    padding: 15px;
    text-align: left;
    margin: 1em 0 2em 0;
    flex: 3;
  }

  #composerForm {
    text-align: center;
    height: 80vh
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
