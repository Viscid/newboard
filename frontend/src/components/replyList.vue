<template> 
  <ul class="replies">
    <li :key="reply._id" v-for="reply in thread.replies[parent]" class="reply">
      <div class="expandedReply" v-if="selectedReply === reply._id">
        <postHeader :post="reply" :thread="thread"> </postHeader>
        <div class="postBody">
          <formattedMessage :message="reply.message" :formattedMessage="reply.formattedMessage"></formattedMessage>
        </div>
        <adminPostActions :post="reply" v-show="isAdmin"></adminPostActions>
      </div>
      <div v-else>
        <router-link class="replyUsername" :to="{ name: 'UserProfile', params: { username: reply.username }}"> {{ reply.username }} </router-link>: <span :class="replyOrderWeight(reply.replyOrder)">
        <a class="replyMessageInline" @click="selectReply(reply._id)"> {{ trimReply(reply.message) }} </a> </span>
        <router-link v-show="loggedIn" class="shortReplyButton" :to="{ name: 'Reply', params: { slug: reply.slug, post: reply }}"> &laquo; </router-link>
      </div>
     <replyList v-if="hasReplies(reply._id)" :replyCount="replyCount" :thread="thread" :parent="reply._id" :isAdmin="isAdmin"> </replyList>
    </li>
  </ul>
</template>

<script>
import replyList from './replyList'

import postHeader from './postHeader'
import formattedMessage from '@/components/formattedMessage.vue'
import adminPostActions from '@/components/adminPostActions.vue'

export default {
  props: ['parent', 'replyCount', 'thread', 'isAdmin'],
  name: 'replyList',
  components: {
    replyList,
    postHeader,
    formattedMessage,
    adminPostActions
  },
  methods: {
    hasReplies (parentId) {
      return (parentId in this.thread.replies)
    },
    replyOrderWeight (replyOrder) {
      switch (this.replyCount - replyOrder) {
        case 0:
          return 'ro0'
        case 1:
          return 'ro1'
        case 2:
          return 'ro2'
        case 3:
          return 'ro3'
        case 4:
          return 'ro4'
        case 5:
          return 'ro5'
        case 6:
          return 'ro6'
        case 7:
          return 'ro7'
        case 8:
          return 'ro8'
        default:
          return 'rox'
      }
    },
    selectReply (replyId) {
      this.$store.dispatch('selectReply', replyId)
    },
    trimReply (message) {
      let length = message.length
      if (length > 50) return message.slice(0, 80) + '...'
      else return message
    }
  },

  computed: {
    loggedIn () {
      return ('username' in this.$store.state.user)
    },
    selectedReply () {
      return this.$store.state.selectedReply
    }
  }
}
</script>

<style>

  .replyMessageInline {
    cursor: pointer
  }

  .replyMessageInline:hover {
    color: black;
  }

  .expandedReply {
    padding: 0.5em 0;
  }

  .replies {
    margin: 0;
    margin-left: 1em;
    padding-left: 0.5em;
    border-left: 1px solid #DADADA;
  }

  @media (max-device-width: 480px) {
    .replies {
      margin-left: 2px;
      padding-left: 0.25em;
    }
  }

  .reply {
    margin: 0;
    padding-top: 5px;
    box-shadow: none;
    border: none;
    list-style: none;
  }

  .replyUsername {
    font-weight: bold;
    color: #aa4439;
    text-decoration: none;
  }

  .replyUsername:hover {
    text-decoration: underline;
  }

  .shortReplyButton {
    display: inline-block;
    margin-left: 0.5em;
    text-decoration: none;
    color: #666;
    font-size: 0.8em;
  }

  .shortReplyButton:hover {
    color: #333;
  }

  .ro0 {
    font-weight: bolder;
    color: #000;
  }

  .ro1 { color: #000; }
  .ro2 { color: #111; }
  .ro3 { color: #222; }
  .ro4 { color: #333; }
  .ro5 { color: #444; }
  .ro6 { color: #555; }
  .ro7 { color: #666; }
  .ro8 { color: #777; }
  .rox { color: #888; }             

</style>

