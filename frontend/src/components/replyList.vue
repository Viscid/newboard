<template> 
  <ul class="replies">
    <li :key="reply._id" v-for="reply in replies" class="reply">
      <div class="expandedReply" v-if="selectedReply === reply._id">
        <postHeader :post="reply"> </postHeader>
        <div class="postBody">
          <span class="postMessage"> {{ reply.message }} </span>
        </div>
      </div>
      <div v-else>
        <span class="replyUsername"> {{reply.username}} </span>: <span :class="replyOrderWeight(reply.replyOrder)">
        <a class="replyMessageInline" @click="selectReply(reply._id)"> {{ trimReply(reply.message) }} </a> </span>
        <router-link v-show="loggedIn" class="replyButton" :to="{ name: 'Reply', params: { slug: reply.slug, post: reply }}"> &laquo; </router-link>
      </div>
     <replyList v-if="hasReplies(reply._id)" :replyCount="replyCount" :parent="reply"> </replyList>
    </li>
  </ul>
</template>

<script>
import replyList from './replyList'

import postHeader from './postHeader'

export default {
  props: ['parent', 'replyCount'],
  name: 'replyList',
  components: {
    replyList,
    postHeader
  },
  methods: {
    hasReplies (parentId) {
      return (parentId in this.$store.state.posts.replies)
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
    replies () {
      return this.$store.state.posts.replies[this.parent._id]
    },
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
  }

  .replyButton {
    display: inline-block;
    margin-left: 0.5em;
    text-decoration: none;
    color: #666;
    font-size: 0.8em;
  }

  .replyButton:hover {
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

