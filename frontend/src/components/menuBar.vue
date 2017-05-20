<template>
    <div id="menuBar"> 
      <router-link :to="{ name: 'Home' }" @click="setPage" exact>
        <img height="24" width="24" class="mobile" src="../assets/icons/Home.svg" />
        <span class="screen"> Home </span>
      </router-link><!--
      --><router-link class="composeLink" v-show="isLoggedIn" :to="{ name: 'Compose' }"  exact>
        <img height="24" width="24" class="mobile" src="../assets/icons/Compose.svg" />
        <span class="screen"> Compose </span>
      </router-link><!--
      --><a class="newPost" @click="getNewPosts" v-if="(Number(newPosts) === 1)"> New post! </a><!--
      --><a class="newPost" @click="getNewPosts" v-else-if="(Number(newPosts) > 1)"> {{ newPosts }} new posts! </a><!--
      --><router-link v-show="!isLoggedIn" :to="{ name: 'Login' }"  exact> Login </router-link><!--
      --><router-link v-show="!isLoggedIn" :to="{ name: 'Registration' }"  exact> Register </router-link><!--
      --><router-link v-show="isLoggedIn" :to="{ name: 'Search' }"  exact>
        <img height="24" width="24" class="mobile" src="../assets/icons/Search.svg" />
        <span class="screen"> Search </span>
      </router-link><!--
      --><router-link v-if="username" class="profileLink" v-show="isLoggedIn" :to="{ name: 'UserProfile', params: { username } }"  exact>
        <img height="24" width="24" class="mobile" src="../assets/icons/Profile.svg" />
        <span class="screen"> {{ username }} </span>
      </router-link><!--
      --><router-link v-show="(isLoggedIn && isAdmin)" :to="{ name: 'AdminPanel' }"  exact> Admin </router-link><!--
      --><a class="signoutButton" @click="logout" v-show="isLoggedIn"> Sign out </a>
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
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/')
      })
    },
    setPage () {
      this.$store.dispatch('setPage', 1)
    },
    getNewPosts () {
      this.$store.dispatch('getNewPosts')
    }
  }
}
</script>

<style scoped>
@media(max-width: 500px) {
  .mobile { display: inline-block; }
  .screen { display: none; }
}

@media(min-width: 501px) {
  .mobile { display: none; }
  .screen { display: normal; }
}

  .router-link-active {
    opacity: 1;
  }

  .mobile {
    line-height: 50px;
    margin-bottom: -5px;
    transition: opacity 0.25s;
  }

  .mobile:hover {
    opacity: 1;
    color: white;
  }

  #menuBar {
    background: #aa4439;
    line-height: 50px;
    padding: 0 1.25em;
    height: 50px;
  }

  a {
    text-decoration: none;
    color: #FFF;
    padding: 0 0.5em;
    margin: 0;
    opacity: 0.5;
    transition: color 0.25s;
    cursor: pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;    
  }

  a:hover {
    opacity: 1;
  }

  .profileLink {
    float: right;
    font-weight: bold;
    display: inline-block;
    opacity: 1;
    color: white;
  }

  .newPost {
    font-weight: bold;
    color: white;
  }

  .signoutButton {
    display: block;
    float: right;
    opacity: 1;
    color: #DDD;
  }
</style>
