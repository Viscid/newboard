<template>
  <div class="postHeader">
    <router-link class="postUsername" :to="{ name: 'UserProfile', params: { username: post.username }}"> {{ post.username }} </router-link> 
    <span class="onlineDot" v-show="isOnline(post.username)"> &bull; </span> -
    <span class="postDatetime">
      <router-link :to="{ name: 'PostViewer', params: { slug: post.slug, thread } }">  {{ date }} </router-link>
    </span>
    <div v-show="allReactions.length" @click="toggleReactions" class="headerReactionCount noselect"> -
      {{ allReactions.length + ' reaction' + (allReactions.length > 1 ? 's' : '') + '.' }}
    </div>
    <transition name="reactionTransition">
      <div v-show="showReactions" class="headerReactions">
        <ul class="headerReactionList"> 
          <li v-for="reaction in allReactions" class="headerReactionItem"> {{ getReactionText(reaction.name, reaction.user) }} </li>
        </ul>
      </div>
    </transition>    
  </div>
</template>

<script>
import fecha from 'fecha'
import RelativeTime from '../helpers/RelativeTime'
import reactions from '../../../config/reactions.js'

export default {
  props: ['post', 'thread', 'settings'],
  data () {
    return {
      timeNow: Date.now(),
      reactions: ('reactions' in this.post) ? this.post.reactions : [],
      newReactions: this.$store.state.reactions.filter((reaction) => {
        return (reaction.postId === this.$props.post._id)
      }),
      showReactions: false,
      reactionText: {}
    }
  },
  created () {
    reactions.forEach((reaction) => {
      this.reactionText[reaction.name] = reaction.reaction
    })
  },
  mounted () {
    if (this.$props.settings['dateTimeFormat'] === 'relative') this.interval = setInterval(() => { this.timeNow = Date.now() }, 10000)
    this.reactionWatcher = this.$store.watch(
      (state) => state.reactions,
      (oldReactions, newReactions) => {
        this.newReactions = newReactions.filter((reaction) => {
          return (reaction.postId === this.$props.post._id)
        })
      })
  },
  beforeDestroy () {
    this.reactionWatcher()
    if (this.interval) clearInterval(this.interval)
  },
  methods: {
    getDate (date, style, timeNow) {
      if (this.$props.settings['dateTimeFormat'] === 'relative') {
        let rt = new RelativeTime(date, timeNow)
        return rt.getString()
      } else return fecha.format(new Date(date), style)
    },
    isOnline (username) {
      return (this.$store.state.onlineUsers.indexOf(username) >= 0)
    },
    toggleReactions () {
      this.showReactions = !this.showReactions
    },
    getReactionText (name, user) {
      if (name) return this.reactionText[name](user)
    }
  },
  computed: {
    loggedIn () {
      return ('username' in this.$store.state.user)
    },
    date () {
      return this.getDate(this.$props.post.datetime, 'MMMM Do, YYYY @ h:mma', this.timeNow)
    },
    allReactions () {
      let newReactions = []
      this.newReactions.forEach((reaction) => {
        newReactions.push({ name: reaction.reaction.name, user: reaction.reaction.user })
      })
      return this.reactions.concat(newReactions)
    }
  },
  watch: {
    post: function () {
      this.reactions = this.post.reactions || []
    }
  }
}
</script>

<style>
  .onlineDot {
    color: #99DD99;
    font-size: 1em;
  }

  .headerReactionCount {
    font-size: 12px;
    height: 12px;
    display: inline-block;
    cursor: pointer;
  }

  .headerReactions {
    font-size: 14px;
    position: absolute;
    font-weight: normal;
    top: 30px;
    left: 200px;
    padding: 1em;
    border: 1px solid black;
    border-radius: 5px;
    background-color: white;;
    z-index: 222;
  }

  .headerReactionItem {
    margin: 5px 0;
  }

  .largeReplyButton {
    display: block;
    font-weight: bold;
    text-decoration: none;
    color: #AAA;
  }

  .largeReplyButton img {
    margin-top: -14px;
    float: right;
    height: 25px;
    width: 25px;
    opacity: 0.5;
  }

  .largeReplyButton img:hover {
    opacity: 1;
  }

  .postHeader {
    height: 21px;
    position: relative;
  }
</style>
