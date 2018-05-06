<template>
  <div class="page-bottom__menu position-a px-bottom-20 text-center">
    <div class="px-margin-b10">
      <a href="">
        <span class="ib-middle">登录系统</span>
      </a>
    </div>
    <ul class="font-0 margin-auto">
      <li
        v-for="item in menu"
        :key="item.id"
        class="ib-middle px-font-14 px-width-50"
      >
        <router-link :to="item.path">{{ item.name }}</router-link>
      </li>
    </ul>
    <p class="color-c999 px-margin-t10 px-font-12">最后更新：2018-02-09</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        menu: [
          {
            id: 1,
            name: '首页',
            path: '/'
          },
          {
            id: 2,
            name: '计划',
            path: '/plan'
          },
          {
            id: 3,
            name: '文章',
            path: '/article'
          },
          {
            id: 4,
            name: '关于',
            path: '/about'
          }
        ]
      }
    }
  }
</script>

<style lang="scss">
  .page-bottom__menu {
    left: 50%;
    transform: translateX(-50%);
  }
</style>
