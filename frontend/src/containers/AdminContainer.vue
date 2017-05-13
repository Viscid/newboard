<template>
  <div>
    <adminMenuBar></adminMenuBar>
    <router-view> </router-view>
  </div>
</template>

<script>
import adminMenuBar from '@/components/adminMenubar.vue'

export default {
  components: {
    adminMenuBar
  }
}

</script>

