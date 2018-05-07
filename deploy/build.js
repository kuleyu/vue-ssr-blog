const express = require('express')
const spawn = require('child_process').spawn
const createHandler = require('github-webhook-handler')
const handler = createHandler({ path: '/pushCode', secret: 'auto-build-blog' })
const app = express()
const logger = require('./log').logger
const myLocalIp = require('my-local-ip')

app.all('*', (req, res) => {
  handler(req, res, () => {
    if (req.method === 'POST') {
      logger('debug')('receive post')
    } else {
      res.statusCode = 404
      res.end(`not support ${req.method} methods!`)
    }
  })
})

app.listen(8083, function() {
  logger('debug')(`server is start at ${myLocalIp()}:8083!`)
})

handler.on('error', function (err) {
  logger('error')('Error:', err.message)
})

handler.on('push', (event) => {
  logger()('Received a push event for %s to %s', event.payload.repository.name, event.payload.ref)
  rumCommand('sh', ['./build.sh'], txt => {
    logger()('txt')
  })
})

function rumCommand(cmd, args, callback) {
  let response = ''
  const child = spawn(cmd, args)

  child.stdout.on('data', buffer => {
    response += buffer.toString()
  })

  child.stdout.on('end', () => {
    callback(response)
  })
}
