<template>
    <form>
      <h3> Username </h3>
      <input class="field" />
      <h3> Password </h3>
      <input class="field" type="password">
      <br />
      <input value="Submit" type="submit" />
    </form>
</template>

<script>
  export default {
    name: 'registrationForm'
  }
</script>

<style>

form {
  padding: 1em;
  text-align: left;
  width: 300px;
}

.field {
  width: 250px;
  margin-bottom: 1em;
}

h3 {
  margin: 0;
  text-align: left;
}

</style>
