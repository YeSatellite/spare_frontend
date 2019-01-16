<template>
  <div>
    <app-header></app-header>
    <v-content>
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
  import Header from '@/components/Header'

  export default {
    name: 'Main',
    components: {
      'app-header': Header,
    },
    data() {
      return {
      }
    },
    mounted() {
      if (!this.$store.getters.user.token) {
        this.$router.push('signin')
      }
      this.$store.dispatch('updateClients');
      this.$store.dispatch('updatePlaces');
      this.$store.dispatch('updateProductTypes');
      this.$store.dispatch('updateProducts');
    },
  }
</script>

<style>
  .alignleft {
    float: left;
  }
  .alignright {
    float: right;
  }
  .card-title {
    max-height:60px
  }
</style>
