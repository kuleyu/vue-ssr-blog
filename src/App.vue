<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',

    metaInfo: {
      titleTemplate: '%s - Jmingzi',
    }
  }
</script>

<style lang="less">
@border-color: #eee;
@bg-color: #f2f2f2;
@main-color: #4e9afa;
@import '~v-comment/src/style/index.less';
</style>
<style lang="stylus">
  html, body, #app
    height: 100%

  #app
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    color: #24292e

  @font-face
    font-family: interface
    src: url('./assets/font/interface.ttf')

  .hover
    &:hover
      background-color: #f7f8f9

  .w700
    width: 700px

  @media (max-width 700px)
    .w700
      width: 90%;
</style>
