<template>
    <div id="menuBar"> 
      <router-link to="/"> Home </router-link>
      <router-link to="compose"> Compose </router-link>         
      <router-link v-show="!isLoggedIn" to="login"> Login </router-link>
      <router-link v-show="!isLoggedIn" to="registration"> Register </router-link>
      <router-link to="profile"> {{ getUser.username }}  </router-link>
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
  }
}
</script>

<style scoped>
  #menuBar {
    background-color: #394;
    padding: 0.25em;
    margin: 0;
    text-align: left;
  }

  a {
    display: inline-block;
    text-decoration: none;
    margin-right: 1em;
    color: #FFF;
  }

  a:hover {
    color: #FFA;
  }
</style>
