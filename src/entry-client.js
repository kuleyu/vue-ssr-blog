import Vue from 'vue'
import { createApp } from './app'
const { app, router, store } = createApp()
import { Message, MessageBox } from 'element-ui'

Vue.prototype.$message = Message
Vue.prototype.$box = MessageBox

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  // 当第一次加载完成后
  // 页面内发生路由变化时，会触发路由钩子函数
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    console.log(matched, prevMatched)
    // 从即将跳转的页面所涉及到的组件中
    // 筛选出未取数据的组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }

    // 这里如果有加载指示器(loading indicator)，就触发
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({ store, route: to })
      }
    })).then(() => {
      // 停止加载指示器(loading indicator)
      next()
    }).catch(next)
  })

  app.$mount('#app')
})
