<template>
    <ul>
      <li v-for="item in profileInfo" class="profileInfoItem"> 
        <div class="profileInfoDescription"> {{item.description}}: </div>
        <div class="profileInfoData"> {{item.data}} </div>
      </li>                  
    </ul>
</template>

<script>
export default {
  props: ['profileInfo']
}
</script>

<style scoped>
  ul {
    margin: 1.5em 0;
  }

  .profileInfoItem {
    margin: 0.5em 0;
  }

  .profileInfoDescription {
    display: inline-block;
    font-weight: bold;
    width: 175px;
  }

  .profileInfoData {
    display: inline-block;
  }
</style>
