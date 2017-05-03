<template>
  <div class="postHeader">
    <span class="postUsername"> {{ post.username }} </span> -
    <span class="postDatetime">
      <router-link :to="{ name: 'PostViewer', params: { slug: post.slug } }">  {{ getDate(post.datetime, 'MMMM Do, YYYY @ h:mm:ssa') }} </router-link>
    </span>
    <router-link v-show="loggedIn" :to="{ name: 'Reply', params: { slug: post.slug, post }}" class="threadReplyButton"> reply </router-link>
  </div>
</template>

<script>
import fecha from 'fecha'

export default {
  props: ['post'],
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

  .threadReplyButton {
    float: right;
    display: block;
    font-weight: bold;
    text-decoration: none;
    color: #AAA;
  }

  .threadReplyButton:hover {
    color: black;
  }
</style>
