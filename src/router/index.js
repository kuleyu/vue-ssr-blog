import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: r => require.ensure([], () => r(require('../views/Index.vue')), 'Index')
      },
      {
        path: '/plan',
        component: r => require.ensure([], () => r(require('../views/Plan.vue')), 'Plan')
      },
      {
        path: '/article',
        component: r => require.ensure([], () => r(require('../views/Article.vue')), 'Article')
      },
      {
        path: '/about',
        component: r => require.ensure([], () => r(require('../views/About.vue')), 'About')
      },
      {
        path: '/login',
        component: r => require.ensure([], () => r(require('../views/Login.vue')), 'Login')
      },
      {
        path: '/editor',
        component: r => require.ensure([], () => r(require('../views/Editor.vue')), 'Editor')
      }
    ]
  })
}
