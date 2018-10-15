<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex sm12 md6>
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
      <v-flex md3>
        <v-btn-toggle v-model="filter.device" multiple style="margin-top: 9px;">
          <v-btn flat style="height: 45px">Traktor</v-btn>
          <v-btn flat style="height: 45px">&nbsp &nbsp Moto &nbsp &nbsp &nbsp</v-btn>
        </v-btn-toggle>
      </v-flex>
      <v-flex md3>
        <v-switch v-model="filter.few" label="tek azdar"></v-switch>
      </v-flex>
      <v-flex xs12>
        <app-product-list :filter="filter"></app-product-list>
      </v-flex>
    </v-layout>
    <v-layout column class="fab-container">
      <app-add-product>
        <v-btn
            fab>
          <v-icon>add</v-icon>
        </v-btn>
      </app-add-product>
    </v-layout>
  </v-container>
</template>

<script>
  import ProductList from '@/components/product/ProductList'
  import AddProduct from '@/components/product/AddProduct'
  import {ProductResource} from '@/plugins/http'

  export default {
    components: {
      'app-product-list': ProductList,
      'app-add-product': AddProduct,
    },
    data() {
      return {
        filter:{
          search: '',
          device: [0,1],
          few: 0
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
