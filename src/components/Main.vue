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
      console.log(this.$store.getters.user.token);
      if (this.$store.getters.user.token == null) {
        this.$router.push('signin')
      }
      this.$store.dispatch('updateProductTypes');
      this.$store.dispatch('updatePlaces');
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
</style>
