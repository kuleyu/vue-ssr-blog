const express = require('express')
const path = require('path')
const fs = require('fs')
// const https = require('https')
const axios = require('axios')
const compression = require('compression')
const resolve = file => path.resolve(__dirname, file)
const favicon = require('serve-favicon')
const LRU = require('lru-cache')
const { createBundleRenderer } = require('vue-server-renderer')
const log4js = require('log4js')
const AV = require('leancloud-storage')
const appId = 'iYzWnL2H72jtQgNQPXUvjFqU-gzGzoHsz'
const appKey = 'OR3zEynwWJ7f8bk95AdiGFzJ'
AV.init({ appId, appKey })

const isProd = process.env.NODE_ENV !== 'development'
const serverInfo = `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()
const log = log4js.getLogger()

console.log('isProd', isProd, process.argv[2] === '-dev')
function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    // cache: LRU({
    //   max: 1000,
    //   maxAge: 1000 * 60 * 15
    // }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
    // recommended for performance
    runInNewContext: false
  }))
}

let renderer
let readyPromise
let templatePath = resolve('./src/index.template.html')
if (isProd) {
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  const template = fs.readFileSync(templatePath, 'utf-8')
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  })
} else {
  readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

// page cache
const microCache = LRU({
  max: 100,
  maxAge: 1000 * 60 * 15
})
const isCacheable = req => {
  const isDetailApi = /^\/detail\/[a-z0-9]+$/.test(req.originalUrl)
  // console.log(isDetailApi)
  return /^\/(detail|list|$)/.test(req.originalUrl) && !isDetailApi
}
const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 : 0
})

app.use(compression({ threshold: 0 }))
app.use(favicon('./public/logo.jpg'))
app.use('/dist', serve('./dist', true))
app.use('/public', serve('./public', true))
app.use(log4js.connectLogger(log4js.getLogger('http'), { level: 'auto' }))

function render(req, res) {
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Server', serverInfo)

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if(err.code === 404) {
      res.status(404).send(
        '<p style="font-size: 50px;text-align: center; padding-top: 100px; color: #666;">404 | Page Not Found</p>'
      )
    } else {
      // Render Error Page or Redirect
      res.status(500).send('500 | Internal Server Error')
      log.error(`error during render : ${req.url}`)
      log.error(err.stack)
    }
  }

  const now = Date.now()
  const context = {
    url: req.url
  }

  // renderer.renderToStream(context)
  //   .on('error', handleError)
  //   .on('end', () => console.log(`whole request: ${Date.now() - now}ms`))
  //   .pipe(res)
  renderer.renderToString(context, (err, html) => {
    if (isCacheable(req)) {
      microCache.set(req.url, html)
    }

    if (err) {
      return handleError(err)
    }
    res.send(html)
    // if (!isProd) {
    log.debug(`whole request: ${Date.now() - now}ms`)
    // }
  })
}

app.get('/oauth/redirect', async (req, res) => {
  res.type('application/json')

  const { data: { access_token } } = await axios({
    url: `https://github.com/login/oauth/access_token?client_id=fd499caa8b7738da9ec4&client_secret=9350d2b4bdc72e1e8cabb6db3f85b01b34ea0129&code=${req.query.code}`,
    method: 'post',
    headers: {
      accept: 'application/json'
    }
  })

  let userRes
  if (access_token) {
    userRes = await axios({
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        accept: 'application/json',
        Authorization: `token ${access_token}`
      }
    })
    const { login, node_id, email, avatar_url } = userRes.data
    // 将 github 用户信息注册到数据库
    const user = new AV.User()
    user.setUsername(login)
    user.setPassword(node_id)
    user.setEmail(email)
    user.set('github', userRes.data)
    try {
      await user.signUp()
      // 登录
      const signRes = await AV.User.logIn(login, node_id)
      res.status(200).send({ success: true, data: signRes.toJSON() })
    } catch (e) {
      if (e.code === 202) {
        // 已存在
        res.status(200).send({ success: true, data: { login, node_id, avatar_url } })
      } else {
        res.status(500).send({ success: false, data: e })
      }
    }
  }
})

app.get('*', (req, res) => {
  if (isCacheable(req)) {
    const hit = microCache.get(req.url)
    if (hit) {
      log.info(`cache: ${req.url}`)
      return res.end(hit)
    }
  }

  log.debug(`access: ${req.url}`)
  if (isProd) {
    render(req, res)
  } else {
    readyPromise.then(() => render(req, res))
  }
})

module.exports = app
