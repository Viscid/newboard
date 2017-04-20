<template>
  <div>
    <a v-if="page > 5" class="paginatorFirst" @click="setPage(1)"> First </a>
    <ul>
      <li class="paginatorPage" v-if="page <= 5" v-for="n in 9"> <a @click="setPage(n)"> <span :class="activePage(n) ? 'active' : ''"> {{ n }} </span> </a>  </li>
      <li class="paginatorPage" v-if="page > 5" v-for="n in 9"> <a @click="setPage( pageShift(n) )"> <span :class="activePage(pageShift(n)) ? 'active' : ''"> {{ pageShift (n) }} </span> </a> </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      page: 20
    }
  },
  methods: {
    setPage (n) {
      this.page = n
      this.$store.dispatch('setPage', this.page)
    },
    pageShift (n) {
      return this.page - 5 + n
    },
    activePage (n) {
      return (this.page === n)
    }
  }
}
</script>

<style scoped>
 div {
   text-align: center;
   margin: 0 auto;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */   
 }

 ul {
   display: inline-block;
   margin: 0;
   padding: 0;
 }

 li {
   margin: 0.5em 0.5em 0.5em 0.5em;
   list-style: none;
   display: inline-block;
 }

 a {
   cursor: pointer;
 }

 .paginatorFirst, .paginatorLast {
   font-size: 0.9em;
   font-weight: bold;
 }

 .paginatorPage {
   font-size: 0.9em;
 }

 .active {
   text-decoration: underline;
 }

</style>
