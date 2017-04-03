<template>

<ul>
  <li :key="thread._id" v-for="thread in threads">
    <div class="postHeader">
      <span class="postUsername"> {{ thread.username }} </span> -
      <span class="postDatetime"> {{ getDate(thread.datetime, 'MMMM Do, YYYY @ h:mm:ssa') }} </span>
      <router-link v-show="loggedIn" :to="{ name: 'Reply', params: { slug: thread.slug, post: thread }}" class="replyButton"> reply </router-link>
    </div>
    <div class="postBody">
      <span class="postMessage"> {{ thread.message }} </span>
    </div>
    <div class="replyListWrapper">
      <replyList v-if="hasReplies(thread)" :replyCount="thread.replyCount" :parent="thread"></replyList>
    </div>
  </li>
</ul>

</template>

<script>
import replyList from './replyList'
import fecha from 'fecha'

export default {
  name: 'postList',
  props: ['loggedIn', 'threads', 'replies'],
  components: {
    replyList
  },
  methods: {
    getDate (date, style) {
      return fecha.format(new Date(date), style)
    },
    hasReplies (post) {
      return (post._id in this.$store.state.posts.replies)
    }
  }
}
</script>

<style scoped>
  ul {
    padding: 0;
  }

  li {
    list-style: none;
    margin: 1em;
    margin-bottom: 3em;
    background-color: white;
  }

  .replyListWrapper {
    margin-left: 1em;
  }

  .postUsername {
    font-weight: bold;
    color: #aa4439;
  }

  .postHeader {
    font-weight: bold;
    padding: 0.5em 1em;
    color: black;
    border-bottom: 1px solid #AAA;
  }

  .postBody {
    padding: 1em;
  }

  .postDatetime {
    font-weight: normal;
    font-size: 0.8em;
  }

  .replyButton {
    float: right;
    display: block;
    font-weight: bold;
    text-decoration: none;
    color: black;
  }

</style>
