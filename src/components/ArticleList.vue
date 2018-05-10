<template>
  <ul>
    <li
      class="px-line-45 px-padding-lr15 cl bd-gray-lighter-b hover"
      v-for="(item, i) in dataList"
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
    <li class="text-center" v-if="isFromList">
      <pagination
        class="px-margin-tb20"
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="list.length"
        @current-change="currentChange"
      />
    </li>
    <li
      class="px-line-40 px-padding-lr15 cl text-center hover cursor-p"
      @click="$router.push('/article')"
      v-else
    >
      <i class="iconfont icon-gengduo px-font-24" />
    </li>
  </ul>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { ago } from '../assets/date'
  import { Pagination } from 'element-ui'

  export default {
    name: 'ArticleList',

    components: {
      Pagination
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

    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      },
      from: {
        type: String,
        default: 'index'
      }
    },

    data() {
      return {
        currentPage: 1,
        pageSize: 10
      }
    },

    computed: {
      ...mapState(['currentUser']),

      isFromList() {
        return this.from === 'list'
      },

      dataList() {
        if (this.isFromList) {
          const currentIndex = (this.currentPage - 1) * this.pageSize
          return this.list.slice(currentIndex, currentIndex + this.pageSize)
        }
        return this.list
      }
    },

    methods: {
      ...mapActions('article', ['DEL_ARTICLE']),

      del(item, i) {
        this.$box.confirm('确认要删除吗？')
          .then(() => this.DEL_ARTICLE({ id: item.id, index: i }))
          .then(() => { this.$message.success('删除成功') })
      },

      currentChange(val) {
        this.currentPage = val
      }
    }
  }
</script>
