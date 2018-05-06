<template>
  <div class="page-bottom__menu position-a width-100 px-bottom-20 text-center">
    <div class="px-margin-b10">
      <a href="javascript:" @click="showSignIn = true">
        <span class="ib-middle">登录</span>
      </a>
      <a href="javascript:" class="px-margin-l10 display-n" @click="signUp">
        <span class="ib-middle">注册</span>
      </a>
    </div>
    <ul class="font-0 margin-auto">
      <li
        v-for="item in menu"
        :key="item.id"
        class="ib-middle px-font-14 px-width-50"
      >
        <router-link :to="item.path">{{ item.name }}</router-link>
      </li>
    </ul>
    <p class="color-c999 px-margin-t10 px-font-12">最后更新：2018-02-09</p>

    <el-dialog
      title="登录"
      :visible.sync="showSignIn"
      class="text-left"
      width="30%"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="name">
          <el-input
            v-model="form.name"
            placeholder="用户名"
            @keyup.13="signIn"
          />
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            type="password"
            placeholder="密码"
            v-model="form.pwd"
            @keyup.13="signIn"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="showSignIn = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="signIn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { Dialog, Button, Form, FormItem, Input } from 'element-ui'
  import { login } from '../api'

  export default {
    components: {
      ElDialog: Dialog,
      ElButton: Button,
      ElForm: Form,
      ElFormItem: FormItem,
      ElInput: Input
    },

    data() {
      return {
        showSignIn: false,
        form: {
          name: '',
          pwd: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ]
        },
        menu: [
          {
            id: 1,
            name: '首页',
            path: '/'
          },
          {
            id: 2,
            name: '计划',
            path: '/plan'
          },
          {
            id: 3,
            name: '文章',
            path: '/article'
          },
          {
            id: 4,
            name: '关于',
            path: '/about'
          }
        ]
      }
    },

    methods: {
      ...mapActions(['SIGN_UP']),

      signUp() {
        this.$box.confirm('该接口为后门').then(() => {
          this.SIGN_UP()
        })
      },

      signIn() {
        this.$refs.form.validate(ok => {
          if (ok) {
            login(this.form.name, this.form.pwd)
              .then(res => {
                if (res) {
                  this.$message.success('登录成功')
                  this.showSignIn = false
                }
              })
              .catch(res => {
                this.$message.error(res.message)
              })
          }
        })

      }
    }
  }
</script>

