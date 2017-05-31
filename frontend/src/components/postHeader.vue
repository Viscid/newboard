<template>
  <div class="postHeader">
    <div class="headerTop">
      <router-link class="postUsername" :to="{ name: 'UserProfile', params: { username: post.username }}"> {{ post.username }} </router-link> 
      <span class="onlineDot" v-show="isOnline(post.username)"> &bull; </span> -
      <router-link class="postDatetime" :to="{ name: 'PostViewer', params: { slug: post.slug } }">  {{ date }} </router-link>
    </div>
    <div class="headerBottom">
      <div v-show="reactions.length" @mouseover="showReactions" @mouseout="hideReactions" @click="showReactions" class="headerReactionCount noselect">
        {{ reactions.length + ' reaction' + (reactions.length > 1 ? 's' : '') }}
      </div>
      <span class="headerVoteSeparator" v-show="votes.length && reactions.length"> &vert; </span>
      <span v-show="votes.length" class="headerScore"> Score: </span> 
      <span v-show="votes.length"
        :class="{positivePostScore: (postScore > 1), negativePostScore: (postScore < -1), headerPostScore: true, noselect: true}">
        {{ (postScore >= 0 ? '+' : '') }}{{ postScore }}
      </span>
    </div>
    <transition name="reactionTransition">
      <div v-if="reactionVisible" :style="{right: reactionPos.x + 'px', top: reactionPos.y + 'px'}" class="headerReactions">
        <ul v-click-away="hideReactions"class="headerReactionList"> 
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
      reactionVisible: false,
      reactionPos: {x: 50, y: 50}
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
    showReactions (e) {
      this.reactionPos = {x: window.innerWidth - e.pageX - 15, y: 50}
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
    font-weight: bold;
    cursor: pointer;
  }

  .headerVoteSeparator {
    font-size: 12px;
    color: black;
  }

  .headerPostScore {
    font-size: 12px;
    font-weight: normal;
    color: #999;
  }

  .positivePostScore {
    color: #4dad3e;
    font-weight: bold;
  }

  .negativePostScore {
    color: #ad3e3e
  }

  .headerReactions {
    font-size: 14px;
    position: absolute;
    font-weight: normal;
    top: 30px;
    padding: 10px;
    border: 1px solid #777;
    border-radius: 3px;
    background-color: white;;
    z-index: 222;
    box-shadow: 2px 2px 5px #DDD;
  }

  .headerScore {
    font-size: 12px;
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

  .headerTop {
    height: 24px;
    line-height: 24px;
    border-bottom: 1px solid #DDD;   
  }

  .headerBottom {
    text-align: right;
    height: 18px;
    line-height: 18px;
    padding: 0 1em;
  }

  .postHeader {
    font-weight: normal;
    position: relative;
    color: black; 
  }

  .postUsername {
      font-weight: bold;
      color: #aa4439;
      text-decoration: none;
    }

  .postUsername:hover {
    text-decoration: underline;
  }

  .postDatetime {
    font-weight: normal;
    font-size: 0.8em;
  }
  
  a.postDatetime {
    text-decoration: none;
    font-style: italic;
    color: inherit;
  }

  a.postDatetime:hover {
    text-decoration: underline;
  }


</style>
