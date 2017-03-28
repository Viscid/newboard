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
  components: {
    loginForm
  }
}
</script>

<style scoped>
#LoginContainer {
  margin: 2em 0;
}

h2 {
  text-align: left;
  margin: 30px 15px;
}


</style>
