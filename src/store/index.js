import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/index'
import detail from './modules/detail'
import {
  addArticle,
  signUp,
  getCurrentUser
} from '../api'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      currentUser: null
    },

    modules: {
      index: {
        namespaced: true,
        ...index
      },
      detail: {
        namespaced: true,
        ...detail
      }
    },

    actions: {
      ADD_ARTICLE: (context, data) => {
        return addArticle(data)
      },
      SIGN_UP: () => {
        return signUp()
      },
      CURRENT_USER: ({ commit }) => {
        return getCurrentUser().then(user => {
          commit('SET_CURRENT_USER', !!user)
        })
      }
    },

    mutations: {
      SET_CURRENT_USER: (state, data) => {
        state.currentUser = data
      }
    }
  })
}
