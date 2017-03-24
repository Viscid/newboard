<template>

<ul>
  <li v-for="post in posts">
    <span class="postUsername"> {{ post.user }} </span> <br />
    <span class="postMessage"> {{ post.message }} </span>
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
  li {
    list-style: none;
    padding: 1em;
    margin-bottom: 0.5em;
  }

  .postUsername {
    font-weight: bold;
  }
</style>
