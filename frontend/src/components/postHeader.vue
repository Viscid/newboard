<template>
  <div class="postHeader">
    <router-link class="postUsername" :to="{ name: 'UserProfile', params: { username: post.username }}"> {{ post.username }} </router-link> 
    <span class="onlineDot" v-show="isOnline(post.username)"> &bull; </span> -
    <router-link class="postDatetime" :to="{ name: 'PostViewer', params: { slug: post.slug } }">  {{ date }} </router-link>
    <div v-show="reactions.length" @mouseover="showReactions" @mouseout="hideReactions" @click="showReactions" class="headerReactionCount noselect"> -
      {{ reactions.length + ' reaction' + (reactions.length > 1 ? 's' : '') }}
    </div>
    <span class="headerVoteSeparator" v-show="votes.length"> &vert; </span>
    <span v-show="votes.length"
      :class="{positivePostScore: (postScore > 1), negativePostScore: (postScore < -1), headerPostScore: true, noselect: true}">
      {{ postScore }}
    </span>
    <transition name="reactionTransition">
      <div v-if="reactionVisible" class="headerReactions">
        <ul v-click-away="hideReactions" class="headerReactionList"> 
          <li v-for="reaction in reactions" class="headerReactionItem"> {{ getReactionText(reaction.name, reaction.username, post.username) }} </li>
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
  props: ['post', 'settings'],
  data () {
    return {
      timeNow: Date.now(),
      reactions: ('reactions' in this.post) ? this.post.reactions : [],
      votes: ('votes' in this.post) ? this.post.votes : [],
      reactionVisible: false
    }
  },
  mounted () {
    if (this.$props.settings['dateTimeFormat'] === 'relative') this.interval = setInterval(() => { this.timeNow = Date.now() }, 10000)

    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'addReaction') {
        let reaction = mutation.payload
        if (reaction.postId === this.post._id) this.reactions.push(reaction.reaction)
      } else if (mutation.type === 'addVote') {
        let vote = mutation.payload
        if (vote.postId === this.post._id) this.votes.push(vote)
      }
    })
  },
  beforeDestroy () {
    this.unsubscribe()
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
    showReactions () {
      this.reactionVisible = true
    },
    hideReactions () {
      this.reactionVisible = false
    },
    getReactionText (name, subject, object) {
      return reactions.find(reaction => reaction.name === name).describe(subject, object)
    }
  },
  computed: {
    loggedIn () {
      return ('username' in this.$store.state.user)
    },
    date () {
      return this.getDate(this.$props.post.datetime, 'MMMM Do, YYYY @ h:mma', this.timeNow)
    },
    postScore () {
      return this.votes.reduce((acc, vote) => {
        if (vote.direction === 'up') return acc + 1
        else return acc - 1
      }, 0)
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

  .headerVoteSeparator {
    color: #AAA;
  }

  .headerPostScore {
    font-size: 12px;
    font-weight: normal;
  }

  .positivePostScore {
    color: #4dad3e;
  }

  .negativePostScore {
    color: #ad3e3e
  }

  .headerReactions {
    font-size: 14px;
    position: absolute;
    font-weight: normal;
    top: 30px;
    left: 200px;
    padding: 10px;
    border: 1px solid #777;
    border-radius: 3px;
    background-color: white;;
    z-index: 222;
    box-shadow: 2px 2px 5px #DDD;
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
    font-weight: normal;
    position: relative;
  }
</style>
