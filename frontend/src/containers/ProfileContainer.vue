<template>
    <div v-if="hasProfile" id="ProfileContainer">
        <h1 class="profileUsername"> {{ username }} </h1>
        <hr>
        <profileInfoBox :profileInfo="profileInfo"></profileInfoBox>
        <h2 class="profileUserPostsHeader" :posts="userPosts"> {{ username }}'s Recent Posts </h2>
        <profileUserPosts :posts="userPosts"></profileUserPosts>
    </div>
</template>

<script>
import profileInfoBox from '@/components/profileInfoBox.vue'
import profileUserPosts from '@/components/profileUserPosts.vue'
import fecha from 'fecha'

export default {
  name: 'ProfileContainer',
  components: {
    profileInfoBox,
    profileUserPosts
  },
  data () {
    return {
      username: this.$route.params.username
    }
  },
  created () {
    this.$store.dispatch('fetchProfile', this.username)
  },
  destroyed () {
    this.$store.dispatch('clearActiveProfile')
  },
  computed: {
    userPosts () {
      return this.$store.state.activeProfile.lastPosts
    },
    profileInfo () {
      const dateFormat = 'MMMM Do, YYYY @ h:mm:ssa'
      let registrationDate = this.$store.state.activeProfile.registered || new Date(0)
      let lastPosted = ('lastPosts' in this.$store.state.activeProfile)
        ? this.$store.state.activeProfile.lastPosts[0].datetime
        : new Date(0)
      return [
        { description: 'Registered since', data: fecha.format(new Date(registrationDate), dateFormat) },
        { description: 'Last posted', data: fecha.format(new Date(lastPosted), dateFormat) }
      ]
    },
    hasProfile () {
      return ('registered' in this.$store.state.activeProfile)
    }
  }
}
</script>

<style scoped>
  #ProfileContainer {
    margin: 1em;
  }

  .profileUsername {
    color: #aa4439;
    margin-bottom: 0;
  }

  .profileUserPostsHeader {
    margin-top: 2em;
    color: #aa4439;
  }

  hr {
    border-style: solid;
    border-color: #CCC;
  }
</style>
