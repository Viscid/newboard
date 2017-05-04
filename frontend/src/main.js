// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Root from './Root'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import VeeValidate from 'vee-validate'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VeeValidate, { classNames: { invalid: 'invalid' } })

const appStore = new Vuex.Store(store)

/* eslint-disable no-new */
new Vue({
  el: '#root',
  router,
  store: appStore,
  template: '<Root/>',
  components: { Root }
})
