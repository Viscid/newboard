<template>
    <div id="ProfileContainer">
        <h2> Profile </h2>
        <userProfile></userProfile>
    </div>
</template>

<script>
import userProfile from '../components/userProfile'

export default {
  name: 'ProfileContainer',
  components: {
    userProfile
  }
}
</script>

<style>
#ProfileContainer {
  margin: 2em 0;
}
</style>
