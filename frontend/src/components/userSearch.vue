<template>
  <div>
    <label class="userSearchLabel" for="userSearchInput"> Find a user: </label>
    <input class="userSearchInput" @keyup="findUser" v-model="inputValue" name="userSearchInput" size="20">
    <a class="userSearchInputClear noselect" @click="reset"> x </a>
    <resultSelector 
      @resultSelected="handleResult"
      @resultHover="handleHover"
      :results="results" 
      field="username"></resultSelector>
  </div>
</template>

<script>
import resultSelector from '@/components/resultSelector'
export default {
  data () {
    return {
      inputValue: '',
      results: []
    }
  },
  components: {
    resultSelector
  },
  methods: {
    reset () {
      this.inputValue = ''
    },
    findUser () {
      this.$store.dispatch('findUser', this.inputValue).then((results) => {
        this.results = results
      })
    },
    handleHover (result) {
      this.inputValue = result
    },
    handleResult (result) {
      this.$router.push('/messages/' + result)
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
    
  }
</style>
