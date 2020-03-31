<template>
  <div class="record-days height-100">
    <div class="record-days__top">
      <span class="record-days__title">RecordDays</span>
      <span class="record-days__slogan">记录一瞬间的想法</span>
    </div>
    <div class="record-days__content">
      <div class="record-days__area">
        <div
          v-for="(item, i) in list"
          :key="i + item.id"
          class="record-days__item"
          @click="$router.push(`/detail/${item.id}`)"
        >
          <div v-if="/http:/.test(item.tag)" class="record-days__item--img">
            <img :src="item.tag" alt="" width="100px">
          </div>
          <div class="record-days__item--con">
            <p class="record-days__item--title">
              <a href="javascript:;" class="link-a">{{ item.title }}</a>
              <span>{{ item.createdAt | format }}</span>
            </p>
            <p class="record-days__item--desc">{{ item.inputCompiled | summary }}</p>
            <p>
              <span
                v-if="currentUser"
                class="color-error ib-middle px-margin-t10 cursor-p"
                @click.stop="del(item, i)"
              >
                删除
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <page-bottom
      :is-fixed="false"
    />
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import { ago } from "../assets/date"
  import { summary } from "../assets/util"
  const PageBottom = () => import('../components/PageBottom.vue')

  export default {
    name: 'Index',

    filters: {
      format(str) {
        let res
        Date.prototype.ago = ago
        res = new Date().ago(str)
        Date.prototype.ago = null
        return res
      },
      summary
    },

    metaInfo: {
      title: 'RecordDays',
      meta: [
        { vmid: 'keywords', name: 'keywords', content: 'idea，灵感，想法' },
        { vmid: 'description', name: 'description', content: '记录一瞬间的想法' },
        { name: 'author', content: 'jmingzi' }
      ]
    },

    asyncData({ store }) {
      return store.dispatch('article/FETCH_LIST', {
        limit: 500,
        field: ['title', 'tag', 'isOuterLink', 'type', 'inputCompiled'],
        condition: [
          {
            field: 'type',
            value: 'record-days'
          }
        ],
        cacheKey: 'record-days'
      })
    },

    components: {
      PageBottom
    },

    data() {
      return {
        items: null
      }
    },

    computed: {
      ...mapState('article', ['list']),
      ...mapState(['currentUser'])
    },

    created() {
      this.SET_DETAIL(null)
    },

    mounted () {
    },

    methods: {
      ...mapMutations('article', ['SET_DETAIL']),
      ...mapActions('article', ['DEL_ARTICLE']),
      del(item, i) {
        this.$box.confirm('确认要删除吗？')
          .then(() => this.DEL_ARTICLE({ id: item.id, index: i }))
          .then(() => { this.$message.success('删除成功') })
      }
    }
  }
</script>

<style lang="stylus">
.record-days
  &__top
    line-height 50px
    height 50px
    padding 0 50px
  &__title
    font-weight: bold
    font-size: 30px
    font-family: interface,-webkit-pictograph,serif
  &__slogan
    font-size 12px
    color #999
    margin-left 10px
  &__content
    height calc(100% - 150px)
    margin-bottom 20px
    overflow auto
    padding 0 50px
    background #f2f2f2
  &__area
    width 800px
    margin 0 auto
  &__item
    display flex
    padding 10px 15px
    // height 100px
    background-color #fff
    margin 10px
    font-size 14px
    .link-a:after
      z-index 1
    &--img
      margin-right 10px
      img
        max-lines 150px
    &--con
      flex-grow 1
    &--title
      display flex
      justify-content space-between
      align-items center
      span
        color #999
        font-size 12px
    &--desc
      color #999
      margin-top 10px
</style>
