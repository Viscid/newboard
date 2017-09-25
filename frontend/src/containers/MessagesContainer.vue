<template>
  <div>
    <div id="messengerContainer">
      <userSearch @selected="selectUser" @clear="clearUser"> </userSearch>
      <conversationsList v-if="!targetUser" :conversations="conversations"></conversationsList>
      <conversation v-if="targetUser" :user="targetUser"> </conversation>
    </div>
  </div>

</template>

<script>
import conversationsList from '@/components/conversationsList'
import conversation from '@/components/conversation'
import userSearch from '@/components/userSearch'

export default {
  data () {
    return {
      conversations: [],
      targetUser: undefined
    }
  },
  methods: {
    selectUser (username) {
      this.targetUser = username
    },
    clearUser () {
      this.targetUser = undefined
    }
  },
  components: {
    conversationsList, conversation, userSearch
  }

}
</script>

<style>

#messengerContainer {
  padding: 1em;
  margin: 1em;
}
</style>
