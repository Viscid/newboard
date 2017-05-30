<template>
 <div class="actionBar noselect">
  <a @click="showActionBar" :class="{active: reacting}"> React </a> &vert;
  <a @click="vote('up', post)"> Upvote </a> &vert;
  <a @click="vote('down', post)"> Downvote </a> &vert;
  <router-link :to="{ name: 'Reply', params: { slug: post.slug, post }}"> Reply </router-link>
  <span v-show="isAdmin">
    &vert;
    <a class="adminPostAction adminNuke" @click="nukePost(post)"> Nuke </a> &vert;
    <a class="adminPostAction adminDelete" @click="deletePost(post)"> Delete </a> &vert;
    <a class="adminPostAction adminBan" @click="banUser(post)"> Ban User </a>
  </span>
  <transition name="reactionTransition">
    <div v-if="reacting" class="reactions">
      <ul v-click-away="hideActionBar" class="reactionList"> 
        <li v-for="reaction in reactions" @click="react(reaction, post)" class="reactionItem"> {{ reaction.name }} </li>
      </ul>
    </div>
  </transition>
 </div>
</template>

<script>
import reactions from '../../../config/reactions'

export default {
  props: ['post', 'isAdmin'],
  data () {
    return {
      reacting: false,
      reactions
    }
  },
  methods: {
    showActionBar () {
      this.reacting = true
    },
    hideActionBar () {
      this.reacting = false
    },
    nukePost (post) {
      this.$store.dispatch('adminNukePost', post)
    },
    deletePost (post) {
      this.$store.dispatch('adminDeletePost', post)
    },
    banUser (post) {
      this.$store.dispatch('adminBanUser', post)
    },
    react (reaction, post) {
      this.reacting = false
      this.$store.dispatch('react', { name: reaction.name, post })
    },
    vote (direction, post) {
      this.$store.dispatch('vote', { direction, post })
    }
  }
}
</script>

<style>
  .reactionTransition-enter-active, .reactionTransition-leave-active {
    transition: opacity .25s
  }
  .reactionTransition-enter, .reactionTransition-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }

  .actionBar {
    color: #BBB;
    position: relative;
    font-size: 13px;
    height: 15px;
    line-height: 15px;
    padding: 1em;
  }

   .actionBar a.active {
    color: #5f7ec6;
  }

  .reactions {
    color: #555;
    background-color: white;
    position: absolute;
    top: 20px;
    border: 1px solid #CCC;
    outline: none;
    z-index: 1;
    box-shadow: 2px 2px 5px #DDD;
  }

  .reactionList {
    margin: 0;
    padding: 0;
    max-width: 400px;
  }

  .reactionItem:hover {
    background-color: #F8F8F8;
    color: #000;
  }

  .reactionItem {
    display: inline-block;
    padding: 10px;
    margin: 0;
    cursor: pointer;
  }

  .actionBar a {
    color: #888;
    cursor: pointer;
    text-decoration: none;
  }

  .actionBar a:hover {
    color: #5f7ec6;
  }

</style>
