<template>
    <form @submit.prevent="submitRegistration" id="loginForm">
      <h3> Username </h3>
        <input ref='usernameField' id="formUsername" class="field" v-model="username" autofocus/>
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
    mounted () {
      this.$refs.usernameField.focus()
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
}

.field {
  width: 250px;
  margin-bottom: 1em;
  border: 0px;
  border-bottom: 1px solid #AAA;
  font-size: 20px;
  padding: 5px;
  outline: none;
}

h3 {
  margin-bottom: 10px;
  text-align: left;
  font-size: 1em;
  font-weight: normal;
}

.submitButton {
  font-size: 18px;
  background-color: white;
  border: 1px solid black;
  padding: 0.25em;
  width: 100%;
  cursor: pointer;
}

.submitButton:hover {
  background-color: #aa4439;
  color: white;
  border: 1px solid white;
}


</style>
