<template>
  <div>
    <label class="userSearchLabel" for="userSearchInput"> Find a user: </label>
    <input class="userSearchInput" v-model="inputValue" name="userSearchInput" size="20">
    <a class="userSearchInputClear noselect" @click="reset"> x </a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    reset () {
      this.inputValue = ''
    }
  }
}

</script>

<style>
  .userSearchInputClear {
    cursor: pointer;
    font-weight: bold;
  }

  .userSearchInput {
    border: 0;
    border-bottom: 1px solid #AAA;
  }

  .userSearchLabel {
    font-weight: bold;
  }
</style>
