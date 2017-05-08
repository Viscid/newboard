<template>
  <span>
    <span class="username"> {{ value.username }} </span>
    <span class="message"> <router-link :to="{ name: 'PostViewer', params: { slug: value.slug } }"> {{ value.message }} </router-link> </span>
    <span class="datetime"> {{ getDate(value.datetime, 'MMMM Do, YYYY @ h:mm:ssa') }} </span>
  </span>
</template>

<script>
import fecha from 'fecha'

export default {
  name: 'Search Result',
  props: ['value'],
  methods: {
    getDate (date, style) {
      return fecha.format(new Date(date), style)
    }
  }
}
</script>

<style>
  .username {
    font-weight: bold;
    color: #aa4439;
  }

  .message {
    font-style: italic;
    padding: 0.5em;
  }

  .datetime {
    font-size: 0.9em;
  }

  a {
    color: black;
    text-decoration: none;
  }

</style>
