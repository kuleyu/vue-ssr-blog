<template>
  <div class="detail w700 margin-auto px-padding-b50">
    <div class="detail__head px-padding-t30">
      <h1>{{ detail.title || '标题' }}</h1>
      <p class="px-margin-tb10" v-if="tag">
        <span class="topic-tag" v-for="item in tag">{{ item }}</span>
      </p>
    </div>
    <div class="detail__content">
      <div class="detail__content-head">
        <span
          class="fr cursor-p"
          v-if="currentUser"
          @click="toEdit"
        >
          编辑
        </span>
        <p>
          <span class="font-bold">Jmingzi</span>
          <span> createdAt at {{ detail ? detail.createdAt : '' | format }}</span>
        </p>
      </div>

      <article-content :content="detail ? detail.inputCompiled : ''"/>

      <div class="detail__options">
        <div
          class="detail__options-item"
          :class="{
            tagged: hasTagged().exist
          }"
          @click="handleVant"
        >
          <img :src="require('../assets/zan.png')" class="ib-middle" width="22px" alt="git">
          <span class="ib-middle px-margin-l10">{{ detail ? detail.vantNum : '0' }}</span>
        </div>
      </div>
    </div>

    <div class="text-center px-margin-t50">
      <img :src="require('../assets/vant.jpeg')" width="200px" alt="">
      <p class="color-c999 px-margin-t10">如果觉得我帮助到了你，可以赞赏一根辣条钱～</p>
    </div>

    <page-bottom :is-fixed="false" />
  </div>
</template>

<script>
  import AV from 'leancloud-storage'
  import { mapState, mapActions } from 'vuex'
  import { ago } from '../assets/date'
  import { handleGithub } from '../assets/util'
  const PageBottom = () => import('../components/PageBottom.vue')
  const ArticleContent = () => import('../components/ArticleContent.vue')

  export default {
    name: 'Detail',

    asyncData({ store, route }) {
      return store.dispatch('article/FETCH_DETAIL', route.params.id)
    },

    metaInfo() {
      const detail = this.detail || {}
      return {
        title: detail.title || '文章详情',
        meta: [
          { vmid: 'keywords', name: 'keywords', content: detail.tag },
          { vmid: 'description', name: 'description', content: this.filterHtmlTag(detail.inputCompiled).substr(0, 150) }
        ]
      }
    },

    components: {
      ArticleContent,
      PageBottom
    },

    filters: {
      format(str) {
        let res
        Date.prototype.ago = ago
        res = new Date().ago(str)
        Date.prototype.ago = null
        return res
      }
    },

    computed: {
      ...mapState('article', ['detail']),
      ...mapState(['currentUser']),

      tag() {
        return this.detail ? this.detail.tag.split('、') : []
      }
    },

    methods: {
      ...mapActions('article', ['ADD_ARTICLE']),

      filterHtmlTag(str) {
        if (str) {
          str = str.replace(/\n/g, '').replace(/<\/*[a-z]+.*?>/g, '')
          return str
        }
        return ''
      },

      toEdit() {
        this.$router.push(`/editor/${this.$route.params.id}`)
      },

      hasTagged () {
        let user = AV.User.current()
        if (user) {
          user = user.toJSON().username
        }
        const { vantUser = [] } = this.detail
        const exist = vantUser.some(x => x === user)
        return {
          exist,
          user,
          vantUser
        }
      },

      async handleVant() {
        // 未登录提示去登录
        const { user, exist } = this.hasTagged()
        if (!user) {
          await this.$box.confirm('当前未登录，是否使用 github 登录？')
          handleGithub.call(this)
          return
        }

        // const { exist, user } = this.hasTagged()
        const article = AV.Object.createWithoutData('Article', this.detail.id)
        article.increment('vantNum', exist ? -1 : 1)
        article[exist ? 'remove' : 'addUnique']('vantUser', user)
        await article.save()
        if (exist) {
          this.detail.vantNum -= 1
          const i = this.detail.vantUser.findIndex(x => x === user)
          this.detail.vantUser.splice(i, 1)
        } else {
          this.detail.vantNum += 1
          if (!this.detail.vantUser) {
            this.$set(this.detail, 'vantUser', [user])
          } else {
            this.detail.vantUser.push(user)
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  .detail__content
    background-color: #fff
    border: 1px solid #c0d3eb
    border-radius: 3px
    position: relative

  .detail__content-head
    padding: 10px 15px
    color: #586069
    background-color: #f1f8ff
    border-bottom: 1px solid #c0d3eb
    border-top-left-radius: 3px
    border-top-right-radius: 3px
    font-size: 14px

  .detail__options
    border-top: 1px solid #e1e4e8

  .detail__options-item
    display: inline-block
    padding: 9px 15px 7px
    line-height: 18px
    border-right: 1px solid #e1e4e8
    color: #0366d6
    cursor: pointer
    font: normal normal 11px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"
    -webkit-font-smoothing: subpixel-antialiased

    &:first-child
      border-bottom-left-radius: 2px

    &:hover,
    &.tagged
      background-color: #f1f8ff

  .topic-tag
    display: inline-block
    padding: 0.3em 0.9em
    margin: 0 0.5em 0.5em 0
    white-space: nowrap
    background-color: #f1f8ff
    border-radius: 3px
</style>
