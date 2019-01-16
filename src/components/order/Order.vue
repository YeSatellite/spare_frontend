<template>
  <div>
    {{search}}
    <v-toolbar tabs class="pt-3">
      <v-text-field
          color="red"
          v-model="search"
          :hide-details="true"
          class="mx-3"
          flat
          label="Search"
          prepend-inner-icon="search"
          solo-inverted>
      </v-text-field>
      <v-tabs
          slot="extension"
          v-model="tabPosition"
          centered
          color="transparent"
          slider-color="white">
        <v-tab v-for="tab in tabs" :key="tab.id">
          {{tab.title}}
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="tabPosition">
      <v-tab-item v-for="tab in tabs" :key="tab.id" lazy>
        <v-card style="min-height: 100vh">
          <v-card-text>
            <app-order-list
                :search="search"
                v-if="tab.id === 1"/>
            <app-trade-list
                :search="search"
                :archive="false"
                v-if="tab.id === 2"/>
            <app-trade-list
                :search="search"
                :archive="true"
                v-if="tab.id === 3"/>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <app-add-order class="fab-container">
      <v-btn fab>
        <v-icon>add</v-icon>
      </v-btn>
    </app-add-order>
  </div>
</template>

<script>
  import AddOrder from '@/components/order/AddOrder'
  import OrderList from "@/components/order/OrderList";
  import TradeList from "@/components/order/TradeList";

  export default {
    components: {
      'app-order-list': OrderList,
      'app-trade-list': TradeList,
      'app-add-order': AddOrder,
    },
    data() {
      return {
        search: '',
        tabs:[
          {id:1, title: 'Waiting'},
          {id:2, title: 'Finished'},
          {id:3, title: 'Archive'},
        ],
        tabPosition:0
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
