import axios from 'axios'
import AV from 'leancloud-storage'

export async function handleGithub() {
  const loading = this.$loading({ text: '处理中...' })
  const { data: { success, data: { login, node_id } } } = await axios.get('/github')
  if (success) {
    await AV.User.logIn(login, node_id)
    this.CURRENT_USER()
    this.$message.success('登录成功')
  }
  loading.close()
}
