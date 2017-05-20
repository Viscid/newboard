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
  props: ['page', 'length', 'pageSize'],
  methods: {
    setPage (n) {
      this.$emit('pageChange', n)
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
   margin: 10px 8px 0 8px;
   list-style: none;
   display: inline-block;
 }

 a {
   cursor: pointer;
 }

 .paginatorFirst, .paginatorLast {
   font-size: 15px;
 }

 .paginatorPage {
   font-size: 15px;
 }

 .active {
   font-size: 1.25em;
 }

</style>
