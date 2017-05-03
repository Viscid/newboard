<template>
    <div id="LoginContainer">
        <h1> Login </h1>
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

}

h1 {
  text-align: left;
  margin: 10px 15px 40px 15px;
}


</style>
