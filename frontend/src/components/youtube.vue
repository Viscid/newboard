<template>
  <div>
    <div v-if="!active" @mouseover="onMouseOver" @mouseout="onMouseOut" @click="loadYoutube" class="youtubeEmbed" :style="{ 
      height: height + 'px',
      width: width + 'px',
      'background-image': 'url(https://img.youtube.com/vi/' + id + '/hqdefault.jpg)'
      }">
      <img class="youtubePlayButton" v-show="hover" src="../assets/icons/play.svg" :style="{left: (width/2 - 32) + 'px', top: (height/2 - 32) + 'px'}">
    </div>
    <iframe v-else :height="height" :width="width" :src="'https://www.youtube.com/embed/' + id + '?autoplay=1'" frameborder="0" allowfullscreen="true"> </iframe>
  </div>
</template>

<script>
export default {
  props: ['height', 'width', 'id', 'href'],
  data () {
    return { active: false, hover: false }
  },
  methods: {
    loadYoutube () { this.active = true },
    onMouseOver () { this.hover = true },
    onMouseOut () { this.hover = false }
  }
}
</script>

<style>
  .youtubeEmbed {
    background-size: contain;
    cursor: pointer;
    position: relative;
  }

  .youtubePlayButton {
    height: 64px;
    width: 64px;
    position: absolute;
    opacity: 0.5;
  }
</style>
