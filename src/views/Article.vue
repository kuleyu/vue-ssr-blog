<template>
  <div class="article">
    <waiting />
  </div>
</template>

<script>
  import Waiting from '../components/Waiting.vue'

  export default {
    name: 'Article',

    metaInfo: {
      title: '文章列表',
      meta: [
        { vmid: 'keywords', name: 'keywords', content: 'jmingzi，nodejs，h5学习，小程序学习，pwa学习，前端学习，前端开发' },
        { vmid: 'description', name: 'description', content: '爱学习，爱生活，爱前端' },
        { name: 'author', content: 'jmingzi' }
      ]
    },

    components: {
      Waiting
    }
  }
</script>
