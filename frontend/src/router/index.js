import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/components/Test'
import RegistrationContainer from '@/containers/RegistrationContainer'
import LoginContainer from '@/containers/LoginContainer'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Test',
      component: Test
    },
    {
      path: '/registration',
      name: 'Registration',
      component: RegistrationContainer
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginContainer
    }
  ]
})
