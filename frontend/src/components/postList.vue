<template>

<ul>
  <li v-for="post in posts">
    <div class="postHeader">
      <span class="postUsername"> {{ post.username }} </span> -
      <span class="postDatetime"> {{ getDate(post.datetime, 'medium') }} </span>
    </div>
    <div class="postBody">
      <span class="postMessage"> {{ post.message }} </span>
    </div>
    <replyList post="post"></replyList>
  </li>
</ul>

</template>

<script>
import replyList from './replyList'
import fecha from 'fecha'

export default {
  name: 'postList',
  props: ['posts'],
  components: {
    replyList
  },
  methods: {
    getDate (date, style) {
      return fecha.format(new Date(date))
    }
  }
}
</script>

<style scoped>
  ul {
    padding: 0;
  }

  li {
    list-style: none;
    margin: 1em;
    margin-bottom: 0.5em;
    background-color: white;
    border-bottom: 2px solid #CCC;
  }

  .postUsername {
    font-weight: bold;
  }

  .postHeader {
    background-color: #8D2F5D;
    font-weight: bold;
    padding: 0.5em 1em;
    color: white;
    border-bottom: 2px solid #8D2F5D;
  }

  .postBody {
    padding: 1em;
    border-bottom: 1px dotted #DDD;
  }

  .postDatetime {
    font-weight: normal;
    font-style: italic;
  }

</style>
