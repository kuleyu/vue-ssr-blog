<template>
  <ul>
    <li
      class="px-line-45 px-padding-lr15 cl bd-gray-lighter-b hover"
      v-for="(item, i) in list"
      :key="i"
    >
      <div class="fr color-c999">
        <span class="ib-middle">{{ item.createdAt }}</span>
        <i class="iconfont icon-zan ib-middle px-margin-l10"></i>
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
  export default {
    name: 'ArticleList',

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
