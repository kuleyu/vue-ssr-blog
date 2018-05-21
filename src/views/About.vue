<template>
  <div class="about">
    <div class="package margin-auto position-a">
      <pre>
        {
          "name": "jmingzi",
          "location": "hangzhou",
          "job": "FER",
          "life": "Driving, Coding, Reading, Tourism",
          "motto": "the power for execution",

          "about": "用vue ssr实现并部署在阿里云的blog",
          "github": "<a target="_blank" href="https://github.com/Jmingzi/vue-ssr-blog">https://github.com/Jmingzi/vue-ssr-blog</a>"
        }
      </pre>
    </div>
    <page-bottom />
  </div>
</template>

<script>
  const PageBottom = () => import('../components/PageBottom.vue')

  export default {
    name: 'About',

    metaInfo: {
      title: '关于',
      meta: [
        { vmid: 'keywords', name: 'keywords', content: 'jmingzi，nodejs，h5学习，小程序学习，pwa学习，前端学习，前端开发' },
        { vmid: 'description', name: 'description', content: '爱学习，爱生活，爱前端' },
        { name: 'author', content: 'jmingzi' }
      ]
    },

    components: {
      PageBottom
    }
  }
</script>

<style lang="stylus">
  .package
    width: 500px;
    top: 30%
    left: 50%
    transform: translate(-50%, -50%)
</style>
