<template>
  <ul class="reactionsList">
    <li :key="reaction._id" v-for="reaction in reactions" class="reactionItem"> {{ getReactionText(reaction.name, reaction.username, post.username) }} </li>
  </ul>
</template>

<script>
import reactions from '../../../config/reactions.js'

export default {
  props: ['post'],
  data () {
    return {
      reactions: ('reactions' in this.post) ? this.post.reactions : []
    }
  },
  methods: {
    getReactionText (name, subject, object) {
      return reactions.find(reaction => reaction.name === name).describe(subject, object)
    }
  },
  watch: {
    post: function () {
      this.reactions = this.post.reactions || []
    }
  }
}
</script>

<style scoped>
  .reactionsList {
    margin: 0;
    padding: 0;
  }

  .reactionItem {
    font-style: italic;
    margin: 0;
    width: 100%;
    font-size: 0.8em;
    text-align: left;
    padding: 0;
  }

</style>
