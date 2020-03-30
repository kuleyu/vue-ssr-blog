import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: () => import('../views/Index.vue')
      },
      {
        path: '/article/:currentPage',
        component: () => import('../views/Article.vue')
      },
      {
        path: '/about',
        component: () => import('../views/About.vue')
      },
      {
        path: '/editor',
        component: () => import('../views/Editor.vue'),
        children: [
          {
            path: ':id',
            component: () => import('../views/Editor.vue')
          }
        ]
      },
      {
        path: '/detail/:id',
        component: () => import('../views/Detail.vue')
      },
      {
        path: '/one-word',
        component: () => import('../views/OneWord.vue')
      },
      {
        path: '/record-days',
        component: () => import('../views/RecordDays.vue')
      }
    ]
  })
}
