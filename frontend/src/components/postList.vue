<template>

<ul>
  <li :key="thread._id" v-for="thread in threads">
    <postHeader :post="thread"> </postHeader>
    <div class="postBody">
      <formattedMessage :message="thread.message" :formattedMessage="thread.formattedMessage"> </formattedMessage>
    </div>
    <replyList v-if="hasReplies(thread)" :replyCount="thread.replyCount" :thread="thread" :parent="thread._id"></replyList>
  </li>
</ul>

</template>

<script>
import replyList from './replyList'

import postHeader from './postHeader'
import formattedMessage from './formattedMessage'

export default {
  name: 'postList',
  props: ['loggedIn', 'threads'],
  components: {
    replyList,
    postHeader,
    formattedMessage
  },
  methods: {
    hasReplies (thread) {
      return thread.hasOwnProperty('replies') ? (thread._id in thread['replies']) : false
    }
  }
}
</script>

<style>
  ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style: none;
    margin: 0 1em;
    margin-bottom: 1.5em;
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
</style>
