<template>
    <div id="LoginContainer">
        <h2> Login </h2>
        <registrationForm></registrationForm>
    </div>
</template>

<script>
import registrationForm from '../components/registrationForm'

export default {
  name: 'LoginContainer',
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

<style>
#LoginContainer {
  margin: 2em 0;
}

h2 {
  text-align: center;
}
</style>
