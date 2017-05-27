<template>
  <div class="postHeader">
    <router-link class="postUsername" :to="{ name: 'UserProfile', params: { username: post.username }}"> {{ post.username }} </router-link> 
    <span class="onlineDot" v-show="isOnline(post.username)"> &bull; </span> -
    <span class="postDatetime">
      <router-link :to="{ name: 'PostViewer', params: { slug: post.slug, thread } }">  {{ getDate(post.datetime, 'MMMM Do, YYYY @ h:mma') }} </router-link>
    </span>
    <router-link v-show="loggedIn" :to="{ name: 'Reply', params: { slug: post.slug, post }}" class="largeReplyButton noselect"> <img src="../assets/reply.svg"> </router-link>
  </div>
</template>

<script>
import fecha from 'fecha'

export default {
  props: ['post', 'thread'],
  methods: {
    getDate (date, style) {
      return fecha.format(new Date(date), style)
    },
    isOnline (username) {
      return (this.$store.state.onlineUsers.indexOf(username) >= 0)
    }
  },
  computed: {
    loggedIn () {
      return ('username' in this.$store.state.user)
    }
  }
}
</script>

<style>
  .onlineDot {
    color: #99DD99;
    font-size: 1em;
  }

  .largeReplyButton {
    display: block;
    font-weight: bold;
    text-decoration: none;
    color: #AAA;
  }

  .largeReplyButton img {
    margin-top: -14px;
    float: right;
    height: 25px;
    width: 25px;
    opacity: 0.5;
  }

  .largeReplyButton img:hover {
    opacity: 1;
  }

  .postHeader {
    height: 21px;
  }
</style>
