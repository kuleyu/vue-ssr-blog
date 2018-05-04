import Vue from 'vue'
import Vuex from 'vuex'
import { fetchItem } from '../api'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      items: {},
      user: ''
    },

    actions: {
      fetchItem({ commit }, id) {
        return fetchItem(id).then(item => {
          commit('setItem', { id, item })
        })
      },

      fetchUser({ commit }, id) {
        return new Promise((res, rej) => {
          setTimeout(() => {
            commit('setUser', 'jmingzi')
            res()
          }, 2000)
        })
      }
    },

    mutations: {
      setUser(state, name) {
        state.user = name
      },

      setItem(state, { id, item }) {
        Vue.set(
          state.items,
          id,
          item.status === 200
            ? item.data.data || item.data.message
            : item.data
        )
      }
    }
  })
}