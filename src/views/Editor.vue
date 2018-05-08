<template>
  <div class="editor height-100 px-font-14">
    <div class="position-a px-height-60 width-100 top-0 px-line-60 bd-gray-lighter-b px-padding-lr15">
      <div class="fr">
        <el-button
          size="mini"
          @click="saveDraft"
        >
          保存草稿
        </el-button>
        <el-button
          size="mini"
          type="primary"
          @click="submit"
        >
          提交
        </el-button>
      </div>
      <input
        v-model="title"
        class="editor__title px-line-30 px-font-16 bd-gray-lighter-r ib-middle"
        type="text"
        placeholder="请输入标题"
      >
      <input
        v-model="tag"
        class="editor__tag px-line-30 px-font-16 px-margin-l10 ib-middle"
        type="text"
        placeholder="请输入标签，顿号分隔"
      >
    </div>
    <textarea
      class="editor__wrap editor__textarea position-a px-top-60 bottom-0 left-0 width-50 bd-gray-lighter-r"
      :value="input"
      @input="update"
      @keydown.9.prevent="tab"
    />
    <div
      class="editor__compile-html position-a px-top-60 bottom-0 right-0 width-50 overflow-a"
    >
      <article-content :content="compileValue" />
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  import { debounce } from 'underscore'
  import { Button } from 'element-ui'
  import { mapActions, mapState } from 'vuex'
  import ArticleContent from '../components/ArticleContent.vue'

  export default {
    name: 'Editor',

    metaInfo() {
      return {
        title: this.editId ? '编辑文章' : '写文章'
      }
    },

    components: {
      ElButton: Button,
      ArticleContent
    },

    computed: {
      ...mapState('article', ['detail']),

      compileValue() {
        return marked(this.input, {
          sanitize: true
        })
      },

      editId() {
        return this.$route.params.id
      }
    },

    data() {
      return {
        input: '# hello',
        title: '',
        tag: '',
        img: ''
      }
    },

    created() {
      if (this.editId) {
        if (this.detail) {
          this.fillDetail()
        } else {
          this.$message.info('当前文章详情为空')
          history.back()
        }
      }
    },

    methods: {
      ...mapActions('article', ['ADD_ARTICLE']),

      update: debounce(function(e) {
        this.input = e.target.value
      }, 400),

      tab() {
        this.input += '    '
      },

      submit() {
        // validator
        const data = this.getValue()
        if (this.editId) {
          data.id = this.editId
        }
        this.ADD_ARTICLE(data).then(() => {
          this.$message.success(`${data.id ? '编辑' : '添加'}成功`)
        })
      },

      getValue() {
        return {
          input: this.input,
          inputCompiled: this.compileValue,
          title: this.title,
          tag: this.tag,
          img: this.img
        }
      },

      saveDraft() {
        this.$message.success('保存草稿成功')
      },

      fillDetail() {
        const { title, tag, input } = this.detail
        this.title = title
        this.tag = tag
        this.input = input
      }
    }
  }
</script>

<style lang="scss">
  .editor__textarea {
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
  }
  .editor__wrap {
    padding: 10px;
    &:focus {
      outline: none;
    }
  }
  .editor__title,
  .editor__tag {
    width: 400px;
    &:focus {
      outline: none;
    }
  }
  .editor__tag {
    width: 200px;
    border: none;
  }
</style>
