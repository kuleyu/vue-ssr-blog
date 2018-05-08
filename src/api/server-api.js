import LRU from 'lru-cache'
import db from './db'
// const logger = require('../../deploy/log')

export default function () {
  console.log('http: server api')

  if (process.__API__) {
    console.log('http: process.__API__')
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
