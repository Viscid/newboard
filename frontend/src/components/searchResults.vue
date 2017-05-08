<template>

  <ul>
    <li v-for="result in results">
      <result :key="result._id" :value="result"> </result>
    </li>
  </ul>

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

</style>
