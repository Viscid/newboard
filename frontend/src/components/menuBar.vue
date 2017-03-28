<template>
    <div id="menuBar"> 
      <router-link to="/"> Home </router-link><!--
      --><router-link v-show="isLoggedIn" to="compose"> Compose </router-link><!--       
      --><router-link v-show="!isLoggedIn" to="login"> Login </router-link><!--
      --><router-link v-show="!isLoggedIn" to="registration"> Register </router-link><!--
      --><router-link v-show="isLoggedIn" to="profile"> {{ getUser.username }}  </router-link><!--
      --><a @click="logout" v-show="isLoggedIn" to="logout"> Logout </a>
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
    background-color: #AA4439;
    margin: 0;
    text-align: left;
    height: 50px;
    line-height: 50px;
  }

  a {
    display: inline-block;
    text-decoration: none;
    color: #FFF;
    padding: 0 1em;
    margin: 0;
    transition: background-color 0.5s;
    cursor: pointer;
  }

  a:hover {
    background-color: #8c352b;
  }
</style>
