import {
  fetchIndexList
} from '../../api'
import { format } from '../../assets/date'

export default {
  state: {
    list: []
  },

  getters: {
    lastModifier(state) {
      let item
      if (state.list.length > 0) {
        // 因为是按时间倒叙，所以取第一个
        item = state.list[0].updatedAt
      }
      return format(item, 'yyyy年MM月dd日 hh:mm')
    }
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
