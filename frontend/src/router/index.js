import Vue from 'vue'
import Router from 'vue-router'
import HomeContainer from '@/containers/HomeContainer'
import RegistrationContainer from '@/containers/RegistrationContainer'
import LoginContainer from '@/containers/LoginContainer'
import ProfileContainer from '@/containers/ProfileContainer'
import ComposerContainer from '@/containers/ComposerContainer'
import ReplyContainer from '@/containers/ReplyContainer'
import PostViewerContainer from '@/containers/PostViewerContainer'
import SearchContainer from '@/containers/SearchContainer'
import AdminContainer from '@/containers/AdminContainer'
import AdminUsersContainer from '@/containers/AdminUsersContainer'

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
    },
    {
      path: '/u/:username',
      name: 'UserProfile',
      component: ProfileContainer
    },
    {
      path: '/search',
      name: 'Search',
      component: SearchContainer
    },
    {
      path: '/admin',
      name: 'AdminPanel',
      component: AdminContainer,
      children: [
        {
          name: 'UserAdmin',
          path: 'users',
          component: AdminUsersContainer
        }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
