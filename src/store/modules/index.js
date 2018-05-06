import {
  fetchIndexList
} from '../../api'

export default {
  state: {
    list: []
  },

  mutations: {
    SET_LIST(state, data) {
      state.list = data
    }
  },

  actions: {
    FETCH_LIST({ commit }, { limit, field }) {
      return fetchIndexList(limit, field).then(res => {
        commit('SET_LIST', res)
      })
    }
  }
}
