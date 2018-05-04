const express = require('express')
const path = require('path')
const app = express()
const favicon = require('serve-favicon')
const resolve = file => path.resolve(__dirname, file)
const template = require('fs').readFileSync(resolve('../index.html'), 'utf-8')
const { createBundleRenderer } = require('vue-server-renderer')
const renderer = createBundleRenderer(require('../dist/vue-ssr-server-bundle.json'), {
  runInNewContext: false, // 推荐
  // （可选）页面模板
  template,
  // （可选）客户端构建 manifest
  clientManifest: require('../dist/vue-ssr-client-manifest.json')
})

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: 0
})

app.use(favicon('./public/logo-48.png'))
app.use('/dist', serve('../dist', true))
app.use('/public', serve('../public', true))

app.get('*', (req, res) => {
  res.setHeader("Content-Type", "text/html")

  const context = {
    url: req.url,
    title: '自定义demo'
  }

  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.log(err)
      res.status(500).end(err.message)
      return
    }

    res.end(html)
  })
})

app.listen(3000, () => {
  console.log('server is start !')
})