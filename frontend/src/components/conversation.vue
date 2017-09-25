<template>
  <div class="conversationContainer">
    <div class="conversationHeader">
      {{ user }}
    </div>
    <div ref="conversationHistory" class="conversationHistory">

      <ul>
        <li :key="message._id" v-for="message in messages">
          <div v-if="messageType(message.author)" :class="{ messageBody: true, mine: true}"> <span class="messageUsername"> {{message.author}} </span> : {{ message.body }} </div>
          <div v-else :class="{ messageBody: true }">  {{ message.body }} : <span class="messageUsername"> {{message.author}} </span> </div> 

        </li>
      </ul>
    </div>

    <textarea size="20" 
    @keypress.enter.prevent="sendMessage"
    class="conversationInput" 
    name="conversationInput" 
    ref="conversationInput"
    v-model="body"> </textarea>
    <button class="conversationSendButton"> Send </button>

  </div>
</template>

<script>
export default {
  data () {
    return {
      body: undefined,
      author: this.$store.state.user.username
    }
  },
  mounted () {
    this.$refs.conversationInput.focus()
    this.$store.dispatch('getPrivateMessages', this.user)
  },
  updated () {
    this.$refs.conversationHistory.scrollTop = this.$refs.conversationHistory.scrollHeight
  },
  props: ['user'],
  methods: {
    sendMessage () {
      if (this.body && this.body.length) {
        this.$store.dispatch('sendPrivateMessage', { body: this.body, recipient: this.user }).then(() => {
          this.body = undefined
        })
      }
    },
    messageType (author) {
      return (author === this.author)
    }
  },
  computed: {
    messages () {
      return this.$store.state.privateMessages.filter((message) => {
        return ((message.author === this.author) && (message.recipient === this.user)) ||
         ((message.author === this.user) && (message.recipient === this.author))
      })
    }
  }

}

</script>

<style>

  .messageBody {
    border: 1px solid grey;
    width: 70%;
    margin: 1em;
    padding: 1em;
    border-radius: 10px;
    float: right;
    text-align: right;
    background-color: #DDEEEE;
  }

  .messageUsername {
    font-weight: bold;
  }

  .mine {
    float: left;
    text-align: left;
    background-color: #EEDDEE;
  }

  .conversationHeader {
    box-sizing: border-box;
    background-color: #aa4439;
    color: white;
    padding: 0.25em 0;
    text-align: center;
    font-weight: bold;
    font-size: 1.1em;
    width: 100%;
  }

  .conversationSendButton {
    display: block;
    height: 30px;
    width: 100%;
    color: white;
    background-color: #aa4439;
    border: 1px solid #aa4439;
  }



  .conversationInput {
    box-sizing: border-box;
    outline: 0;
    border: none;
    border: 1px solid #AAA;
    border-top: 0;
    height: 60px;
    width: 100%;
    font-size: 1.05em;
    overflow-y: auto;
    resize: none;   
    padding: 0.5em;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }

  .conversationHistory {
    box-sizing: border-box;
    height: 500px;
    overflow-y: scroll;
    overflow-x: hidden;
    border: 1px solid #AAA;
    border-bottom: 1px dotted #AAA;
  }

  .conversationContainer {
    margin: 25px auto;
  }

</style>
