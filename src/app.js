import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './route'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

// Vue.config.devtools = process.env.NODE_ENV !== 'production'
// Vue.config.debug = true
// Vue.config.devtools = true
// Vue.config.productionTip = true

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
    // components: {
    //   App
    // },
    // template: '<App />'
    render: h => h(App)
  })

  return { app, router, store }
}