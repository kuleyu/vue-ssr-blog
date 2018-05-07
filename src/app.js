import Vue from 'vue'
import Meta from 'vue-meta'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'

Vue.use(Meta)

export function createApp(context = {}) {
  const router = createRouter()
  const store = createStore()
  sync(store, router)

  const app = new Vue({
    data: {
      url: context.url
    },
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
