import Vue from 'vue'
import Router from 'vue-router'
// import Index from '../views/Index'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/:id',
        component: r => require.ensure([], () => r(require('../views/Index.vue')), 'Index')
      }
    ]
  })
}