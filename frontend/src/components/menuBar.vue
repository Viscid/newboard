<template>
    <div id="menuBar" class="noselect"> 
      <router-link class="homeLink" :to="{ name: 'Home' }" exact>
        <span @click="setPage">
          <img height="24" width="24" class="menuIcon" src="../assets/icons/Home.svg" />
          <div v-if="(Number(newPosts) >= 1)" class="newPostNotifier"> {{ newPosts }} </div>
        </span>
      </router-link><!--
      --><router-link class="composeLink" v-show="isLoggedIn" :to="{ name: 'Compose' }" exact>
        <img height="24" width="24" class="menuIcon" src="../assets/icons/Compose.svg" />
      </router-link><!--
      --><router-link v-show="!isLoggedIn" :to="{ name: 'Login' }"  exact> Login </router-link><!--
      --><router-link v-show="!isLoggedIn" :to="{ name: 'Registration' }"  exact> Register </router-link><!--
      --><router-link class="onlineUsersLink" :to="{ name: 'OnlineUsers' }" exact> 
        <img height="24" width="24" class="menuIcon usersIcon" src="../assets/icons/Users.svg"> </img>
        <div class="onlineUsers"> {{ onlineUsers }} </div>
      </router-link><!--
      --><router-link v-show="isLoggedIn" :to="{ name: 'Search' }" exact>
        <img height="24" width="24" class="menuIcon" alt="Search" src="../assets/icons/Search.svg" />
      </router-link><!--
      --><router-link v-show="(isLoggedIn && isAdmin)" :to="{ name: 'AdminPanel' }"  exact> Admin </router-link><!--
      --><a v-if="username" @click="showModal" class="userMenuLink" v-show="isLoggedIn">
        <img height="24" width="24" class="menuIcon" src="../assets/icons/Profile.svg"></img>
        <span class="menuIcon"> {{ username }} </span>
      </a>
      <modal :height="200" :width="300" :adaptive="true" name="userModal">
        <div class="modalContent">
          <span class="username"> {{ username }} </span>
          <ul class="userMenuList">
            <li class="userMenuListItem"> <router-link :to="{ name: 'UserProfile', params: { username }}"> <a  @click="closeModal"> My Profile </a> </router-link> </li>
            <li class="userMenuListItem"> <a @click="logout"> Sign Out </a> </li>
            <li class="userMenuListItem"> <router-link :to="{ name: 'Settings' }"> <a @click="closeModal"> Interface Settings </a> </router-link> </li>
          </ul>
        </div>
      </modal>
    </div>
</template>

<script>
export default {
  props: ['newPosts'],
  computed: {
    username () {
      return this.$store.state.user.username
    },
    isFetching () {
      return this.$store.state.fetching
    },
    isLoggedIn () {
      return 'username' in this.$store.state.user
    },
    isAdmin () {
      return (this.$store.state.user['role'] === 'admin')
    },
    onlineUsers () {
      return (this.$store.state.onlineUserCount)
    }
  },
  methods: {
    closeModal () {
      this.$modal.hide('userModal')
    },
    logout () {
      this.$router.push('/')
      this.$store.dispatch('logout').then(() => {
        this.$socket.emit('logout')
        this.$modal.hide('userModal')
      })
    },
    showModal () {
      this.$modal.show('userModal')
    },
    setPage () {
      if (this.$store.state.page !== 1) this.$store.dispatch('setPage', 1)
      if (this.$props.newPosts > 0) this.$store.dispatch('getThreads')
    }
  }
}
</script>

<style scoped>

  #menuBar {
    position: fixed;
    width: 100%;
    background: #aa4439;
    line-height: 50px;
    height: 50px;
    z-index: 5;
  }

  a {
    text-decoration: none;
    color: #FFF;
    padding: 0 0.5em;
    margin: 0;
    opacity: 0.5;
    transition: color 0.25s;
    cursor: pointer; 
  }

  a:hover {
    opacity: 1;
  }

  .userMenuLink {
    float: right;
    font-weight: bold;
    display: inline-block;
    opacity: 1;
    color: white;
  }

  .homeLink {
    position: relative;
    display: inline-block;
    height: 24px;
  }

  .newPostNotifier {
    position: absolute;
    right: -5px;
    top: 5px;
    background-color: white;
    border: 1px solid #666;
    color: black;
    height: 18px;
    width: 18px;
    font-size: 12px;
    text-align: center;
    font-weight: bold;
    line-height: 18px;
    border-radius: 4px;
  }

  .newPost {
    font-weight: bold;
    color: white;
  }

  .usersIcon {
    position: relative;
  }

  .onlineUsers {
    position: absolute;
    left: 32px;
    bottom: -8px;
    font-weight: bold;
    font-size: 12px;
  }

  .onlineUsersLink {
    position: relative;
  }

  .modalContent {
    text-align: center;
    box-sizing: border-box;
  }

  .username {
    display: block;
    margin: 0;
    font-size: 1.2em;
    background-color: #aa4439;
    color: white;
    padding: 0;
    width: 100%;
  }

  .userMenuListItem {
    display: block;
    color: black;
    text-align: left;
    background-color: transparent;
    margin: 0;
    padding: 0 1em;
    line-height: 50px;
  }

  .userMenuList {
    margin: 0;
    padding: 0;
  }

  .userMenuListItem a {
    background-color: none;
    color: black;
    padding: 0;
    opacity: 1;
  } 

  .userMenuListItem a:hover {
    color: #aa4439;
  }

  .router-link-active {
    opacity: 1;
  }

  .menuIcon {
    line-height: 50px;
    margin-bottom: -5px;
    transition: opacity 0.25s;
  }

  .menuIcon:hover {
    opacity: 1;
    color: white;
  }

</style>
