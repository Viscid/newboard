// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Root from './Root'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import VeeValidate from 'vee-validate'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import config from '../../config'
import vmodal from 'vue-js-modal'
import { sync } from 'vuex-router-sync'

export const SocketInstance = socketio(config.SOCKETIO_URL)

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(vmodal)
Vue.use(VeeValidate, { classNames: { invalid: 'invalid' } })

const appStore = new Vuex.Store(store)
sync(appStore, router)

Vue.use(VueSocketIO, SocketInstance, appStore)

Vue.directive('click-away', {
  inserted: function (el, binding) {
    setTimeout(() => {
      document.body.addEventListener('click', binding.value)
      document.body.addEventListener('touchstart', binding.value)
    }, 0)
  },
  unbind: function (el, binding) {
    document.body.removeEventListener('click', binding.value)
    document.body.removeEventListener('touchstart', binding.value)
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#root',
  router,
  store: appStore,
  template: '<Root/>',
  components: { Root }
})
