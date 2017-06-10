<template>
  <div>
    <conversationsList :conversations="conversations"></conversationsList>
    <userSearch> </userSearch>
  </div>

</template>

<script>
import conversationsList from '@/components/conversationsList'
import userSearch from '@/components/userSearch'

export default {
  data () {
    return {
      conversations: []
    }
  },
  components: {
    conversationsList, userSearch
  }

}
</script>

<style>

</style>
