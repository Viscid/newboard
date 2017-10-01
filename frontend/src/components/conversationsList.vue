<template>
  <div>
    <ul v-if="conversations.length">
      <li @click="selectConversation(index)" class="conversation" :key="conversation._id" v-for="(conversation, index) in conversations">
        <span :class="{unseen: ((conversation.author !== username) && !conversation.seen)}">
          <span class="username" v-if="conversation.author === username"> {{ conversation.recipient }} <br /> </span>
          <span class="username" v-else> {{ conversation.author }} <br /> </span>  
          <span class="lastSpeaker"> {{ conversation.author }}: </span>
          <span class="messages"> {{ conversation.message }} </span>
        </span>
        <div class="date"> {{ getDate(conversation.date_sent, 'DD/MM/YY h:mma') }} </div>
      </li>
    </ul>
    <h3 v-else> You have no prior conversations. </h3>
  </div>

</template>

<script>
import fecha from 'fecha'
import { mapGetters } from 'vuex'

export default {
  computed: {
    username () {
      return this.$store.state.user.username
    },
    ...mapGetters({ conversations: 'lastConversationMessages' })
  },
  methods: {
    selectConversation (index) {
      let conversation = this.conversations[index];

      (conversation.author === this.username)
        ? this.$emit('selected', conversation.recipient)
        : this.$emit('selected', conversation.author)
    },
    getDate (date, style) {
      return fecha.format(new Date(date), style)
    }
  },
  mounted () {
    this.$store.dispatch('getConversations')
    this.unwatch = this.$store.watch((state) => state.incomingMessages, () => {
      this.$store.dispatch('getConversations')
    })
  },
  destroyed () {
    this.unwatch()
  }
}

</script>

<style scoped>

h3 {
  font-size: 1em;
  font-weight: normal;
  font-style: italic;
}

.username {
  font-weight: bold;
  color: #aa4439;
}

.date {
  font-size: 0.8em;
  color: #777;
  text-align: right;
  font-weight: bold;
}

.conversation {
  min-height: 2em;
  margin-top: 0.25em;
  padding: 0.5em;
}

.conversation:hover {
  background-color: #EEE;
  cursor: pointer;
}

.unseen {
  font-weight: bold;
}

</style>
