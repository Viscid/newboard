<template>
    <div id="menuBar"> 
      <router-link to="/" @click="setPage" > Home </router-link><!--
      --><router-link v-show="isLoggedIn" :to="{ name: 'Compose' }"> Compose </router-link><!--       
      --><router-link v-show="!isLoggedIn" :to="{ name: 'Login' }"> Login </router-link><!--
      --><router-link v-show="!isLoggedIn" :to="{ name: 'Registration' }"> Register </router-link><!--
      --><router-link v-show="isLoggedIn" :to="{ name: 'Search' }"> Search </router-link><!--
      --><router-link v-if="username" class="profileLink" v-show="isLoggedIn" :to="{ name: 'UserProfile', params: { username } }"> {{ username }}  </router-link><!--
      --><router-link v-show="(isLoggedIn && isAdmin)" :to="{ name: 'AdminPanel' }"> Admin </router-link><!--
      --><a @click="logout" v-show="isLoggedIn"> Sign out </a>
    </div>
</template>

<script>
export default {
  computed: {
    username () {
      return this.$store.state.user.username
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
    }
  }
}
</script>

<style scoped>
  #menuBar {
    background: #aa4439;
    margin: 0;
    text-align: left;
    height: 50px;
    line-height: 50px;
    min-width: 430px;
    padding: 0 1.25em;
  }

  a {
    display: inline-block;
    text-decoration: none;
    color: #DDD;
    padding: 0 0.5em;
    margin: 0;
    transition: color 0.25s;
    cursor: pointer;
  }

  a:hover {
    color: #FFF;
  }

  .profileLink {
    float: right;
    font-weight: bold;
    display: inline-block;
    color: white;
  }
</style>
