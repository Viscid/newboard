<template>
<div id="onlineUsersList">
  <h1> Online Users </h1>

  <ul>
    <li v-for="user in userList">
      {{ user }}
    </li>
  </ul>

  <span v-show="anonymousConnections"> ... and {{ anonymousConnections }} anonymous connection<span v-show="anonymousConnections > 1">s</span>. </span>

</div>


</template>

<script>
export default {
  name: 'OnlineUsers',
  computed: {
    userList () {
      return this.$store.state.onlineUsers
    },
    anonymousConnections () {
      return (this.$store.state.onlineUserCount - this.$store.state.onlineUsers.length)
    }
  }
}

</script>

