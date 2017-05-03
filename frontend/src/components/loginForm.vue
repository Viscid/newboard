<template>
    <form @submit.prevent="submitRegistration" id="loginForm">
      <h3> Username </h3>
        <input id="formUsername" class="field" v-model="username" autofocus/>
      <h3> Password </h3>
        <input id="formPassword" class="field" type="password" v-model="password">
      <br />
        <input class="submitButton" value="Submit" type="submit" />
    </form>
</template>

<script>
  export default {
    name: 'registrationForm',
    methods: {
      submitRegistration () {
        var user = { username: this.username, password: this.password }
        this.$store.dispatch('loginUser', user).then(() => {
          this.$router.push('/')
        })
      }
    },
    data () {
      return {
        username: undefined,
        password: undefined
      }
    }
  }
</script>

<style scoped>

#loginForm {
  margin: 15px;
}

form {
  text-align: left;
  width: 300px;
}

.field {
  width: 250px;
  margin-bottom: 1em;
  border: 0px;
  border-bottom: 1px solid #AAA;
  font-size: 20px;
  padding: 5px;
}

h3 {
  margin-bottom: 10px;
  text-align: left;
  font-size: 1em;
}

.submitButton {
  font-size: 18px;
}


</style>
