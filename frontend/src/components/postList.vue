<template>

<ul>
  <li class="threadListItem" :key="post._id" v-for="post in posts">
    <post :post="post" :settings="settings" :isAdmin="isAdmin" :loggedIn="loggedIn"></post>
    <replyList v-if="hasReplies(post)" :replyCount="post.replyCount" :post="post" :parent="post._id" :isAdmin="isAdmin"></replyList>
  </li>
</ul>

</template>

<script>
import post from '@/components/post'
import replyList from '@/components/replyList'

export default {
  name: 'postList',
  props: ['loggedIn', 'posts', 'isAdmin', 'settings'],
  components: {
    post,
    replyList
  },
  methods: {
    hasReplies (post) {
      return post.hasOwnProperty('replies') ? (post._id in post['replies']) : false
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

  a.postDatetime {
    text-decoration: none;
    font-style: italic;
    color: inherit;
  }

  a.postDatetime:hover {
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
