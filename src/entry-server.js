import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    // 路由跳转
    router.push(context.url)

    router.onReady(() => {
      // 返回目标位置或是当前路由匹配的组件数组
      const matchedComponents = router.getMatchedComponents()
      // console.log(matchedComponents)
      if (!matchedComponents.length) {
        return reject({ code: 404, path: context.url })
      }

      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 当使用 template 时
        // context.state 将作为 window.__INITIAL_STATE__ 状态
        // 自动嵌入到最终的 HTML 中。
        context.state = store.state
        resolve(app)
      })
    }, reject)
  })
}
