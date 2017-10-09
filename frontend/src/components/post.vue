<template>
  <div>
    <postHeader :post="post" :settings="settings"> </postHeader>
    <div class="postBody">
      <formattedMessage :message="post.message" :formattedMessage="post.formattedMessage" :settings="settings"> </formattedMessage>
    </div>
    <reactionList :post="post"> </reactionList>
    <actionBar v-show="loggedIn" :isAdmin="isAdmin" :post="post"></actionBar>
  </div>
</template>

<script>

import postHeader from './postHeader'
import formattedMessage from './formattedMessage'
import actionBar from './actionBar'
import reactionList from './reactionList'

export default {
  name: 'Post',
  props: ['post', 'isAdmin', 'loggedIn', 'settings'],
  components: { postHeader, formattedMessage, reactionList, actionBar }
}

</script>

<style>
 .postBody {
    padding: 4px 0 0.5em 0;
    word-wrap: break-word;
  }
</style>
