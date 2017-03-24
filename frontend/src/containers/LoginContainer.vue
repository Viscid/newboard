<template>
    <div id="LoginContainer">
        <h2> Login </h2>
        <loginForm></loginForm>
    </div>
</template>

<script>
import loginForm from '../components/loginForm'

export default {
  name: 'LoginContainer',
  data () {
    return {
      message: 'hi'
    }
  },
  components: {
    loginForm
  }
}
</script>

<style>
#LoginContainer {
  margin: 2em 0;
}

h2 {
  text-align: left;
  margin: 15px;
}


</style>
