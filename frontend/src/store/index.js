import axios from 'axios'

const API_URL = 'http://localhost:2222'

export default {
  state: {
    postMessage: undefined,
    searchResults: [],
    selectedReply: '',
    activeThread: [],
    replyPost: {},
    user: {},
    options: {
      postLimit: 5
    },
    threads: [],
    status: {
      visible: false,
      message: undefined
    },
    page: 1
  },
  mutations: {
    setThreads (state, threads) {
      state.threads = threads
    },
    setReplyPost (state, post) {
      state.replyPost = post
    },
    setSearchResults (state, results) {
      state.searchResults = results
    },
    clearSearchResults (state) {
      state.searchResults = []
    },
    setUser (state, user) {
      state.user = user
    },
    setPage (state, page) {
      state.page = page
    },
    setSelectedReply (state, replyId) {
      state.selectedReply = replyId
    },
    setActiveThread (state, data) {
      state.activeThread = data.thread
      state.selectedReply = data.activePost._id
    },
    clearActiveThread (state) {
      state.activeThread = {}
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
    search (context, query) {
      axios.post(API_URL + '/post/find/', { query }, { withCredentials: true }).then((res) => {
        context.commit('setSearchResults', res.data)
      })
    },

    getThreads ({dispatch, commit}, page = 1, threadsPerPage = 15) {
      axios.get(API_URL + '/post', { params: { page, threadsPerPage }, withCredentials: true }).then((res) => {
        commit('setThreads', res.data)
      })
    },

    getThreadBySlug (context, slug) {
      axios.get(API_URL + '/post/' + slug, { withCredentials: true }).then((res) => {
        context.commit('setActiveThread', res.data)
      })
    },

    getReplyPost ({dispatch, commit}, slug) {
      axios.get(API_URL + '/post/' + slug, { withCredentials: true }).then((res) => {
        commit('setReplyPost', res.data.activePost)
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

    selectReply (context, replyId) {
      context.commit('setSelectedReply', replyId)
    },

    setPage ({dispatch, commit}, page) {
      commit('setPage', page)
      dispatch('getPosts', page)
    },

    clearSearchResults (context) {
      context.commit('clearSearchResults')
    },

    clearPostViewer (context) {
      context.commit('clearActiveThread')
    },

    stashPostMessage ({dispatch, commit}, message) {
      commit('stashPostMessage', message)
    },

    logout ({dispatch, commit}) {
      axios.put(API_URL + '/user/logout', null, { withCredentials: true }).then((res) => {
        commit('logout')
      }).catch((err) => {
        console.log(err)
      })
    }

  }
}
