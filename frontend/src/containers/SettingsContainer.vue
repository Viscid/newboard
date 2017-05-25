<template>
 <div id="settingsContainer">
  <h2> Settings </h2>
  <input name="youTubeEmbed" type="checkbox" @click="setSetting" :checked="getSetting('youTubeEmbed')"></input> <label for="youTubeEmbed"> Embed YouTube videos </label> <br />
  <input name="postsPerPage" type="number" @input="setSetting" size="2" min="5" max="50" :value="getSetting('postsPerPage')"> <label for="postsPerPage"> Posts per page </label>
  </form>
 </div>
</template>

<script>
import debounce from 'debounce'

export default {
  name: 'SettingsContainer',
  created () {
    this.saveSettings = debounce(this.saveSettings, 1000)
  },
  methods: {
    getSetting (setting) {
      let settings = this.$store.state.settings
      switch (setting) {
        case 'youTubeEmbed':
          return ('youTubeEmbed' in settings) ? settings['youTubeEmbed'] : true
        case 'postsPerPage':
          return ('postsPerPage' in settings) ? settings['postsPerPage'] : 15
        default:
          return undefined
      }
    },
    setSetting (e) {
      let setting = e.target.name
      let p
      switch (setting) {
        case 'youTubeEmbed':
          p = this.$store.dispatch('changeSetting', {name: setting, value: e.target.checked})
          break
        case 'postsPerPage':
          p = this.$store.dispatch('changeSetting', {name: setting, value: Number(e.target.value)})
          break
        default:
          break
      }
      p.then(this.saveSettings())
    },
    saveSettings () {
      this.$store.dispatch('saveSettings', this.$store.state.settings)
    }
  }
}
</script>

<style scoped>

  #settingsContainer {
    padding: 1em;
  }

  input {
    margin: 0.5em;
  }

</style>
