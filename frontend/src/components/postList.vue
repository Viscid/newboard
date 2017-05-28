<template>

<ul>
  <li :key="thread._id" v-for="thread in threads">
    <postHeader :post="thread" :settings="settings"> </postHeader>
    <div class="postBody">
      <formattedMessage :message="thread.message" :formattedMessage="thread.formattedMessage" :settings="settings"> </formattedMessage>
    </div>
    <adminPostActions :post="thread" v-show="isAdmin"></adminPostActions>
    <replyList v-if="hasReplies(thread)" :replyCount="thread.replyCount" :thread="thread" :parent="thread._id" :isAdmin="isAdmin"></replyList>
  </li>
</ul>

</template>

<script>
import replyList from './replyList'

import postHeader from './postHeader'
import formattedMessage from './formattedMessage'
import adminPostActions from './adminPostActions'

export default {
  name: 'postList',
  props: ['loggedIn', 'threads', 'isAdmin'],
  components: {
    replyList,
    postHeader,
    formattedMessage,
    adminPostActions
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
