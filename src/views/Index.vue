<template>
  <div class="index__wrap">
    <div class="px-padding-t80 text-center px-margin-b50">
      <h1 class="index__name">Jmingzi</h1>
      <p class="color-c999 px-margin-t10">AD & 打野</p>
    </div>
    <div class="index__list w700 margin-auto radius-3 overflow-h">
      <div
        class="index__one-text bg-f2 px-padding-lr15 cl color-c999 cursor-p"
        @click="$router.push('/one-word')"
      >
        <span>Be calm, be thinking !</span>
        <span class="fr color-ccc"> —— 09.17 杭州</span>
      </div>
      <article-list
        :list="list"
      />
    </div>

    <page-bottom />
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  const ArticleList = () => import('../components/ArticleList.vue')
  const PageBottom = () => import('../components/PageBottom.vue')
  // import ArticleList from '../components/ArticleList.vue'
  // import PageBottom from '../components/PageBottom.vue'

  export default {
    name: 'Index',

    metaInfo: {
      title: '首页',
      meta: [
        { vmid: 'keywords', name: 'keywords', content: '前端博客，web前端，nodejs，vue，react，javascript，html，css' },
        { vmid: 'description', name: 'description', content: 'jmingzi的个人博客，前端基础教程、前端框架学习、前端代码分享、前端技术指导、分享在工作中总结的实战开发经验' },
        { name: 'author', content: 'jmingzi' }
      ]
    },

    asyncData({ store }) {
      return store.dispatch('article/FETCH_LIST', { limit: 5, field: ['title', 'tag', 'isOuterLink'] })
    },

    components: {
      ArticleList,
      PageBottom
    },

    data() {
      return {
      }
    },

    computed: {
      ...mapState('article', ['list'])
    },

    created() {
      this.SET_DETAIL(null)
    },

    methods: {
      ...mapMutations('article', ['SET_DETAIL'])
    }
  }
</script>

<style lang="stylus">
  .index__name
    font-weight: bold
    font-size: 50px
    font-family: interface,-webkit-pictograph,serif

  .index__list
    border: 1px #eceeef solid

  .my-ssr
    color: #666
    font-size: 16px

  .index__one-text
    padding: 10px 15px
</style>
