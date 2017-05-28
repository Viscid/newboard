<template>
 <div id="settingsContainer">
  <h2> Settings </h2>
    <div class="settingGroup">
      <div class="settingsFormInput">
        <input name="youTubeEmbed" type="checkbox" @click="setSetting" :checked="getSetting('youTubeEmbed')"></input>
      </div>
      <label class="settingsFormLabel" for="youTubeEmbed"> Embed YouTube videos </label>
    </div>
    
    <div class="settingGroup">
      <div class="settingsFormInput">
        <select name="dateTimeFormat" @change="setSetting">
          <option value="absolute" :selected="getSetting('dateTimeFormat') === 'absolute'"> Absolute </option>
          <option value="relative" :selected="getSetting('dateTimeFormat') === 'relative'"> Relative </option>
        </select>
      </div>
      <label class="settingsFormLabel" for="dateTimeFormat"> Date &amp; Time Format </label>
    </div>

    <div class="settingGroup">
      <div class="settingsFormInput">
        <input name="postsPerPage" type="number" @input="setSetting" size="2" min="5" max="50" :value="getSetting('postsPerPage')">
      </div>
      <label class="settingsFormLabel" for="postsPerPage"> Posts per page </label>
    </div>
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
        case 'dateTimeFormat':
          return ('dateTimeFormat' in settings) ? settings['dateTimeFormat'] : 'absolute'
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
        case 'dateTimeFormat':
          p = this.$store.dispatch('changeSetting', {name: setting, value: e.target.value})
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

  .settingsFormInput {
    display: inline-block;
    width: 100px;
    text-align: right;
    margin-right: 1em;
  }

  .settingGroup {
    margin: 0.5em 0;
  }

  input {
    margin: 0;
    padding: 0;
  }

  .settingsFormLabel {
    display: inline-block;
  }

  #settingsContainer {
    padding: 1em;
  }


</style>
