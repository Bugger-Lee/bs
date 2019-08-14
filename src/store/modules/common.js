export default {
  state: {
    isCollapse: false,
  },
  mutations: {
    Mcommon(state, data) {
      for (const name in data) {
        state[name] = data[name]
      }
    }
  },
  actions: {
    Acommon(context, data) {
      context.commit('Mcommon', data)
    }
  },
  getters: {
    Gcommon: state => {
      return state
    }
  }
}
