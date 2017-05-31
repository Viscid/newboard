import axios from 'axios'
import config from '../../../config'
const API_URL = config.API_URL

export default {
  state: {
    admin: {
      users: []
    },
    settings: {
      youTubeEmbed: localStorage.getItem('youTubeEmbed') || true,
      postsPerPage: Number(localStorage.getItem('postsPerPage')) || 15,
      dateTimeFormat: localStorage.getItem('dateTimeFormat') || 'absolute'
    },
    postMessage: undefined,
    searchResults: [],
    selectedReply: '',
    events: [],
    activeThread: [],
    activeProfile: {},
    replyPost: {},
    user: {},
    options: {
      postLimit: 5
    },
    onlineUsers: [],
    onlineUserCount: 0,
    threads: [],
    newPosts: [],
    status: {
      visible: false,
      message: undefined
    },
    page: 1
  },
  mutations: {
    setAdminUserList (state, list) {
      state.admin.users = list
    },
    setThreads (state, threads) {
      state.threads = threads
      state.newPosts = []
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
      if ('settings' in user) state['settings'] = user['settings']
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
    setActiveProfile (state, profile) {
      state.activeProfile = profile
    },
    clearActiveProfile (state) {
      state.activeProfile = {}
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
    },
    addNewPost (state, post) {
      state.newPosts.push(post)
    },
    addReaction (state, reaction) {
      state.events.push(reaction)
    },
    addVote (state, vote) {
      state.events.push(vote)
    },
    clearReactions (state) {
      state.reactions = []
    },
    clearNewPosts (state) {
      state.newPosts = []
    },
    changeSetting (state, setting) {
      if (('name' in setting) && ('value' in setting)) state.settings[setting.name] = setting.value
    },
    setOnlineUsers (state, users) {
      state.onlineUsers = users.list
      state.onlineUserCount = users.total
    }
  },
  actions: {
    search (context, query) {
      axios.post(API_URL + '/post/find/', { query }, { withCredentials: true }).then((res) => {
        context.commit('setSearchResults', res.data)
      })
    },

    getThreads (context) {
      return new Promise((resolve, reject) => {
        axios.get(API_URL + '/post', { params: { page: context.state.page, threadsPerPage: context.state.settings.postsPerPage }, withCredentials: true })
        .then((res) => {
          context.commit('setThreads', res.data)
          document.title = 'Viscity.org'
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
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
          resolve(res.data)
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
          resolve(res.data)
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

    react (context, reaction) {
      return new Promise((resolve, reject) => {
        axios.post(API_URL + '/post/reaction', reaction, { withCredentials: true }).then((res) => {
          resolve()
        }).catch((err) => {
          console.log(err)
          reject(err)
        })
      })
    },

    vote (context, vote) {
      return new Promise((resolve, reject) => {
        axios.post(API_URL + '/post/vote', vote, { withCredentials: true }).then((res) => {
          resolve()
        }).catch((err) => {
          console.log(err)
          reject(err)
        })
      })
    },

    fetchProfile (context, username) {
      return new Promise((resolve, reject) => {
        axios.get(API_URL + '/user/profile/' + username, { withCredentials: true }).then((res) => {
          context.commit('setActiveProfile', res.data)
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    },

    fetchAdminUserList (context) {
      return new Promise((resolve, reject) => {
        axios.get(API_URL + '/admin/users', { withCredentials: true }).then((res) => {
          context.commit('setAdminUserList', res.data)
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    },

    adminChangeUserRole (context, roleChange) {
      return new Promise((resolve, reject) => {
        axios.put(API_URL + '/admin/user/' + roleChange.username, {role: roleChange.role}, { withCredentials: true }).then((res) => {
          context.commit('setAdminUserList', res.data)
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    },

    adminNukePost ({dispatch, commit}, post) {
      return new Promise((resolve, reject) => {
        axios.get(API_URL + '/admin/post/' + post._id + '/nuke', { withCredentials: true }).then((res) => {
          dispatch('getThreads')
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    },

    adminDeletePost ({dispatch, commit}, post) {
      return new Promise((resolve, reject) => {
        axios.get(API_URL + '/admin/post/' + post._id + '/delete', { withCredentials: true }).then((res) => {
          dispatch('getThreads')
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    },

    adminBanUser (context, post) {
      return new Promise((resolve, reject) => {
        axios.get(API_URL + '/admin/post/' + post._id + '/banUser', { withCredentials: true }).then((res) => {
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    },

    clearActiveProfile (context) {
      context.commit('clearActiveProfile')
    },

    clearReactions (context) {
      context.commit('clearReactions')
    },

    selectReply (context, replyId) {
      context.commit('setSelectedReply', replyId)
    },

    setPage ({dispatch, commit}, page) {
      commit('setPage', page)
      dispatch('getThreads', page)
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
    },

    getNewPosts ({dispatch, commit}) {
      dispatch('getThreads')
      .then(() => {
        commit('clearNewPosts')
      })
    },

    socket_post (context, post) {
      context.commit('addNewPost', post)
      let newPosts = context.state.newPosts.filter((post) => {
        return (post.username !== context.state.user.username)
      }).length

      if (newPosts > 0) document.title = `(${newPosts}) Viscity.org`
    },

    socket_reaction (context, reaction) {
      context.commit('addReaction', reaction)
    },

    socket_vote (context, vote) {
      context.commit('addVote', vote)
    },

    socket_onlineUsers (context, users) {
      context.commit('setOnlineUsers', users)
    },

    changeSetting (context, setting) {
      return new Promise((resolve) => {
        context.commit('changeSetting', setting)
        resolve()
      })
    },

    saveSettings ({dispatch, commit}, settings) {
      return new Promise((resolve, reject) => {
        axios.post(API_URL + '/settings', {settings}, { withCredentials: true }).then((res) => {
          Object.keys(res.data).forEach((key) => {
            localStorage.setItem(key, res.data[key])
          })
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    }

  }
}
