<template>
  <div>
    <v-navigation-drawer
        clipped
        v-model="sideNav"
        app>
      <v-list>
        <v-list-tile v-for="item in menuItems"
                     :key="item.title"
                     router
                     :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app clipped-left>
      <v-toolbar-side-icon @click.native.stop="sideNav =! sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>Spare</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat>
          {{user.name}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Header',
    data() {
      return {
        sideNav: false,
        menuItems: [
          {icon: 'home', title: 'Home', link: '/'},
          {icon: 'store', title: 'Products', link: 'products'},
          {icon: 'face', title: 'Foo', link: 'tools'},
        ]
      }
    },
    computed: {
      ...mapGetters([
        'user',
      ])
    }
  }
</script>

<style scoped lang="scss">
</style>
