<template>
  <div class="about">
    <div class="package">
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
    <page-bottom
      :is-fixed="false"
    />
  </div>
</template>

<script>
  // import hljs from "highlight.js"
  // import "highlight.js/styles/github.css"
  // import MarkDisplay, { setHighlighter } from "vue-mark-display"
  // setHighlighter(code => hljs.highlightAuto(code).value)
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
  .about
    display flex
    flex-direction column
    justify-content center
    align-items center
  .package
    width: 500px;
    margin-top 20%
    margin-bottom 100px

    @media (max-height: 812px)
      width: 100%;
      padding-top: 100px;
</style>
