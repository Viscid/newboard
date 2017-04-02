<template> 
  <ul class="replies">
    <li :key="reply._id" v-for="reply in replies" class="reply">
     <span class="replyUsername"> {{reply.username}} </span>: {{reply.message}}
     <router-link  class="replyButton" :to="{ name: 'Reply', params: { slug: reply.slug, post: reply }}"> reply </router-link>
     <replyList v-if="hasReplies(reply._id)" :parent="reply"> </replyList>
    </li>
  </ul>
</template>

<script>
import replyList from './replyList'

export default {
  props: ['parent'],
  name: 'replyList',
  components: {
    replyList
  },
  methods: {
    hasReplies (parentId) {
      return (this.$store.state.replies.filter((reply) => {
        return (reply.parentId === parentId)
      }).length)
    }
  },

  computed: {
    replyNum () {
      return this.replies.length
    },
    replies () {
      return this.$store.state.replies.filter((reply) => {
        return (reply.parentId === this.parent._id)
      })
    }
  }
}
</script>

<style scoped>
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .replies {
    margin: 0;
    padding: 0;
    padding: 0 0 0 1em;
    background-color: #F3F3F3;
  }

  .reply {
    margin: 0;
    padding-top: 5px;
    box-shadow: none;
    border: none;
  }

  .replyUsername {
    font-weight: bold;
    color: #aa4439;
  }

  .replyButton {
    display: inline-block;
    margin-left: 2em;
    font-weight: bold;
    text-decoration: none;
    color: black;
  }

</style>

