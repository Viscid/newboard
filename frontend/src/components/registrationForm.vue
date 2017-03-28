<template>
    <form @submit.prevent="submitRegistration" id="registrationForm">
      <h3> Username </h3>
        <input id="formUsername" class="field" v-model="username" />
      <h3> Password </h3>
        <input id="formPassword" class="field" type="password" v-model="password">
      <h3> E-mail </h3>
        <input id="formEmail" class="field" v-model="email">        
      <br />
        <input class="submitButton" value="Register" type="submit" />
    </form>
</template>

<script>
  export default {
    name: 'registrationForm',
    methods: {
      submitRegistration () {
        var user = { username: this.username, password: this.password }
        this.$store.dispatch('submitRegistration', user).then(() => {
          this.$router.push('/')
        })
        this.$store.dispatch('setStatus', 'Registering User')
      }
    },
    data () {
      return {
        username: undefined,
        password: undefined,
        email: undefined
      }
    }
  }
</script>

<style scoped>

#registrationForm {
  margin: 30px 15px;
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
  margin: 0;
  text-align: left;
  font-size: 1em;
}

.submitButton {
  font-size: 18px;
}

</style>
