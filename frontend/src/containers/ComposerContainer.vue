<template>
  <div>
    <h2> Compose a Post </h2>
    <composerForm> </composerForm>
  </div>
</template>

<script>
  import composerForm from '../components/composerForm'

  export default {
    components: {
      composerForm
    }
  }

</script>

<style>

h2 {
  margin: 1em;
  text-align: center;
}

</style>
