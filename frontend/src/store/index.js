import axios from 'axios'
// import Vue from 'vue'

const API_URL = 'http://localhost:2222'

export default {
  state: {
    postMessage: undefined,
    replyPost: {},
    user: {},
    posts: {
      threads: [],
      replies: {}
    },
    status: {
      visible: false,
      message: undefined
    }
  },
  mutations: {
    setPosts (state, posts) {
      /* state.replies = Vue.set(state, 'replies', posts.replies)
      state.threads = Vue.set(state, 'threads', posts.threads) */
      state.posts = posts
    },
    setReplyPost (state, post) {
      state.replyPost = post
    },
    setUser (state, user) {
      state.user = user
    },
    stashPostMessage (state, post) {
      state.postMessage = post.message
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

    getPosts ({dispatch, commit}) {
      axios.get(API_URL + '/post', { withCredentials: true }).then((res) => {
        commit('setPosts', res.data)
      })
    },

    getReplyPost ({dispatch, commit}, slug) {
      axios.get(API_URL + '/post/' + slug, { withCredentials: true }).then((res) => {
        commit('setReplyPost', res.data)
      })
    },

    setReplyPost (context, post) {
      context.commit('setReplyPost', post)
    },

    setStatus (context, message) {
      context.commit('changeStatusMessage', message)
      setTimeout(() => {
        context.commit('changeStatusVisibility')
      }, 2000)
    },

    submitRegistration ({dispatch, commit}, user) {
      return new Promise((resolve, reject) => {
        axios.post(API_URL + '/user/register', {user}, { withCredentials: true }).then((res) => {
          resolve()
          commit('setUser', res.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },

    loginUser ({dispatch, commit}, user) {
      return new Promise((resolve, reject) => {
        axios.put(API_URL + '/user/login', {user}, {withCredentials: true}).then((res) => {
          commit('setUser', res.data)
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    },

    submitPost ({dispatch, commit}, post) {
      return new Promise((resolve, reject) => {
        axios.post(API_URL + '/post', {post}, { withCredentials: true }).then((res) => {
          resolve()
        }).catch((err) => {
          console.log(err)
          reject(err)
        })
      })
    },

    stashPostMessage ({dispatch, commit}, message) {
      commit('stashPostMessage', message)
    },

    logout ({dispatch, commit}) {
      commit('logout')
    }

  }
}
