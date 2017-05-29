<template>
 <div class="actionBar noselect">
  <a @click="toggleReactionBar" :class="{active: reacting}"> React </a> &vert;
  <router-link :to="{ name: 'Reply', params: { slug: post.slug, post }}"> Reply </router-link>
  <span v-show="isAdmin">
    &vert;
    <a class="adminPostAction adminNuke" @click="nukePost(post)"> Nuke </a> &vert;
    <a class="adminPostAction adminDelete" @click="deletePost(post)"> Delete </a> &vert;
    <a class="adminPostAction adminBan" @click="banUser(post)"> Ban User </a>
  </span>
  <transition name="reactionTransition">
    <div v-show="reacting" class="reactions">
      <ul class="reactionList"> 
        <li v-for="reaction in reactions" @click="react(reaction, post)" class="reactionItem"> {{ reaction.name }} </li>
      </ul>
    </div>
  </transition>
 </div>
</template>

<script>
import reactions from '../../../config/reactions'

export default {
  props: ['loggedIn', 'post', 'isAdmin'],
  data () {
    return {
      reacting: false,
      reactions
    }
  },
  methods: {
    toggleReactionBar () {
      this.reacting = !this.reacting
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
    position: relative;
    font-size: 13px;
    height: 15px;
    line-height: 15px;
    margin: 1em;
    color: #BBB;
  }

   .actionBar a.active {
    color: #5f7ec6;
  }

  .reactions {
    position: absolute;
    color: black;
    background-color: white;
    padding: 5px;
    top: 20px;
    border: 1px solid #CCC;
    border-radius: 5px;
    outline: none;
    z-index: 222;
  }

  .reactionList {
    margin: 0;
    padding: 0;
  }

  .reactionItem:hover {
    color: #5f7ec6;
  }

  .reactionItem {
    display: inline-block;
    padding: 5px;
    margin: 0;
    cursor: pointer;
  }  

  .actionBar a {
    color: #888;
    cursor: pointer;
    user-select: none;
    text-decoration: none;
  }

  .actionBar a:hover {
    color: #5f7ec6;
  }

</style>
