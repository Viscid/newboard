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
  display: block;
  margin: 2em auto;
  padding: 0;
  border: 1px solid #AAA;
  width: 300px;
}

h2 {
  display: inline-block;
  background-color: #aa4439;
  font-weight: normal;
  font-size: 1.2em;
  color: white;
  text-align: center;
  padding: 5px 0;
  border-bottom: 1px solid #DDD;
  margin: 0;
  width: 100%;
}


</style>
