<template>
    <div id="LoginContainer">
      <div id="loginBox">
        <h2> Login </h2>
        <loginForm></loginForm>
      </div>
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
  width: 300px;
  margin: 0 auto;
  padding-top: 75px;
}

#loginBox {
    border: 1px solid #AAA;
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
  height: 30px;
  line-height: 30px;
  width: 100%;
}


</style>
