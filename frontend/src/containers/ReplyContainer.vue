<template>
  <div class="postReply">
    <h1> {{ post.username }} </h1>
    <p> {{ post.message }} </p>
    <replyForm :parentId="post._id"></replyForm>
  </div>
</template>

<script>
import replyForm from '@/components/replyForm'

export default {
  components: {
    replyForm
  },
  created () {
    ('post' in this.$route.params)
    ? this.$store.dispatch('setReplyPost', this.$route.params.post) : this.$store.dispatch('getReplyPost', this.$route.params.slug)
  },
  computed: {
    post () {
      return (this.$route.params.slug === this.$store.state.replyPost.slug)
       ? this.$store.state.replyPost : {}
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
