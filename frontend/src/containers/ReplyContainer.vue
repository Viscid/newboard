<template>
  <div v-if="post" id="replyContainer">
    <post :post="post" :settings="settings" :isAdmin="false" :loggedIn="false"></post>
    <replyForm :parentId="post._id"></replyForm>
  </div>
</template>

<script>
import replyForm from '@/components/replyForm'
import formattedMessage from '@/components/formattedMessage'
import post from '@/components/post'

export default {
  components: {
    replyForm, formattedMessage, post
  },
  mounted () {
    ('post' in this.$route.params)
    ? this.$store.dispatch('setReplyPost', this.$route.params.post)
    : this.$store.dispatch('getReplyPost', this.$route.params.slug)
  },
  computed: {
    post () {
      return (this.$route.params.slug === this.$store.state.replyPost.slug)
       ? this.$store.state.replyPost : undefined
    },
    settings () {
      return this.$store.state.settings
    }
  },
  methods: {
    isOnline (username) {
      return (this.$store.state.onlineUsers.indexOf(username) >= 0)
    }
  }
}
</script>

<style>
  #replyContainer {
    padding: 50px 1em 1em 0.5em;
    padding-top: calc(50px + 1em)
  }
</style>
