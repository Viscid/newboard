import axios from 'axios'

const API_URL = 'http://localhost:2222'

export default {
  state: {
    postMessage: undefined,
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
    stashPostMessage (state, message) {
      state.postMessage = message
    },
    changeStatusMessage (state, message) {
      state.status.message = message
      state.status.visible = true
    },
    changeStatusVisibility (state) {
      state.status.visible = false
    },
    logout (state) {
      state.user = {}
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
      return new Promise((resolve, reject) => {
        axios.post(API_URL + '/user/register', {user}, { withCredentials: true }).then((res) => {
          resolve()
          context.commit('setUser', res.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },

    loginUser (context, user) {
      return new Promise((resolve, reject) => {
        axios.put(API_URL + '/user/login', {user}, {withCredentials: true}).then((res) => {
          context.commit('setUser', res.data)
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    },

    submitPost ({dispatch, commit}, message) {
      return new Promise((resolve, reject) => {
        axios.post(API_URL + '/post', {message}, { withCredentials: true }).then((res) => {
          dispatch('getPosts')
          resolve()
        }).catch((err) => {
          console.log(err)
          reject(err)
        })
      })
    },

    stashPostMessage (context, message) {
      context.commit('stashPostMessage', message)
    },

    logout (context) {
      context.commit('logout')
    }

  }
}
