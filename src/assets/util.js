import axios from 'axios'
import AV from 'leancloud-storage'

export async function handleGithub() {
  location.href = `/github?href=${encodeURIComponent(location.href)}`
}

export async function handleLogin(name) {
  const currentUser = AV.User.current()
  if (!currentUser) {
    const userQuery = new AV.Query('_User')
    userQuery.equalTo('username', name)
    const res = await userQuery.find()
    if (res && res[0]) {
      const user = res[0].toJSON()
      await AV.User.logIn(name, user.github.node_id)
      this.CURRENT_USER()
      await axios.get('/cookie/clear')
      // document.cookie = `_login=${name}; expires=${new Date('1970/01/01')};`
      this.$message.success('登录成功')
    }
  }
}

export const summary = (str) => {
  if (str) {
    str = str.replace(/\n/g, '').replace(/<\/*[a-z]+.*?>/g, '')
    return str.substr(0, 100) + '......'
  }
  return ''
}
