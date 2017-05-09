<template>
  <tr>
    <td class="username"> {{ value.username }} </td>
    <td class="message"> <router-link :to="{ name: 'PostViewer', params: { slug: value.slug } }"> {{ value.message }} </router-link> </td>
    <td class="datetime"> {{ getDate(value.datetime, 'MMMM Do, YYYY @ h:mm:ssa') }} </td>
  </tr>
</template>

<script>
import fecha from 'fecha'

export default {
  name: 'SearchResult',
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
