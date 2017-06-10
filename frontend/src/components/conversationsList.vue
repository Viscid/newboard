<template>
  <div>
    <ul v-if="conversations.length">

    </ul>
    <h3 v-else> You have no prior conversations. </h3>
  </div>

</template>

<script>
export default {
  props: ['conversations']
}

</script>
