<template>
    <form v-if="!destroying" @submit.prevent="submitRegistration" id="registrationForm">
      <h3> Username </h3>
        <input ref="username" name="username" v-validate="'required|alpha_dash|max:15'" id="formUsername" class="field" v-model="username" />
        <span class="error" v-show="errors.has('username')"> {{ errors.first('username') }} </span>  
      <h3> Password </h3>
        <input ref="password" ame="password" v-validate="'required|max:200'" id="formPassword" class="field" type="password" v-model="password">
        <span class="error" v-show="errors.has('password')"> {{ errors.first('password') }} </span>  
      <h3> E-mail </h3>
        <input ref="email" name="email" v-validate="'required|email'" id="formEmail" class="field" v-model="email">
        <span class="error" v-show="errors.has('email')"> {{ errors.first('email') }} </span>
      <br />
        <input class="registerButton" value="Register" type="submit" />
    </form>
    
</template>

<script>
  export default {
    name: 'registrationForm',
    methods: {
      submitRegistration () {
        if (!this.errors.any()) {
          var user = { username: this.username, password: this.password, email: this.email }
          this.$store.dispatch('submitRegistration', user)
          .then(() => {
            this.$refs.username.blur()
            this.$refs.password.blur()
            this.$refs.email.blur()
            setTimeout(() => {
              this.$router.push('/')
            }, 10)
          })
          .catch((error) => {
            let serverError = error.response.data
            if (serverError.type === 'USERNAME_TAKEN') this.errors.add('username', serverError.message)
            if (serverError.type === 'EMAIL_USED') this.errors.add('email', serverError.message)
          })
          this.$store.dispatch('setStatus', 'Registering User')
        }
      },
      changeDestroying () {
        this.destroying = !this.destroying
      }
    },
    data () {
      return {
        username: undefined,
        password: undefined,
        email: undefined,
        destroying: false
      }
    },
    beforeDestroy () {
      this.destroying = true
    }
  }
</script>

<style scoped>

#registrationForm {
  margin: 30px 15px;
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
  text-align: left;
  font-weight: normal;
  margin: 10px 0;
  font-size: 1em;
  font-weight: bold;
}

.registerButton {
  font-size: 18px;
  background-color: white;
  border: 1px solid black;
  margin-top: 2em;
  padding: 0.25em;
  width: 100%;
  cursor: pointer;
}

.invalid {
  border: 1px solid red;
}

.registerButton:hover {
  background-color: #aa4439;
  color: white;
  border: 1px solid white;
}

.error {
  color: red;
  display: inline-block;
  margin: 0 0 15px 0;
  font-size: 0.8em;
  font-weight: bold;
}


</style>
