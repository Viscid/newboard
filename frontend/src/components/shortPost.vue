<template>
    <div>
      <router-link class="replyUsername" :to="{ name: 'UserProfile', params: { username: post.username }}"> {{ post.username }} </router-link>
      : <span :class="replyOrderWeight(post.replyOrder)">
      <a class="replyMessageInline" @click="selectReply(post._id)"> {{ trimReply(post.message) }} </a> </span>
      <span v-show="score"
        :class="{positivePostScore: (score > 1), negativePostScore: (score < -1), headerPostScore: true, noselect: true}">
        {{ (score >= 0 ? '+' : '-') }}{{ score }}
      </span>
      <router-link v-show="loggedIn" class="shortReplyButton" :to="{ name: 'Reply', params: { slug: post.slug, post: post }}"> &laquo; </router-link>
    </div>
</template>

<script>
export default {
  props: ['post', 'settings', 'loggedIn', 'replyCount'],
  data () {
    return {
      votes: ('votes' in this.post) ? this.post.votes : []
    }
  },
  mounted () {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'addVote') {
        let vote = mutation.payload
        if (vote.postId === this.post._id) this.votes.push(vote)
      }
    })
  },
  beforeDestroy () {
    this.unsubscribe()
  },
  computed: {
    score () {
      return this.votes.reduce((acc, vote) => {
        if (vote.direction === 'up') return acc + 1
        else return acc - 1
      }, 0)
    }
  },
  methods: {
    replyOrderWeight (replyOrder) {
      switch (this.replyCount - replyOrder) {
        case 0:
          return 'ro0'
        case 1:
          return 'ro1'
        case 2:
          return 'ro2'
        case 3:
          return 'ro3'
        case 4:
          return 'ro4'
        case 5:
          return 'ro5'
        case 6:
          return 'ro6'
        case 7:
          return 'ro7'
        case 8:
          return 'ro8'
        default:
          return 'rox'
      }
    },
    selectReply (replyId) {
      this.$store.dispatch('selectReply', replyId)
    },
    trimReply (message) {
      let length = message.length
      if (length > 80) return message.slice(0, 80) + '...'
      else return message
    }
  }
}
</script>
