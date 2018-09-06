<template>
  <div class="index__wrap">
    <div class="px-padding-t80 text-center px-margin-b50">
      <h1 class="index__name">Jmingzi</h1>
      <p class="color-c999 px-margin-t10">AD & 打野</p>
    </div>
    <div class="index__list w700 margin-auto radius-3 overflow-h">
      <div class="index__one-text bg-f2 px-padding-lr15 cl color-c999">
        <!--<span>人越往后活，便越喜欢听很多年前喜欢到窒息的歌。</span>-->
        <!--<span class="fr color-ccc"> —— 05.18 杭州</span>-->
        <span>自律、有计划的生活，才会留下更多回忆。</span>
        <span class="fr color-ccc"> —— 09.02 杭州·北苑</span>
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
        { vmid: 'keywords', name: 'keywords', content: 'jmingzi，nodejs，h5学习，小程序学习，pwa学习，前端学习，前端开发' },
        { vmid: 'description', name: 'description', content: '爱学习，爱生活，爱前端' },
        { name: 'author', content: 'jmingzi' }
      ]
    },

    asyncData({ store }) {
      return store.dispatch('article/FETCH_LIST', { limit: 5, field: ['title'] })
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
