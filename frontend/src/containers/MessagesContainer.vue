<template>
  <div>
    <div id="messengerContainer">
      <userSearch @selected="selectUser" @clear="clearUser" :enabled="(targetUser === undefined)"> </userSearch>
      <conversationsList @selected="selectUser" v-if="!targetUser"></conversationsList>
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
      targetUser: undefined
    }
  },
  mounted () {
    this.$store.dispatch('clearIncomingMessages')
  },
  methods: {
    selectUser (username) {
      this.$router.push('/messages/' + username)
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
