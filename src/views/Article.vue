<template>
  <div class="article height-100">
    <div class="w700 margin-auto position-r">
      <h1 class="px-padding-tb20">文章列表</h1>

      <div class="list-panel radius-3 overflow-h bd-gray-lighter overflow-a">
        <article-list
          from="list"
          :list="$store.state.article.listPageList"
        />

        <div class="position-a px-bottom-15 width-100 text-center">
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

    <page-bottom class="px-margin-t100" :is-fixed="false" />
  </div>
</template>

<script>
  import { Pagination } from 'element-ui'
  import Waiting from '../components/Waiting.vue'
  const ArticleList = () => import('../components/ArticleList.vue')
  const PageBottom = () => import('../components/PageBottom.vue')
  const pageSize = 10

  export default {
    name: 'Article',

    asyncData({ store, route }) {
      return store.dispatch('article/FETCH_LIST', {
        limit: pageSize,
        skip: (route.params.currentPage - 1) * pageSize,
        field: ['title', 'tag', 'isOuterLink', 'type'],
        mutations: 'SET_LIST_PAGE',
        cacheKey: route.params.currentPage,
        condition: [
          {
            field: 'type',
            value: 'record-days',
            reverse: true
          }
        ]
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
        { vmid: 'keywords', name: 'keywords', content: '前端博客，web前端，nodejs，vue，react，javascript，html，css' },
        { vmid: 'description', name: 'description', content: 'jmingzi的个人博客，前端基础教程、前端框架学习、前端代码分享、前端技术指导、分享在工作中总结的实战开发经验' },
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
      Pagination,
      PageBottom
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
    // position: absolute;
    // top: 80px;
    width: 100%;
    // bottom: 70px;
    padding-bottom 60px
</style>
