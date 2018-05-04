<template>
    <div>{{ $store.state.user }}</div>
</template>

<script>
    // import { mapState } from 'vuex'
    export default {
      asyncData({ store, route }) {
        return store.dispatch('fetchUser', route.params.id)
      }
    }
</script>