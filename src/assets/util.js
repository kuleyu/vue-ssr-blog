// import axios from 'axios'
import AV from 'leancloud-storage'

export async function handleGithub() {
  location.href = '/github'
  // const loading = this.$loading({ text: '处理中...' })
  // const { data: { success, data: { login, node_id } } } = await axios.get('/github')
  // if (success) {
  //   await AV.User.logIn(login, node_id)
  //   this.CURRENT_USER()
  //   this.$message.success('登录成功')
  // }
  // loading.close()
}

export async function handleLogin(name) {
  const currentUser = AV.User.current()
  if (!currentUser) {
    const userQuery = new AV.Query('_User')
    userQuery.equalTo('username', name)
    const res = await userQuery.find()
    console.log(res)
    const { result } = res.toJSON()
    if (result && result[1]) {
      const user = result[1].toJSON()
      await AV.User.logIn(name, user.github.node_id)
      this.CURRENT_USER()
      this.$message.success('登录成功')
    }
  }
}
