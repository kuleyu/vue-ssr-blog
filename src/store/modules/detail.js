import { fetchDetail } from '../../api'

export default {
  state: {
    detail: null
  },

  actions: {
    FETCH_DETAIL: ({ commit }, id) => {
      return fetchDetail(id).then(res => {
        commit('SET_DETAIL', {
          id,
          updatedAt: res.updatedAt,
          createdAt: res.createdAt,
          ...res.attributes
        })
      })
    }
  },

  mutations: {
    SET_DETAIL: (state, data) => {
      state.detail = data
    }
  }
}
