<template> 
  <ul class="replies">
    <li :key="reply._id" v-for="reply in post.replies[parent]" :class="{ reply: true, active: isSelected(reply._id) }">
      <div class="expandedReply" v-if="isSelected(reply._id)">
        <post :post="reply" :settings="settings" :isAdmin="isAdmin" :loggedIn="loggedIn"></post>
      </div>
      <shortPost v-else class="unexpandedReply" :post="reply" :settings="settings" :replyCount="replyCount" :loggedIn="loggedIn"></shortPost>
     <replyList v-if="hasReplies(reply._id)" :replyCount="replyCount" :post="post" :parent="reply._id" :isAdmin="isAdmin" :loggedIn="loggedIn"> </replyList>
    </li>
  </ul>
</template>

<script>
import replyList from './replyList'

import post from '@/components/post'
import shortPost from '@/components/shortPost'

export default {
  props: ['parent', 'replyCount', 'post', 'isAdmin', 'loggedIn'],
  name: 'replyList',
  components: { replyList, post, shortPost },
  methods: {
    hasReplies (parentId) {
      return (parentId in this.post.replies)
    },
    isSelected (replyId) {
      return (replyId === this.$store.state.selectedReply)
    }
  },
  computed: {
    selectedReply () {
      return this.$store.state.selectedReply
    },
    settings () {
      return this.$store.state.settings
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
    padding: 0;
    background-color: white;
  }

  .replies {
    margin: 0;
    padding-left: 0;
  }

  .reply:last-child {
    background-image: url('../assets/replyline_list_end.png');
    background-repeat: no-repeat;
    border: 0;
  }

  .reply {
    background-image: url('../assets/replyline_list_item.png');
    background-repeat: no-repeat;  
    margin: 0;
    padding-left: 15px;
    padding-top: 5px;
    border-left: 1px solid #DDD;
    list-style: none;
  }

  .reply.active {
    background-image: url('../assets/replyline_list_active_item.png');
    background-position: 0 14px;
    padding-top: 0;
    border-left: 1px solid #DDD;
  }

  .reply:last-child.active {
    background-image: url('../assets/replyline_list_active_end.png');
    background-position: 0 -1px;
    border-left: 0;
  }  

  .replyUsername {
    font-weight: bold;
    color: #aa4439;
    text-decoration: none;
  }

  .replyMessageInline:hover {
    text-decoration: underline;
  }

  .unexpandedReply {
    background-color: white;
    padding-left: 2px;
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

