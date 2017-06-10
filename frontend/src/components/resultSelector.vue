<template>
  <div>
    <ul>
      <li :key="result._id" v-for="result in results">
        <a @mouseover="hoverResult(result[field])" @click="selectResult(result[field])"> {{ result[field] }} </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['results', 'field'],
  methods: {
    hoverResult (result) {
      this.$emit('resultHover', result)
    },
    selectResult (result) {
      this.$emit('resultSelected', result)
    }
  }
}
</script>

<style scoped>
ul { margin-left: 2em; margin-top: 1em; }
a { cursor: pointer; }
a:hover { font-weight: bold; }
</style>
