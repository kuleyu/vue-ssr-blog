import LRU from 'lru-cache'
import db from './db'
const log4js = require('log4js')
const log = log4js.getLogger('http')

export default function () {
  log.info('server api')

  if (process.__API__) {
    log.info('process.__API__')
    return process.__API__
  }

  db.init()
  const api = process.__API__ = db

  api.cache = LRU({
    max: 1000,
    maxAge: 1000 * 60 * 15 // 15 min cache
  })

  // api.logger = logger

  api.onServer = true

  return api
}
