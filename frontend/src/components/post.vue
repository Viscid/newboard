<template>
  <div>
    <postHeader :post="post" :settings="settings"> </postHeader>
    <div class="postBody">
      <formattedMessage :message="post.message" :formattedMessage="post.formattedMessage" :settings="settings"> </formattedMessage>
    </div>
    <actionBar v-show="loggedIn" :isAdmin="isAdmin" :post="post"></actionBar>
  </div>
</template>

<script>

import postHeader from './postHeader'
import formattedMessage from './formattedMessage'
import actionBar from './actionBar'

export default {
  name: 'Post',
  props: ['post', 'isAdmin', 'loggedIn', 'settings'],
  components: { postHeader, formattedMessage, actionBar }
}

</script>

<style>
 .postBody {
    padding: 4px 0 0 0 ;
    word-wrap: break-word;
  }
</style>
