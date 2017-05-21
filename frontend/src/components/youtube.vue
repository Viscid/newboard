<template>
  <div>
    <div v-if="!active" @click="loadYoutube" class="youtubeEmbed" :style="{ 
      height: height + 'px',
      width: width + 'px',
      'background-image': 'url(https://img.youtube.com/vi/' + id + '/sddefault.jpg)'
      }">
    </div>
    <iframe v-else :height="height" :width="width" :src="'http://www.youtube.com/embed/' + id + '?autoplay=1'" frameborder="0" allowfullscreen="true"> </iframe>
  </div>
</template>

<script>
export default {
  props: ['height', 'width', 'id'],
  data () {
    return { active: false }
  },
  methods: {
    loadYoutube () { this.active = true }
  }
}
</script>

<style>
  .youtubeEmbed {
    background-size: contain;
    cursor: pointer;
  }
</style>
