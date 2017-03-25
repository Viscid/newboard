<template>

<ul>
  <li v-for="post in posts">
    <div class="postHeader">
      <span class="postUsername"> {{ post.username }} </span> @ <span class="postDatetime"> {{ post.datetime }} </span>
    </div>
    <div class="postBody">
      <span class="postMessage"> {{ post.message }} </span>
    </div>
  </li>
</ul>

</template>

<script>
export default {
  name: 'postList',
  props: ['posts']
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
    border: 1px solid #BBB;
    box-shadow: 3px 3px 5px 0px #AAA;
  }

  .postUsername {
    font-weight: bold;
  }

  .postHeader {
    background-color: #4f8ef2;
    font-weight: bold;
    color: white;
    padding: 0.25em 1em;
  }

  .postBody {
    padding: 1em;
  }

  .postDatetime {
    font-weight: normal;
  }
</style>
