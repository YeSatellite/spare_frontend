<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm8>
        <v-text-field
            style="margin-top: 8px; margin-left: 24px"
            flat
            label="Search"
            prepend-inner-icon="search"
            solo-inverted
            :hide-details="true"
            v-model="filter.search"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <app-client-list :filter="filter"></app-client-list>
      </v-flex>
    </v-layout>
    <v-layout column class="fab-container">
      <app-add-client>
        <v-btn
            fab>
          <v-icon>add</v-icon>
        </v-btn>
      </app-add-client>
    </v-layout>
  </v-container>
</template>

<script>

  import ClientList from "@/components/client/ClientList";
  import AddClient from "@/components/client/AddClient";

  export default {
    components: {
      'app-client-list': ClientList,
      'app-add-client': AddClient,
    },
    data() {
      return {
        filter:{
          search: '',
        },
        addClientDialog: false,
      }
    },
  }
</script>

<style scoped>
  .fab-container {
    position: fixed;
    bottom: 24px;
    right: 24px;
  }
</style>
