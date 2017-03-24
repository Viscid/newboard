import axios from 'axios'

export default {
  state: {
    user: 'Viscid',
    posts: [],
    status: {
      visible: true,
      message: 'This is a status bar message.'
    }
  },
  mutations: {
    setPosts (state, posts) {
      state.posts = posts
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
      axios.get('http://localhost:2222/post').then((res) => {
        console.log(res)
        context.commit('setPosts', res.data)
      })
    },
    setStatus (context, message) {
      context.commit('changeStatusMessage', message)
      setTimeout(() => {
        context.commit('changeStatusVisibility')
      }, 1000)
    }
  }
}
