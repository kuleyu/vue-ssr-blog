const express = require('express')
const spawn = require('child_process').spawn
const createHandler = require('github-webhook-handler')
const handler = createHandler({ path: '/pushCode', secret: 'auto-build-blog' })
const app = express()
const log4js = require('log4js')
log4js.configure({
  appenders: {
    "access": {
      "type": "dateFile",
      "filename": "log/deploy.log",
      // "pattern": ".yyyy-MM-dd",
      "alwaysIncludePattern": true,
      "daysToKeep": 7,
      "keepFileExt": true
    }
  },
  categories: {
    default: {
      "appenders": ["access"],
      "level": "debug"
    }
  }
})
const log = log4js.getLogger()
const myLocalIp = require('my-local-ip')

app.all('*', (req, res) => {
  handler(req, res, () => {
    if (req.method === 'POST') {
    } else {
      res.statusCode = 404
      res.end(`not support ${req.method} methods!`)
    }
  })
})


app.listen(8083, function() {
  console.log(`server is start at ${myLocalIp()}:8083!`)
  log.debug(`server is start at ${myLocalIp()}:8083!`)
})

handler.on('error', function (err) {
  log.debug('Error:', err.message)
})

handler.on('push', (event) => {
  log.debug('Received a push event for %s to %s', event.payload.repository.name, event.payload.ref)
  rumCommand('sh', ['./deploy/build.sh'], txt => {
    log.debug(txt)
  })
})

function rumCommand(cmd, args, callback) {
  let response = ''
  const child = spawn(cmd, args)

  child.stdout.on('data', buffer => {
    response += buffer.toString()
  })

  child.stderr.on('data', (data) => {
    log.debug(`stderr: ${data}`)
  })

  child.stdout.on('end', () => {
    callback(response)
  })
}
