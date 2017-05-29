<template>

<ul>
  <li :class="{threadListItem: true, oddThread: (key % 2 === 0)}" :key="thread._id" v-for="(thread, key) in threads">
    <postHeader :post="thread" :settings="settings"> </postHeader>
    <div class="postBody">
      <formattedMessage :message="thread.message" :formattedMessage="thread.formattedMessage" :settings="settings"> </formattedMessage>
    </div>
    <actionBar :isAdmin="isAdmin" :post="thread" :loggedIn="loggedIn"></actionBar>
    <replyList v-if="hasReplies(thread)" :replyCount="thread.replyCount" :thread="thread" :parent="thread._id" :isAdmin="isAdmin"></replyList>
  </li>
</ul>

</template>

<script>
import replyList from './replyList'

import postHeader from './postHeader'
import formattedMessage from './formattedMessage'
import actionBar from './actionBar'

export default {
  name: 'postList',
  props: ['loggedIn', 'threads', 'isAdmin'],
  components: {
    replyList,
    postHeader,
    formattedMessage,
    actionBar
  },
  methods: {
    hasReplies (thread) {
      return thread.hasOwnProperty('replies') ? (thread._id in thread['replies']) : false
    }
  },
  computed: {
    settings () {
      return this.$store.state.settings
    }
  },
  beforeDestroy () {
    this.$store.dispatch('clearReactions')
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

  @media(max-width: 500px) {
    li {
      margin: 0 0 2em 5px;
    }
  }

  .threadListItem {
    border-left: 1px solid #FFF; 
    padding-left: 5px;
  }

  .threadListItem:hover {
    border-left: 1px solid #93b3ff;
  }

  .postUsername {
    font-weight: bold;
    color: #aa4439;
    text-decoration: none;
  }

  .postUsername:hover {
    text-decoration: underline;
  }

  .postHeader {
    font-weight: bold;
    padding: 5px 10px 2px 4px;
    color: black;
    border-bottom: 1px solid #DDD;
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
    padding: 0.75em 1em;
    word-wrap: break-word;
  }

  .postDatetime {
    font-weight: normal;
    font-size: 0.8em;
  }
</style>
