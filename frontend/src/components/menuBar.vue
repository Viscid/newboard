<template>
    <div id="menuBar"> 
      <router-link to="/"> Home </router-link><!--
      --><router-link v-show="isLoggedIn" :to="{ name: 'Compose' }"> Compose </router-link><!--       
      --><router-link v-show="!isLoggedIn" :to="{ name: 'Login' }"> Login </router-link><!--
      --><router-link v-show="!isLoggedIn" :to="{ name: 'Registration' }"> Register </router-link><!--
      --><router-link v-show="isLoggedIn" :to="{ name: 'Profile' }"> {{ getUser.username }}  </router-link><!--
      --><a @click="logout" v-show="isLoggedIn"> Logout </a>
    </div>
</template>

<script>
export default {
  computed: {
    getUser () {
      return this.$store.state.user
    },
    isLoggedIn () {
      return 'username' in this.$store.state.user
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>
  #menuBar {
    background: linear-gradient(to bottom, #ff5656 30%, #aa4439 100%);
    margin: 0;
    text-align: left;
    height: 50px;
    line-height: 50px;
  }

  a {
    display: inline-block;
    text-decoration: none;
    color: #DDD;
    padding: 0 1em;
    margin: 0;
    transition: color 0.25s;
    cursor: pointer;
  }

  a:hover {
    color: #FFF;
  }
</style>
