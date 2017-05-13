<template>
  <div id="adminUserList">
    <table>
      <thead>
        <td> Username </td> <td> Role </td> <td> Registered </td> 
      </thead>
      <tr v-for="user in users">
        <td> {{ user.username }} </td>
        <td> 
          <select v-model="user.role" @change="changeUserRole($event, user.username)">
            <option>admin</option>
            <option>mod</option>
            <option>user</option>
            <option>unvalidated</option>
            <option>banned</option>
          </select>
        </td>
        <td> {{ getDate(user.registrationDate, 'MMMM Do, YYYY @ h:mm:ssa') }} </td>
      </tr>
    </table>

  </div>
</template>

<script>
import fecha from 'fecha'
export default {
  name: 'adminUserList',
  props: {
    users: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  methods: {
    getDate (date, format) {
      return fecha.format(new Date(date), format)
    },
    changeUserRole (e, username) {
      let newRole = e.target.value
      this.$store.dispatch('adminChangeUserRole', { role: newRole, username })
    }
  }
}
</script>

<style scoped>
  td {
    min-width: 150px;
  }

  thead {
    font-weight: bold;
  }

</style>
