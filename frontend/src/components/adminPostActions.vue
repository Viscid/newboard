<template>

<div class="adminPostActions">
  <a class="adminPostAction adminNuke" @click="nukePost(post)"> Nuke </a> |
  <a class="adminPostAction adminDelete" @click="deletePost(post)"> Delete </a> |
  <a class="adminPostAction adminBan" @click="banUser(post)"> Ban User </a>
</div>

</template>

<script>
export default {
  props: ['post'],
  methods: {
    nukePost (post) {
      this.$store.dispatch('adminNukePost', post)
    },
    deletePost (post) {
      this.$store.dispatch('adminDeletePost', post)
    },
    banUser (post) {
      this.$store.dispatch('adminBanUser', post)
    }
  }
}
</script>

<style>
  .adminPostActions {
    font-size: 0.8em;
    padding-left: 1em;
  }

  .adminNuke {
    color: purple;
    cursor: pointer;
  }

  .adminDelete {
    color: red;
    cursor: not-allowed;
  }

  .adminBan {
    color: red;
    font-weight: bold;
  }

</style>
