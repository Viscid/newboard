<template>
  <div v-if="visible" id="statusBar">
   {{ message }}
  </div>
</template>

<script>
export default {
  props: ['message', 'visible']
}

</script>

<style>
#statusBar {
  position: absolute;
  background-color: #F3F3F3;
  width: 100%;
  bottom: 0;
  left: 0;
  font-size: 10px;
  font-weight: bold;
  height: 12px;
}

</style>
