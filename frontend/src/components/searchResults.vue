<template>

  <table v-show="results.length">
      <thead> <td> User </td> <td> Message </td> <td> Date &amp; Time </td> </thead>
      <result v-for="result in results" :key="result._id" :value="result"> </result>
  </table>

</template>

<script>
import result from '@/components/result.vue'

export default {
  name: 'SearchResults',
  props: ['results'],
  components: { result }
}

</script>

<style>
thead {
  font-weight: bold;
}

table {
  margin: 0 auto;
}
</style>
