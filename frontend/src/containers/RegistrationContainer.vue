<template>
    <div>
        <h1> Registration </h1>
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
