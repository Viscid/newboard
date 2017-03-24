import axios from 'axios'

const API_URL = 'http://localhost:2222'

export default {
  state: {
    user: {},
    posts: [],
    status: {
      visible: false,
      message: undefined
    }
  },
  mutations: {
    setPosts (state, posts) {
      state.posts = posts
    },
    setUser (state, user) {
      state.user = user
    },
    changeStatusMessage (state, message) {
      state.status.message = message
      state.status.visible = true
    },
    changeStatusVisibility (state) {
      state.status.visible = false
    }
  },
  actions: {
    getPosts (context) {
      axios.get(API_URL + '/post', { withCredentials: true }).then((res) => {
        context.commit('setPosts', res.data)
      })
    },
    setStatus (context, message) {
      context.commit('changeStatusMessage', message)
      setTimeout(() => {
        context.commit('changeStatusVisibility')
      }, 1000)
    },
    submitRegistration (context, user) {
      axios.post(API_URL + '/user/register', {user}, { withCredentials: true }).then((res) => {
        context.commit('setUser', res.data)
      })
    },
    loginUser (context, user) {
      axios.put(API_URL + '/user/login', {user}, {withCredentials: true}).then((res) => {
        context.commit('setUser', res.data)
      })
    },
    submitPost ({dispatch, commit}, message) {
      axios.post(API_URL + '/post', {message}, { withCredentials: true }).then((res) => {
        dispatch('getPosts')
      })
    }
  }
}
