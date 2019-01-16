<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
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
  </v-container>
</template>

<script>

  import ClientList from "@/components/client/ClientList";

  export default {
    components: {
      'app-client-list': ClientList,
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
