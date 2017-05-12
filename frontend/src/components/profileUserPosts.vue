<template>
  <table>
    <thead> <td></td> <td> Message </td> <td> Date &amp; Time </td> </thead>
    <tr v-for="post in posts" class="userPost"> 
      <td class="username"> {{post.username}} </td>
      <td class="message"> 
        <router-link :to="{ name: 'PostViewer', params: { slug: post.slug } }">
          {{(post.message.length > 60)
           ? (post.message.substring(0, 60) + '...')
           : post.message}} 
        </router-link>
      </td>
      <td class="datetime"> {{getDate(post.datetime, 'MMMM Do, YYYY @ h:mm:ssa')}} </td>
    </tr>
  </table>

</template>

<script>
import fecha from 'fecha'
export default {
  props: ['posts'],
  methods: {
    getDate (date, format) {
      return fecha.format(new Date(date), format)
    }
  }
}
</script>

<style scoped>

  .username {
    font-weight: bold;
    color: #aa4439;
  }

  .message {
    display: block;
    overflow: hidden;
    word-break: break-all;
  }

  .message a {
    color: black;
    text-decoration: none;
  }

  .message a:hover {
    text-decoration: underline;
  }

  .datetime {
    font-size: 0.9em;
    font-style: italic;
  }

  table {
    margin: 0;
  }

  td {
    padding: 0.25em;
  }

</style>
