<template>
  <div id="adminUsersContainer">
    <h1> Users </h1>
    <adminUserList :users="users"></adminUserList>
  </div>
</template>

<script>
import adminUserList from '@/components/adminUserList.vue'

export default {
  name: 'AdminUsers',
  components: {
    adminUserList
  },
  created () {
    this.$store.dispatch('fetchAdminUserList')
  },
  computed: {
    users () {
      return this.$store.state.admin.users
    }
  }
}

</script>
