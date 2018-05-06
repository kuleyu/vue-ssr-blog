import Vue from 'vue'
import Vuex from 'vuex'
import {
  addArticle
} from '../api'
import index from './modules/index'

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
      'ADD_ARTICLE': (context, data) => {
          return addArticle(data)
      }
    },

    mutations: {

    }
  })
}
