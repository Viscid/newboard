<template>
  <div id="adminMenuBar">
    <router-link :to="{ name: 'UserAdmin' }"> Users </router-link>
    <router-link :to="{ name: '' }"> Pending Registrations </router-link>
  </div>
</template>

<script>
export default {
  name: 'adminMenuBar'
}
</script>

<style>
  #adminMenuBar {
    padding: 0.5em;
    background-color: #EEE;
  }

  #adminMenuBar a {
    display: inline-block;
    text-decoration: none;
    color: black;
    font-weight: bold;
    margin-right: 2em;
  }

  #adminMenuBar a:hover {
    text-decoration: underline;
  }

</style>
