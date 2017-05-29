<template>
  <div class="postReply">
    <div class="postHeader">
      <span class="postUsername"> {{ post.username }} </span>
      <span class="onlineDot" v-show="isOnline(post.username)"> &bull; </span> -
      <span class="postDatetime">
        <router-link v-if="'datetime' in post" :to="{ name: 'PostViewer', params: { slug: post.slug } }">  {{ date }} </router-link>
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
import RelativeTime from '../helpers/RelativeTime.js'

export default {
  components: {
    replyForm, formattedMessage
  },
  data () {
    return {
      timeNow: Date.now()
    }
  },
  created () {
    this.interval = setInterval(() => {
      this.timeNow = Date.now()
    }, 60000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
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
    },
    date () {
      return this.getDate(this.post.datetime, 'MMMM Do, YYYY @ h:mma', this.timeNow)
    }
  },
  methods: {
    getDate (date, style, timeNow) {
      if (this.settings['dateTimeFormat'] === 'relative') {
        let rt = new RelativeTime(date, timeNow)
        return rt.getString()
      } else return fecha.format(new Date(date), style)
    },
    isOnline (username) {
      return (this.$store.state.onlineUsers.indexOf(username) >= 0)
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
