import {
  fetch,
  addArticle,
  delArticle
} from '../../api'

export default {
  state: {
    list: [],
    detail: null
  },

  actions: {
    FETCH_LIST({ commit }, { limit, field }) {
      // return fetchIndexList(limit, field).then(res => {
      return fetch('Article', null, { limit }, field).then(res => {
        commit('SET_LIST', res.map(item => ({
          id: item.id,
          updatedAt: item.updatedAt,
          ...item.attributes
        })))
      })
    },

    FETCH_DETAIL: ({ commit }, id) => {
      // return fetchDetail(id).then(res => {
      return fetch('Detail', 'Article', id, ['img', 'inputCompiled', 'tag', 'title', 'vantNum'])
        .then(res => {
          commit('SET_DETAIL', {
            id,
            updatedAt: res.updatedAt,
            createdAt: res.createdAt,
            ...res.attributes
          })
        })
    },

    ADD_ARTICLE: (context, data) => {
      return addArticle(data)
    },

    DEL_ARTICLE: (context, data) => {
      return delArticle(data).then(() => {
        context.commit('UPDATE_ARTICLE', data.index)
      })
    }
  },

  mutations: {
    SET_LIST(state, data) {
      state.list = data
    },

    SET_DETAIL: (state, data) => {
      state.detail = data
    },

    UPDATE_ARTICLE: (state, data) => {
      state.list.splice(data, 1)
    }
  }
}
