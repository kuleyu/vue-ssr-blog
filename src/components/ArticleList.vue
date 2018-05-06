<template>
  <ul>
    <li
      class="px-line-45 px-padding-lr15 cl bd-gray-lighter-b hover"
      v-for="(item, i) in list"
      :key="i"
    >
      <div class="fr color-c999">
        <i class="iconfont icon-shijian ib-middle" />
        <span class="ib-middle">{{ item.createdAt | format }}</span>
        <i class="iconfont icon-zan ib-middle px-margin-l10" />
        <span class="ib-middle">20</span>
      </div>
      <router-link
        to="/"
        class="px-font-14"
      >
        <span>{{ item.title || '标题' }}</span>
      </router-link>
    </li>
    <li class="px-line-40 px-padding-lr15 cl text-center hover cursor-p">
      <i class="iconfont icon-gengduo px-font-24" />
    </li>
  </ul>
</template>

<script>
  import { format } from '../assets/date'

  export default {
    name: 'ArticleList',

    filters: {
      format(str) {
        return format(str, 'yy/MM/dd')
      }
    },

    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>
