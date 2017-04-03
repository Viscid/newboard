<template> 
  <ul class="replies">
    <li :key="reply._id" v-for="reply in replies" class="reply">
     <span class="replyUsername"> {{reply.username}} </span>: <span :class="replyOrderWeight(reply.replyOrder)"> {{reply.message}} </span>
     <router-link v-show="loggedIn" class="replyButton" :to="{ name: 'Reply', params: { slug: reply.slug, post: reply }}"> reply </router-link>
     <replyList v-if="hasReplies(reply._id)" :replyCount="replyCount" :parent="reply"> </replyList>
    </li>
  </ul>
</template>

<script>
import replyList from './replyList'

export default {
  props: ['parent', 'replyCount'],
  name: 'replyList',
  components: {
    replyList
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
    }
  },

  computed: {
    replies () {
      return this.$store.state.posts.replies[this.parent._id]
    },
    loggedIn () {
      return ('username' in this.$store.state.user)
    }
  }
}
</script>

<style>

  .replies {
    margin: 0;
    padding: 0 0 0 1em;
    background-color: #F3F3F3;
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

  .ro1 { color: #0A0A0A; }
  .ro2 { color: #111; }
  .ro3 { color: #1A1A1A; }
  .ro4 { color: #222; }
  .ro5 { color: #2A2A2A; }
  .ro6 { color: #333; }
  .ro7 { color: #3A3A3A; }
  .ro8 { color: #444; }
  .rox { color: #4A4A4A; }               

</style>

