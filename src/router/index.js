import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        // component: r => require.ensure([], () => r(require('../views/Index.vue')), 'Index')
        component: () => import('../views/Index.vue')
      },
      {
        path: '/plan',
        // component: r => require.ensure([], () => r(require('../views/Plan.vue')), 'Plan')
        component: () => import('../views/Plan.vue')
      },
      {
        path: '/article',
        // component: r => require.ensure([], () => r(require('../views/Article.vue')), 'Article')
        component: () => import('../views/Article.vue')
      },
      {
        path: '/about',
        // component: r => require.ensure([], () => r(require('../views/About.vue')), 'About')
        component: () => import('../views/About.vue')
      },
      {
        path: '/editor',
        // component: r => require.ensure([], () => r(require('../views/Editor.vue')), 'Editor'),
        component: () => import('../views/Editor.vue'),
        children: [
          {
            path: ':id',
            // component: r => require.ensure([], () => r(require('../views/Editor.vue')), 'Editor'),
            component: () => import('../views/Editor.vue')
          }
        ]
      },
      {
        path: '/detail/:id',
        // component: r => require.ensure([], () => r(require('../views/Detail.vue')), 'Detail')
        component: () => import('../views/Detail.vue')
      }
    ]
  })
}
