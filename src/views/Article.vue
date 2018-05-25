<template>
  <div class="article height-100">
    <div class="w700 margin-auto position-r height-100">
      <h1 class="px-padding-tb20">文章列表</h1>

      <div class="list-panel radius-3 overflow-h bd-gray-lighter overflow-a">
        <article-list
          from="list"
          :list="$store.state.article.listPageList"
        />
      </div>

      <div class="position-a px-bottom-20 width-100 text-center">
        <pagination
          background
          layout="prev, pager, next"
          :current-page="$route.params.currentPage * 1"
          :page-size="pageSize"
          :total="total"
          @current-change="currentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { Pagination } from 'element-ui'
  import Waiting from '../components/Waiting.vue'
  const ArticleList = () => import('../components/ArticleList.vue')
  const pageSize = 10

  export default {
    name: 'Article',

    asyncData({ store, route }) {
      return store.dispatch('article/FETCH_LIST', {
        limit: pageSize,
        skip: (route.params.currentPage - 1) * pageSize,
        field: ['title'],
        mutations: 'SET_LIST_PAGE',
        cacheKey: route.params.currentPage
      })
    },

    data() {
      return {
        pageSize,
        total: 0
      }
    },

    mounted() {
      this.$store.dispatch('article/GET_TOTAL').then(res => {
        this.total = res
      })
    },

    metaInfo: {
      title: '文章列表',
      meta: [
        { vmid: 'keywords', name: 'keywords', content: 'jmingzi，nodejs，h5学习，小程序学习，pwa学习，前端学习，前端开发' },
        { vmid: 'description', name: 'description', content: '爱学习，爱生活，爱前端' },
        { name: 'author', content: 'jmingzi' }
      ]
    },

    methods: {
      currentChange(val) {
        this.$router.push(`/article/${val}`)
      }
    },

    components: {
      Waiting,
      ArticleList,
      Pagination
    },

    beforeRouteUpdate (to, from, next) {
      const { asyncData } = this.$options
      if (asyncData) {
        asyncData({
          store: this.$store,
          route: to
        }).then(next).catch(next)
      } else {
        next()
      }
    }
  }
</script>

<style lang="stylus">
  .list-panel
    position: absolute;
    top: 80px;
    width: 100%;
    bottom: 70px;
</style>
