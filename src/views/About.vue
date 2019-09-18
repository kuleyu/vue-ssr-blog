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

          "about": "vue ssr blog",
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
        { vmid: 'keywords', name: 'keywords', content: '前端博客，web前端，nodejs，vue，react，javascript，html，css' },
        { vmid: 'description', name: 'description', content: 'jmingzi的个人博客，前端基础教程、前端框架学习、前端代码分享、前端技术指导、分享在工作中总结的实战开发经验' },
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

    @media (max-height: 700px)
      width: 100%;
      position: static;
      transform: none;
      padding-top: 100px;
</style>
