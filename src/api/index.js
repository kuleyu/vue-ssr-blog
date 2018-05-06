import createApi from 'api'

const api = createApi()
const { AV, cache } = api

// 查询接口封装
// @params key {String} 查询的表名
// @params condition {Object} 查询条件
// @params payload {Object}
// @params field {Array} 查询指定字段
// @returns
function fetch(key, condition, payload, field) {
  if (cache && cache.has(key)) {
    return Promise.resolve(cache.get(key))
  }

  return new Promise((resolve, reject) => {
    let res
    switch (key) {
      case 'currentUser': {
        res = AV.User.current()
        resolve(res)
      } break

      case 'Article': {
        const instance = new AV.Query(key)
        console.log(field)
        if (field && field.length) {
          instance.select(field)
        }
        if (condition) {
          Object.keys(condition).forEach(key => {
            instance.equalTo(key, condition[key])
          })
        }
        instance.descending('createdAt')
        if (payload) {
          Object.keys(payload).forEach(key => {
            instance[key] = payload[key]
          })
        }
        return instance.find().then(res => {
          resolve(res)
        })
      }
      default:
        resolve()
    }
  })
}

export function fetchIndexList(limit, field) {
  return fetch('Article', null, { limit }, field)
}

export function fetchCurrentUser() {
  return fetch('currentUser')
}

export function addArticle(data) {
  return api.addArticle(data)
}

export function signUp() {
  return api.signUp()
}

export function login(name, pwd) {
  return api.login(name, pwd)
}

export function logout() {
  return api.logout()
}
