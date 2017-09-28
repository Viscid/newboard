<template>
    <div class="userSearchInputContainer">
      <input 
      placeholder="Username" 
      @keydown.enter="selectUser(currentIndex)" 
      @keydown.down="peekNext" 
      @keydown.up="peekPrev" 
      class="userSearchInput" 
      @keyup="inputChange"
      v-model="inputValue" 
      name="userSearchInput" 
      ref="userSearchInput" 
      size="20">
      <a class="userSearchInputClear noselect" @click="reset"> (clear) </a>
      <ul class="userSearchResults" v-show="inputValue.length > 0">
        <li class="userResult" @click="selectUser(index)"
          :class="{ selected: (currentIndex === index)}"
          @mouseover="peekUser(index)" 
          :key="user._id"
          v-for="(user, index) in foundUsers" 
          :value="user.username"> {{ user.username }} </li>
      </ul>
    </div>
</template>

<script>
import debounce from 'debounce'

export default {
  data () {
    return {
      inputValue: '',
      foundUsers: [],
      selectedResult: '',
      currentIndex: -1
    }
  },
  props: ['enabled'],
  created () {
    this.inputChange = debounce(this.inputChange, 200)
  },
  mounted () {
    this.$refs.userSearchInput.focus()
  },
  methods: {
    reset () {
      this.inputValue = ''
      this.$refs.userSearchInput.focus()
      this.foundUsers = []
      this.currentIndex = -1
      this.$emit('clear')
    },
    inputChange (e) {
      this.$emit('clear')
      this.$store.dispatch('findUser', this.inputValue).then((users) => {
        if (typeof (users) === 'object') this.foundUsers = users
        else this.foundUsers = []
      })
    },
    inputBlur () {
      this.foundUsers = []
    },
    peekUser (index) {
      this.currentIndex = index
    },
    peekNext () {
      this.currentIndex++
      this.peekUser(this.currentIndex)
    },
    peekPrev () {
      if (this.currentIndex >= -1) this.currentIndex--
      this.peekUser(this.currentIndex)
    },
    selectUser (index) {
      let username = (this.foundUsers[index] && 'username' in this.foundUsers[index]) ? this.foundUsers[index].username : this.inputValue
      this.$emit('selected', username)
      this.$refs.userSearchInput.blur()
      this.inputValue = username
      this.foundUsers = []
      this.currentIndex = -1
    }
  }
}

</script>

<style scoped>

  .selected {
     font-weight: bold;
  }

  .userSearchResults {
    position: absolute;
    top: calc(20px + 0.75em);
    background-color: white;
    padding: 0.5em;
    width: 250px;
  }

  .userSearchInputContainer {
    display: inline-block;
    position: relative;
    border-bottom: 1px solid #AAA;
  }

  .userSearchInputClear {
    cursor: pointer;
    font-style: italic;
    color: #AAA;
  }

  .userSearchInput {
    border: 0;
    
    outline: 0;
    height: 20px;
    padding: 0.25em 0;
    font-size: 20px;
  }

  .userSearchLabel {
    font-weight: bold;
    font-size: 20px;
  }

  .userResult {
    padding: 0.1em;
    cursor: pointer;
  }
</style>
