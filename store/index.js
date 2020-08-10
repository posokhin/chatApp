export const state = () => ({
  user: {},
  messages: [],
  users: []
})

export const getters = {
  getMessages: state => (state.messages)
}

export const mutations = {
  setMessage (state, data) {
    state.messages.push(data)
  },
  setUser (state, user) {
    state.user = user
  },
  clearData (state) {
    state.user = {}
    state.users = []
    state.messages = []
  },
  SOCKET_newMessage (state, data) {
    state.messages.push(data)
  },
  SOCKET_usersUpdate (state, data) {
    state.users = data
  }
}
