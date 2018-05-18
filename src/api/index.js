import createApi from 'api'

const api = createApi()
const { AV, cache, logger, onServer } = api

// 查询接口封装
// @params key {String} 查询的表名
// @params condition {Object} 查询条件
// @params payload {Object}
// @params field {Array} 查询指定字段
// @returns
export function fetch(key, condition, payload, field) {
  let cacheKey
  switch (key) {
    case 'currentUser': {
      return Promise.resolve(AV.User.current())
    }

    case 'Article': {
      cacheKey = `article-${payload ? payload.limit : 0}`
      if (cache && cacheKey) {
        const cacheValue = cache.get(cacheKey)
        if (cacheValue) {
          console.log(`http: get article list from cache, key: ${cacheKey}`)
          return Promise.resolve(cacheValue)
        }
      }

      const instance = new AV.Query(key)
      if (field && field.length) {
        instance.select(field)
      }
      if (condition) {
        Object.keys(condition).forEach(key => {
          instance.equalTo(key, condition[key])
        })
      }
      instance.descending('updatedAt')
      if (payload) {
        Object.keys(payload).forEach(key => {
          instance[key] = payload[key]
        })
      }
      return instance.find().then(res => {
        cache && cache.set(cacheKey, res)
        return res
      })
    }

    case 'Detail': {
      cacheKey = `detail-${payload}`
      if (cache && cacheKey) {
        const cacheValue = cache.get(cacheKey)
        if (cacheValue) {
          console.log(`http: get article detail from cache, key: ${cacheKey}`)
          return Promise.resolve(cacheValue)
        }
      }

      return new AV.Query(condition)
        .get(payload)
        .then(res => {
          cache && cache.set(cacheKey, res)
          return res
        })
    }

    default:
      return Promise.resolve()
  }
}

export const addArticle = api.addArticle
export const delArticle = api.delArticle
export const signUp = api.signUp
export const login = api.login
export const logout = api.logout
export const uploadImg = api.uploadImg
