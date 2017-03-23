<template>
    <div>
        <h1> Login </h1>
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
