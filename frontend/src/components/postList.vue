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
    <replyList v-if="hasReplies(thread)" :parent="thread"></replyList>
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
      return (this.$store.state.replies.filter((reply) => {
        return (reply.parentId === post._id)
      }).length)
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
    border-bottom: 2px solid #CCC;
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
