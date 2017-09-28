<template>
  <div class="conversationContainer">
    <div class="conversationHeader">
      {{ user }}
    </div>
    <div ref="conversationHistory" class="conversationHistory">

      <ul>
        <li :key="message._id" v-for="message in messages">
          <div v-if="messageType(message.author)" :class="{ messageBody: true, mine: true}">
            <span class="messageUsername"> {{message.author}} </span> : {{ message.body }} 
            <div class="date dateMine"> {{ getDate(message.date_sent, 'DD/MM/YY h:mma') }} </div>
          </div>
          <div v-else :class="{ messageBody: true }">
              {{ message.body }} : <span class="messageUsername"> {{message.author}} </span>
              <div class="date"> {{ getDate(message.date_sent, 'DD/MM/YY h:mma') }} </div>
          </div> 
          
        </li>
      </ul>
    </div>

    <textarea size="20" 
    @keypress.enter.prevent="sendMessage"
    class="conversationInput" 
    name="conversationInput" 
    ref="conversationInput"
    v-model="body"> </textarea>

  </div>
</template>

<script>
import fecha from 'fecha'

export default {
  data () {
    return {
      body: undefined
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
    },
    getDate (date, style) {
      return fecha.format(new Date(date), style)
    }
  },
  computed: {
    messages () {
      return this.$store.state.privateMessages.filter((message) => {
        return ((message.author === this.author) && (message.recipient === this.user)) ||
         ((message.author === this.user) && (message.recipient === this.author))
      })
    },
    author () {
      return this.$store.state.user.username
    }
  }

}

</script>

<style scoped>

  .messageBody {
    position: relative;
    border: 2px solid grey;
    width: 70%;
    margin: 1em;
    padding: 0.5em 0.5em 0 0.5em;
    border-radius: 10px;
    background-color: #FFF;
    float: right;
    text-align: right;
  }

  .messageUsername {
    font-weight: bold;
    color: #aa4439;
  }

  .mine {
    float: left;
    text-align: left;
    background-color: #F2F2F2;

  }

  .date {
    color: #777;
    font-size: 0.8em;
    padding: 0.5em;
    text-align: left;
  }

  .dateMine {
    text-align: right;
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
    max-height: 500px;
    min-height: 300px;
    overflow-y: scroll;
    overflow-x: hidden;
    border: 1px solid #AAA;
    border-bottom: 1px dotted #AAA;
  }

  .conversationContainer {
    margin: 1em auto;
    max-width: 800px;
  }

</style>
