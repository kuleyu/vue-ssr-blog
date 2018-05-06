import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/index'
import {
  addArticle,
  signUp,
} from '../api'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
    },

    modules: {
      index: {
        namespaced: true,
        ...index
      }
    },

    actions: {
      ADD_ARTICLE: (context, data) => {
        return addArticle(data)
      },
      SIGN_UP: () => {
        return signUp()
      }
    },

    mutations: {

    }
  })
}
