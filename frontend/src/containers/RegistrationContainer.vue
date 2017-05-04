<template>
    <div id="registrationContainer">
        <h2> Registration </h2>
        <registrationForm></registrationForm>
    </div>
</template>

<script>
import registrationForm from '../components/registrationForm'

export default {
  name: 'RegistrationContainer',
  components: {
    'registrationForm': registrationForm
  }
}
</script>

<style scoped> 
#registrationContainer {
  display: block;
  margin: 2em auto;
  padding: 0;
  border: 1px solid #AAA;
  width: 300px;
}

h2 {
  display: inline-block;
  background-color: #aa4439;
  color: white;
  text-align: center;
  padding: 5px 0;
  border-bottom: 1px solid #DDD;
  margin: 0;
  width: 100%;
}
</style>
