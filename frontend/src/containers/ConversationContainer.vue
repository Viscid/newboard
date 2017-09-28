<template>
  <div>
    <conversation :user="username"> </conversation>
  </div>
</template>

<script>
import conversation from '@/components/conversation'

export default {
  data () {
    return {
      username: this.$route.params.username
    }
  },
  components: {
    conversation
  }

}

</script>
