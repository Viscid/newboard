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
  data () {
    return {
      message: 'hi'
    }
  },
  components: {
    'registrationForm': registrationForm
  }
}
</script>

<style scoped> 
#registrationContainer {
  margin: 2em 0;
}

h2 {
  text-align: left;
  margin: 15px;
  padding: 0;
}
</style>
