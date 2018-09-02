import {
  fetch,
  addArticle,
  delArticle,
  totalCount
} from '../../api'

export default {
  state: {
    list: [],
    listPageList: [],
    detail: null
  },

  actions: {
    FETCH_LIST({ commit }, { limit, skip, field, mutations, cacheKey }) {
      return fetch('Article', null, { limit, skip, cacheKey }, field).then(res => {
        if (!mutations) {
          mutations = 'SET_LIST'
        }
        commit(mutations, res.map(item => ({
          id: item.id,
          updatedAt: item.updatedAt,
          createdAt: item.createdAt,
          ...item.attributes
        })))
      })
    },

    FETCH_DETAIL: ({ commit }, id) => {
      return fetch('Detail', 'Article', id, ['img', 'inputCompiled', 'tag', 'title'])
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
    },

    GET_TOTAL: () => totalCount()
  },

  mutations: {
    SET_LIST(state, data) {
      state.list = data
    },

    SET_LIST_PAGE(state, data) {
      state.listPageList = data
    },

    SET_DETAIL: (state, data) => {
      state.detail = data
    },

    UPDATE_ARTICLE: (state, data) => {
      state.list.splice(data, 1)
    }
  }
}
