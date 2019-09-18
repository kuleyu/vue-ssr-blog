<template>
  <div class="word">
    <div class="word__wrap position-a cl">
      <div class="word__control px-width-50 px-line-50" @click="control(-1)">
        <i class="iconfont icon-fanhui color-c999" />
      </div>
      <div class="word__content">
        <p class="position-r">
          <i class="iconfont icon-quotation position-a word__icon" />
          <span>{{ content.content }}</span>
        </p>
        <p class="text-right px-padding-t50 px-font-12 color-ccc">
          ——
          {{ content.time }}
          {{ content.locate }}
        </p>
      </div>
      <div class="word__control px-width-50 px-line-50" @click="control(1)">
        <i class="iconfont icon-gengduo1 color-c999" />
      </div>
    </div>
    <div class="position-a bottom-0 width-100">
      <page-bottom
        :is-fixed="false"
      />
    </div>
  </div>
</template>

<script>
  import Waiting from '../components/Waiting.vue'
  const PageBottom = () => import('../components/PageBottom.vue')

  export default {
    name: 'OneWord',

    metaInfo: {
      title: '一句',
      meta: [
        { vmid: 'keywords', name: 'keywords', content: '前端博客，web前端，nodejs，vue，react，javascript，html，css' },
        { vmid: 'description', name: 'description', content: 'jmingzi的个人博客，前端基础教程、前端框架学习、前端代码分享、前端技术指导、分享在工作中总结的实战开发经验' },
        { name: 'author', content: 'jmingzi' }
      ]
    },

    components: {
      Waiting,
      PageBottom
    },

    data() {
      return {
        list: [
          {
            content: 'Be calm, be thinking !',
            time: '19.09.17',
            locate: '杭州'
          },
          {
            content: '自律、有计划的生活，才会留下更多回忆。',
            time: '18.09.02',
            locate: '杭州·北苑'
          },
          {
            content: '人越往后活，便越喜欢听很多年前喜欢到窒息的歌。',
            time: '18.05.18',
            locate: '杭州·北苑'
          }
        ],
        currIndex: 0
      }
    },

    computed: {
      content() {
        return this.list[this.currIndex]
      }
    },

    methods: {
      control(dir) {
        if (
          this.currIndex + 1 === this.list.length &&
          dir > 0
        ) {
          this.currIndex = 0
        } else if (
          this.currIndex === 0 &&
          dir < 0
        ) {
          this.currIndex = this.list.length - 1
        } else {
          this.currIndex += dir
        }
      }
    }
  }
</script>

<style lang="stylus">
.word
  &__wrap
    width 1000px
    left 50%
    top 50%
    transform translate(-50%, -50%)
    text-align center
    display flex
    justify-content center
    align-items center
  &__content
    width 900px
    padding 0 80px
    font-size 20px
  &__control
    cursor pointer
    &:hover
      background-color #f2f2f2
  &__icon
    top -80px
    left 0
    font-size 40px
    color #ccc
</style>
