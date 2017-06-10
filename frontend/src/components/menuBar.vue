<template>
    <div id="menuBar" class="noselect">
      <div class="menuBarLeft">
        <div @click="setPage">
          <router-link class="menuBarItem homeLink" :to="{ name: 'Home' }" exact>
            <img class="menuIcon" src="../assets/icons/Home.svg" />
            <div v-if="(Number(newPosts) >= 1)" class="newPostNotifier"> {{ newPosts }} </div>
          </router-link>
        </div><!--
        --><router-link class="menuBarItem composeLink" v-show="isLoggedIn" :to="{ name: 'Compose' }" exact>
          <img class="menuIcon" src="../assets/icons/Compose.svg" />
        </router-link><!--
        --><router-link class="menuBarItem onlineUsersLink" :to="{ name: 'OnlineUsers' }" exact> 
          <img class="menuIcon usersIcon" src="../assets/icons/Users.svg"> </img>
          <div class="onlineUsers"> {{ onlineUsers }} </div>
        </router-link><!--
        --><router-link class="menuBarItem" v-show="isLoggedIn" :to="{ name: 'Messages' }" exact>
          <img class="menuIcon" alt="Messages" src="../assets/icons/Messages.svg" />
        </router-link><!--        
        --><router-link class="menuBarItem" v-show="isLoggedIn" :to="{ name: 'Search' }" exact>
          <img class="menuIcon" alt="Search" src="../assets/icons/Search.svg" />
        </router-link><!--
        --><router-link class="menuBarItem" v-show="!isLoggedIn" :to="{ name: 'Login' }"  exact> Login </router-link><!--
        --><router-link class="menuBarItem" v-show="!isLoggedIn" :to="{ name: 'Registration' }"  exact> Register </router-link><!--
        --><router-link class="menuBarItem" v-show="(isLoggedIn && isAdmin)" :to="{ name: 'AdminPanel' }"  exact> Admin </router-link>
      </div>
      <div class="menuBarRight"><!--
        --><a v-if="username" @click="showModal" class="menuBarItem userMenuLink" v-show="isLoggedIn">
          <img class="menuIcon" src="../assets/icons/Profile.svg"></img>
          <span class="menuBarUsername"> {{ username }} </span>
        </a>
      </div>
      <modal :height="200" :width="300" :adaptive="true" name="userModal">
        <div class="modalContent">
          <span class="userMenuUsername"> {{ username }} </span>
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
    display: flex;
    position: fixed;
    width: 100%;
    background: #aa4439;
    z-index: 5;
    height: 3em;
  }

  .menuBarLeft {
    display: flex;
    flex: 1;
    align-items: center;
  }

  .menuBarRight {
    display: flex;
    flex: 1;
    padding-right: 1em;
    justify-content: flex-end;
    align-items: center;    
  }

  .menuBarItem {
    display: flex;
    align-items: center;
    justify-content: center;    
    height: 2.0em;
    margin-left: 1em;
  }

  a {
    display: block;
    text-decoration: none;
    color: #FFF;
    opacity: 0.5;
    transition: color 0.25s;
    cursor: pointer;
  }

  a:hover {
    opacity: 1;
  }

  .menuIcon {
    height: 1.5em;
    width: 1.5em;
    transition: opacity 0.25s;
  }

  .menuIcon:hover {
    opacity: 1;
    color: white;
  }

  .homeLink {
    position: relative;
  }

  .newPostNotifier {
    position: absolute;
    left: 1.2em;
    bottom: 1.25em;
    box-shadow: 2px 2px 2px #222;
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

  .userMenuLink {
    font-weight: bold;
    opacity: 1;
    color: white;
  }

  .menuBarUsername {
    padding: 0.25em;
  }

  .usersIcon {
    position: relative;
  }

  .onlineUsers {
    position: absolute;
    left: 1.8em;
    bottom: 1.5em;
    font-weight: bold;
    font-size: 0.8em;
  }

  .onlineUsersLink {
    position: relative;
  }

  .modalContent {
    text-align: center;
    box-sizing: border-box;
  }

  .userMenuUsername {
    display: block;
    margin: 0;
    font-size: 20px;
    line-height: 50px;
    background-color: #aa4439;
    color: white;
    height: 50px;
    padding: 0;
    width: 100%;
  }

  .userMenuListItem {
    display: block;
    color: black;
    text-align: left;
    height: 50px;
    line-height: 50px;
    padding-left: 1em;
    background-color: transparent;
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



</style>
