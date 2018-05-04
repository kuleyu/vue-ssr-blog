<template>
    <div class="my-ssr">
        <p>this is from client {{ clientName }}</p>
        <p>this is index.vue</p>
        <div>my name is {{ syncName }}</div>

        <user />
    </div>
</template>

<script>
    import User from './User.vue'

  export default {
    data() {
      return {
        clientName: 'Mac'
      }
    },

    components: {
      User
    },

    asyncData({ store, route }) {
      return store.dispatch('fetchItem', route.params.id)
    },

    created() {
      // console.log(this.$store)
    },

    computed: {
      syncName() {
        return this.$store.state.items[this.$route.params.id]
      }
    }
  }
</script>

<style lang="stylus">
.my-ssr
    color: #666;
    font-size: 16px;
</style>