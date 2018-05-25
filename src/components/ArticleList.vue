<template>
  <ul>
    <li
      class="px-line-45 px-padding-lr15 cl bd-gray-lighter-b hover"
      v-for="(item, i) in list"
      :key="i"
    >
      <div class="fr color-c999">
        <!--<i class="iconfont icon-shijian ib-middle" />-->
        <span class="ib-middle">{{ item.updatedAt | format }}</span>
        <!--<i class="iconfont icon-zan ib-middle px-margin-l10" />-->
        <!--<span class="ib-middle">{{ item.vantNum }}</span>-->
        <span
          v-if="currentUser"
          class="color-error ib-middle px-margin-l10 cursor-p"
          @click="del(item, i)"
        >
          删除
        </span>
      </div>
      <router-link
        :to="`/detail/${item.id}`"
        class="px-font-14"
      >
        <span>{{ item.title }}</span>
      </router-link>
    </li>
    <li
      v-if="!from"
      class="px-line-40 px-padding-lr15 cl text-center hover cursor-p"
      @click="$router.push('/article/1')"
    >
      <i class="iconfont icon-gengduo px-font-24" />
    </li>
  </ul>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { ago } from '../assets/date'

  export default {
    name: 'ArticleList',

    filters: {
      format(str) {
        let res
        Date.prototype.ago = ago
        res = new Date().ago(str)
        Date.prototype.ago = null
        return res
      }
    },

    props: {
      from: String,
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },

    computed: {
      ...mapState(['currentUser'])
    },

    methods: {
      ...mapActions('article', ['DEL_ARTICLE']),

      del(item, i) {
        this.$box.confirm('确认要删除吗？')
          .then(() => this.DEL_ARTICLE({ id: item.id, index: i }))
          .then(() => { this.$message.success('删除成功') })
      }
    }
  }
</script>
