<template>

<ul>
  <li :key="thread._id" v-for="thread in threads">
    <postHeader :post="thread"> </postHeader>
    <div class="postBody">
      <span class="postMessage"> {{ thread.message }} </span>
    </div>
    <replyList v-if="hasReplies(thread)" :replyCount="thread.replyCount" :parent="thread"></replyList>
  </li>
</ul>

</template>

<script>
import replyList from './replyList'

import postHeader from './postHeader'

export default {
  name: 'postList',
  props: ['loggedIn', 'threads'],
  components: {
    replyList,
    postHeader
  },
  methods: {
    hasReplies (post) {
      return (post._id in this.$store.state.posts.replies)
    }
  }
}
</script>

<style>
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


  .postDatetime a {
    text-decoration: none;
    font-style: italic;
    color: inherit;
  }

  .postDatetime a:hover {
    text-decoration: underline;
  }

  .postBody {
    padding: 1em;
    word-wrap: break-word;
  }

  .postDatetime {
    font-weight: normal;
    font-size: 0.8em;
  }

  .threadReplyButton {
    float: right;
    display: block;
    font-weight: bold;
    text-decoration: none;
    color: black;
  }

</style>
