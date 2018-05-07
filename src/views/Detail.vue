<template>
  <div class="detail w700 margin-auto px-padding-b100">
    <div class="detail__head px-padding-t30">
      <h1>{{ detail.title || '标题' }}</h1>
      <p class="px-margin-tb10" v-if="tag">
        <span class="topic-tag" v-for="item in tag">{{ item }}</span>
      </p>
    </div>
    <div class="detail__content">
      <div class="detail__content-head">
        <span
          class="fr cursor-p"
          v-if="currentUser"
          @click="toEdit"
        >
          编辑
        </span>
        <p>
          <span class="font-bold">Jmingzi</span>
          <span> updated at {{ detail ? detail.updatedAt : '' | format }}</span>
        </p>
      </div>

      <article-content :content="detail ? detail.inputCompiled : ''"/>

      <div class="detail__options">
        <div class="detail__options-item">
          <img :src="require('../assets/zan.png')" class="ib-middle" width="22px" alt="git">
          <span class="ib-middle px-margin-l10">{{ detail ? detail.vantNum : '0' }}</span>
        </div>
      </div>
    </div>

    <page-bottom class="px-margin-t100" :is-fixed="false" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import ArticleContent from '../components/ArticleContent.vue'
  import PageBottom from '../components/PageBottom.vue'
  import { ago } from '../assets/date'

  export default {
    name: 'Detail',

    asyncData({ store, route }) {
      return store.dispatch('detail/FETCH_DETAIL', route.params.id)
    },

    metaInfo() {
      const detail = this.detail || {}
      return {
        title: detail.title || '文章详情',
        meta: [
          { vmid: 'keywords', name: 'keywords', content: detail.tag },
          { vmid: 'description', name: 'description', content: this.filterHtmlTag(detail.inputCompiled).substr(0, 150) }
        ]
      }
    },

    components: {
      ArticleContent,
      PageBottom
    },

    filters: {
      format(str) {
        let res
        Date.prototype.ago = ago
        res = new Date().ago(str)
        Date.prototype.ago = null
        return res
      }
    },

    computed: {
      ...mapState('detail', ['detail']),
      ...mapState(['currentUser']),

      tag() {
        return this.detail ? this.detail.tag.split('、') : []
      }
    },

    methods: {
      filterHtmlTag(str) {
        if (str) {
          str = str.replace(/\n/g, '').replace(/<\/*[a-z]+.*?>/g, '')
          return str
        }
        return ''
      },

      toEdit() {
        this.$router.push(`/editor/${this.$route.params.id}`)
      }
    }
  }
</script>

<style lang="scss">
  .detail__content {
    background-color: #fff;
    border: 1px solid #c0d3eb;
    border-radius: 3px;
    position: relative;
  }
  .detail__content-head {
    padding: 10px 15px;
    color: #586069;
    background-color: #f1f8ff;
    border-bottom: 1px solid #c0d3eb;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    font-size: 14px;
  }
  .detail__options {
    border-top: 1px solid #e1e4e8;
  }
  .detail__options-item {
    display: inline-block;
    padding: 9px 15px 7px;
    line-height: 18px;
    border-right: 1px solid #e1e4e8;
    color: #0366d6;
    cursor: pointer;
    font: normal normal 11px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    -webkit-font-smoothing: subpixel-antialiased;

    &:first-child {
      border-bottom-left-radius: 2px;
    }
    &:hover,
    &.tagged {
      background-color: #f1f8ff;
    }
  }
  .topic-tag {
    display: inline-block;
    padding: 0.3em 0.9em;
    margin: 0 0.5em 0.5em 0;
    white-space: nowrap;
    background-color: #f1f8ff;
    border-radius: 3px;
  }
</style>
