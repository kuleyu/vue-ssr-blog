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

  initTables(tableName) {
    if (this[tableName]) {
      return new this[tableName]()
    }

    this[tableName] = AV.Object.extend(tableName)
    return new this[tableName]()
  }
}
