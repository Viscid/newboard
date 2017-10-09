<template>
  <div class="postHeader">
    <div class="headerTop">
      <router-link class="postUsername" :to="{ name: 'UserProfile', params: { username: post.username }}"> {{ post.username }} </router-link> 
      <span class="onlineDot" v-show="isOnline(post.username)"> &bull; </span> -
      <router-link class="postDatetime" :to="{ name: 'PostViewer', params: { slug: post.slug } }">  {{ date }} </router-link>
    </div>
    <div class="headerBottom">
      <span v-show="votes.length" class="headerScore"> Score: </span> 
      <span v-show="votes.length"
        :class="{positivePostScore: (postScore > 1), negativePostScore: (postScore < -1), headerPostScore: true, noselect: true}">
        {{ (postScore >= 0 ? '+' : '') }}{{ postScore }}
      </span>
    </div>
  </div>
</template>

<script>
import fecha from 'fecha'
import RelativeTime from '../helpers/RelativeTime'

export default {
  props: ['post', 'settings'],
  data () {
    return {
      timeNow: Date.now(),
      votes: ('votes' in this.post) ? this.post.votes : []
    }
  },
  mounted () {
    if (this.$props.settings['dateTimeFormat'] === 'relative') this.interval = setInterval(() => { this.timeNow = Date.now() }, 10000)

    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'addVote') {
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
