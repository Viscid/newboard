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
  position: fixed;
  box-sizing: border-box;
  float: right;
  background-color: white;
  padding: 0 1em;
  top: 0;
  right: 0;
  font-size: 10px;
  text-align: right;
  font-weight: bold;

}

</style>
