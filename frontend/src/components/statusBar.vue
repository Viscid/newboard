<template>
  <div v-show="visible" id="statusBar">
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
  padding: 0.25em;
  bottom: 0px;
  left: 0;
  font-size: 10px;
  font-weight: bold;
  height: 12px;
}

</style>
