<template>
  <div class="postReply">
    <div class="postHeader">
      <span class="postUsername"> {{ post.username }} </span> -
      <span class="postDatetime">
        <router-link v-if="'datetime' in post" :to="{ name: 'PostViewer', params: { slug: post.slug } }">  {{ getDate(post.datetime, 'MMMM Do, YYYY @ h:mm:ssa') }} </router-link>
      </span>
    </div>
    <div class="postBody">
      <formattedMessage :message="post.message" :formattedMessage="post.formattedMessage" :settings="settings"></formattedMessage>
    </div>
    <replyForm :parentId="post._id"></replyForm>
  </div>
</template>

<script>
import replyForm from '@/components/replyForm'
import formattedMessage from '@/components/formattedMessage'
import fecha from 'fecha'

export default {
  components: {
    replyForm, formattedMessage
  },
  mounted () {
    ('post' in this.$route.params)
    ? this.$store.dispatch('setReplyPost', this.$route.params.post)
    : this.$store.dispatch('getReplyPost', this.$route.params.slug)
  },
  computed: {
    post () {
      return (this.$route.params.slug === this.$store.state.replyPost.slug)
       ? this.$store.state.replyPost : {}
    },
    settings () {
      return this.$store.state.settings
    }
  },
  methods: {
    getDate (date, style) {
      return fecha.format(new Date(date), style)
    }
  }
}
</script>

<style scoped>
  .postReply {
    padding: 1em;
  }

  h1 {
    margin: 0;
  }
</style>
