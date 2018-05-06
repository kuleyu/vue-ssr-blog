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
        placeholder="请输入标签"
      >
    </div>
    <textarea
      class="editor__wrap editor__style height-100 position-a px-top-60 left-0 width-50 bd-gray-lighter-r"
      :value="input"
      @input="update"
      @keydown.9.prevent="tab"
    />
    <div
      class="editor__compile-html editor__style position-a px-top-60 right-0 width-50 height-100"
      v-html="compileValue"
    />
  </div>
</template>

<script>
  import marked from 'marked'
  import { debounce } from 'underscore'
  import { Button } from 'element-ui'
  import { mapActions } from 'vuex'
  // import Cache from 'web-storage-cache'

  // const cache = new Cache()

  export default {
    name: 'Editor',

    components: {
      ElButton: Button
    },

    computed: {
      compileValue() {
        return marked(this.input, {
          sanitize: true
        })
      }
    },

    data() {
      return {
        input: '# hello',
        title: '',
        tag: '',
        img: '',
        vantNum: 0
      }
    },

    methods: {
      ...mapActions(['ADD_ARTICLE']),

      update: debounce(function(e) {
        this.input = e.target.value
      }, 400),

      tab() {
        this.input += '    '
      },

      submit() {
        // validator
        const data = this.getValue()
        this.ADD_ARTICLE(data).then(res => {
          if (res.objectId) {
            Message.success(`${data.id ? '编辑' : '添加'}成功`)
          }
        })
      },

      getValue() {
        return {
          input: this.input,
          inputCompiled: this.compileValue,
          title: this.title,
          tag: this.tag,
          img: this.img,
          vantNum: 0
        }
      },

      saveDraft() {
        // cache.set('draft', this.getValue())
        this.$message.success('保存草稿成功')
      }
    }
  }
</script>

<style lang="scss">
  .editor__style {
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
  .editor__compile-html {
    padding: 10px;
    overflow: auto;

    pre {
      padding: 16px;
      overflow: auto;
      line-height: 1.45;
      background-color: #f6f8fa;
      border-radius: 3px;
      font-family: "SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;
      font-size: 12px;
    }
  }
</style>
