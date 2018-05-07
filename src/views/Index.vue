<template>
  <div class="index__wrap">
    <div class="px-padding-t80 text-center px-margin-b50">
      <h1 class="index__name">Jmingzi</h1>
      <p class="color-c999 px-margin-t10">AD & 打野</p>
    </div>
    <div class="index__list w700 margin-auto radius-3 overflow-h">
      <div class="px-line-40 bg-f2 px-padding-lr15">
        <span>置顶</span>
      </div>
      <article-list
        :list="list"
      />
    </div>

    <page-bottom />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import ArticleList from '../components/ArticleList.vue'
  import PageBottom from '../components/PageBottom.vue'

  export default {
    name: 'Index',

    metaInfo: {
      title: '首页',
      meta: [
        { vmid: 'keywords', name: 'keywords', content: 'jmingzi' },
        { vmid: 'description', name: 'description', content: 'jmingzi' }
      ]
    },

    asyncData({ store }) {
      return store.dispatch('index/FETCH_LIST', { limit: 5, field: ['title', 'vantNum'] })
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
      ...mapState('index', ['list'])
    }
  }
</script>

<style lang="scss">
  .index__name {
    font-weight: bold;
    font-size: 50px;
    font-family: interface,-webkit-pictograph,serif;
  }
  .index__list {
    border: 1px #eceeef solid;
  }
  .my-ssr {
    color: #666;
    font-size: 16px;
  }
</style>
