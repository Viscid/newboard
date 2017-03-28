<template>

<ul>
  <li v-for="post in posts">
    <div class="postHeader">
      <span class="postUsername"> {{ post.username }} </span> -
      <span class="postDatetime"> {{ getDate(post.datetime, 'MMMM Do, YYYY @ h:mm:ssa') }} </span>
      <a class="replyButton"> reply </a>
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
      return fecha.format(new Date(date), style)
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
  }

  .postUsername {
    font-weight: bold;
    color: #aa4439;
  }

  .postHeader {
    background-color: white;
    font-weight: bold;
    padding: 0.5em 1em;
    color: black;
    border-bottom: 1px solid #AAA;
  }

  .postBody {
    padding: 1em;
    border-bottom: 1px dotted #DDD;
  }

  .postDatetime {
    font-weight: normal;
    font-size: 0.8em;
  }

  .replyButton {
    float: right;
    display: block;
    font-weight: normal;
  }

</style>
