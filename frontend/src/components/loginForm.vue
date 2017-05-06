<template>
    <form @submit.prevent="submitRegistration" id="loginForm">
      <h3> Username </h3>
        <input name="username" data-vv-validate-on="none" v-validate="'required'" ref='usernameField' id="formUsername" class="field" v-model="username" autofocus/>
        <span class="error" v-show="errors.has('username')"> {{errors.first('username')}} </span>
      <h3> Password </h3>
        <input name="password" data-vv-validate-on="none" v-validate="'required'" id="formPassword" class="field" type="password" v-model="password">
        <span class="error" v-show="errors.has('password')"> {{errors.first('password')}} </span>
      <br />
        <input class="submitButton" value="Submit" type="submit" />
    </form>
</template>

<script>
  export default {
    name: 'registrationForm',
    methods: {
      submitRegistration () {
        this.$validator.validateAll()
        .then(() => {
          var user = { username: this.username, password: this.password }
          this.$store.dispatch('loginUser', user)
          .then(() => {
            this.$router.push('/')
          })
          .catch((error) => {
            let serverError = error.response.data
            this.errors.add('username', serverError.message)
          })
        })
       .catch((errors) => {
         console.log(errors)
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
  border: 0px;
  border-bottom: 1px solid #AAA;
  font-size: 20px;
  padding: 5px;
  outline: none;
}

h3 {
  margin-top: 10px;
  text-align: left;
  font-size: 1em;
}

.submitButton {
  font-size: 18px;
  margin-top: 1em;
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

.error {
  display: inline-block;
  color: red;
  margin: 10px 0;
}


</style>
