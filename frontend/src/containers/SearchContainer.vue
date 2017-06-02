<template>
    <div id="searchContainer">
      <searchInput @input="onChange"> </searchInput>
      <searchResults :results="results"> </searchResults>
    </div>
</template>

<script>
import searchInput from '@/components/searchInput.vue'
import searchResults from '@/components/searchResults.vue'

export default {
  name: 'SearchContainer',
  components: { searchInput, searchResults },
  computed: {
    results () {
      return this.$store.state.searchResults
    }
  },
  methods: {
    onChange (val) {
      this.$store.dispatch('search', val)
    }
  }
}
</script>
