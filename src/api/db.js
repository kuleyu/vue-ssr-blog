import AV from 'leancloud-storage'

export default {
  AV: null,

  Article: null,

  init() {
    if (this.AV) {
      return
    }

    const appId = 'iYzWnL2H72jtQgNQPXUvjFqU-gzGzoHsz'
    const appKey = 'OR3zEynwWJ7f8bk95AdiGFzJ'
    AV.init({ appId, appKey })
    this.AV = AV
  },

  initTables(tableName, createWithoutDataId) {
    if (createWithoutDataId) {
      return AV.Object.createWithoutData(tableName, createWithoutDataId)
    }
    if (this[tableName]) {
      return new this[tableName]()
    }

    this[tableName] = AV.Object.extend(tableName)
    return new this[tableName]()
  },

  // 手动注册用户 后门
  signUp() {
    // 新建 AVUser 对象实例
    const user = new AV.User()
    // 设置用户名
    user.setUsername('jmingzi')
    // 设置密码
    user.setPassword('ck.123456')
    // 设置邮箱
    user.setEmail('472102644@qq.com')
    return user.signUp()
  },

  logout() {
    return AV.User.logOut()
  },

  login(name, pwd) {
    return AV.User.logIn(name, pwd)
  }
}
