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
        <app-order-list :filter="filter"></app-order-list>
      </v-flex>
    </v-layout>
    <v-layout column class="fab-container">
      <app-add-order>
        <v-btn
            fab>
          <v-icon>add</v-icon>
        </v-btn>
      </app-add-order>
    </v-layout>
  </v-container>
</template>

<script>
  import AddOrder from '@/components/order/AddOrder'
  import OrderList from "@/components/order/OrderList";

  export default {
    components: {
      'app-order-list': OrderList,
      'app-add-order': AddOrder,
    },
    data() {
      return {
        filter:{
          search: '',
          status: [0,1],
        },
        addDialog: false,
        newProduct: '',
        newDevice: 0,
        name$: [
          v => !!v || 'Name is required',
        ],
        saveProductValid: false
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
