<template>
    <div id="registrationContainer">
      <div id="registrationBox">
        <h2> Registration </h2>
        <registrationForm></registrationForm>
      </div>
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
  margin: 0 auto;
  padding-top: 75px;
  width: 300px;
}

#registrationBox {
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
