<template>
  <div class="postHeader">
    <span class="postUsername"> {{ post.username }} </span> -
    <span class="postDatetime">
      <router-link :to="{ name: 'PostViewer', params: { slug: post.slug, thread } }">  {{ getDate(post.datetime, 'MMMM Do, YYYY @ h:mm:ssa') }} </router-link>
    </span>
    <router-link v-show="loggedIn" :to="{ name: 'Reply', params: { slug: post.slug, post }}" class="largeReplyButton"> reply </router-link>
  </div>
</template>

<script>
import fecha from 'fecha'

export default {
  props: ['post', 'thread'],
  methods: {
    getDate (date, style) {
      return fecha.format(new Date(date), style)
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
  .largeReplyButton {
    float: right;
    display: block;
    font-weight: bold;
    text-decoration: none;
    color: #AAA;
  }

  .largeReplyButton:hover {
    color: black;
  }
</style>
