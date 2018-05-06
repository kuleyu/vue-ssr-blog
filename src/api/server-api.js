import LRU from 'lru-cache'
import db from './db'

export default function () {
  console.log('server api')

  if (process.__API__) {
    console.log('process.__API__')
    return process.__API__
  }

  db.init()
  const api = process.__API__ = db

  api.cache = LRU({
    max: 1000,
    maxAge: 1000 * 60 * 15 // 15 min cache
  })

  return api
}
