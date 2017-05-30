<template>
  <div>
    <label for="searchInput"> Find </label> <input placeholder="something" @input="onChange" name="searchInput" ref="searchInput"> </input> <a @click="clear"> X </a>
  </div>
</template>

<script>
export default {
  name: 'searchInput',
  mounted () {
    this.$refs.searchInput.focus()
  },
  methods: {
    onChange (e) {
      this.$emit('input', e.target.value)
    },
    clear () {
      this.$refs.searchInput.value = ''
      this.$store.dispatch('clearSearchResults')
    }
  }
}
</script>

<style scoped>

  div {
    text-align: center;
  }

  input {
    display: inline-block;
    padding: 5px;
    font-size: 30px;
    margin: 1em auto;
    width: 50%;
    max-width: 1000px;
    min-width: 250px;
    border: 0;
    border-bottom: 1px solid black;
    outline: 0;
    font-weight: normal;
  }

  label {
    line-height: 3em;
    font-weight: bold;
    font-size: 30px;
  }

  a {
    cursor: pointer;
  }

  a:hover {
    color: red;
  }

</style>
