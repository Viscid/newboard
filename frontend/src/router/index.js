import Vue from 'vue'
import Router from 'vue-router'
import HomeContainer from '@/containers/HomeContainer'
import RegistrationContainer from '@/containers/RegistrationContainer'
import LoginContainer from '@/containers/LoginContainer'
import ProfileContainer from '@/containers/ProfileContainer'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeContainer
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
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileContainer
    }
  ]
})
