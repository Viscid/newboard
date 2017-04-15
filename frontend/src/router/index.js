import Vue from 'vue'
import Router from 'vue-router'
import HomeContainer from '@/containers/HomeContainer'
import RegistrationContainer from '@/containers/RegistrationContainer'
import LoginContainer from '@/containers/LoginContainer'
import ProfileContainer from '@/containers/ProfileContainer'
import ComposerContainer from '@/containers/ComposerContainer'
import ReplyContainer from '@/containers/ReplyContainer'
import PostViewerContainer from '@/containers/PostViewerContainer'

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
    },
    {
      path: '/compose',
      name: 'Compose',
      component: ComposerContainer
    },
    {
      path: '/reply/:slug',
      name: 'Reply',
      component: ReplyContainer
    },
    {
      path: '/p/:slug',
      name: 'PostViewer',
      component: PostViewerContainer
    }
  ]
})
