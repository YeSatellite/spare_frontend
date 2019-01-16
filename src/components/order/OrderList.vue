<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm4 md3 v-for="order in ordersFiltered" :key="order.id">
        <v-card>
          <v-img
              :src="order.client.avatar" alt="avatar"
              aspect-ratio="0.85">
          </v-img>
          <v-card-title class="card-title">
              <span class="title">
                {{order.client.first_name}} {{order.client.last_name}} ({{order.client.username}})
              </span>
          </v-card-title>
          <v-card-text class="text-sm-left">
            <div>
              <div class="caption text-sm-center">
                {{order.items_info.count}} ({{order.items_info.money|tenge}}) /
                {{order.items_info.countAll}} ({{order.items_info.moneyAll|tenge}})
              </div>
              <v-progress-linear :value="order.items_info.count/order.items_info.countAll*100"></v-progress-linear>
              <div class="grey--text">
                <v-layout>
                  <v-flex xs6>{{order.created|dateFormatShort}}</v-flex>
                  <v-flex xs6 class="text-xs-right">
                    {{order.registered.first_name}} {{order.registered.last_name}}
                  </v-flex>
                </v-layout>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="orange" @click="detail(order.id)">Detail</v-btn>
            <v-btn flat color="orange" @click="client(order.client.id)">Client</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {api, EventBus} from "@/plugins";

  export default {
    props: {
      search: String
    },
    mounted() {
      this.getOrders();
      EventBus.$on('order-update', () => {
        this.getOrders();
      });
    },
    data() {
      return {
        orders: [],
      }
    },
    computed: {
      ordersFiltered() {
        return this.orders.filter(order =>
            order.client.username.includes(this.search) ||
            order.client.first_name.includes(this.search) ||
            order.client.last_name.includes(this.search)
        );
      }
    },
    methods: {
      getOrders() {
        api.endpoints.order.getAll().then(response => {
          this.orders = response.data
        }, error => {
          console.log(error.response.data)
        });
      },
      detail(id) {
        this.$router.push({name: 'order-selected', params: {id}})
      },
      client(id) {
        this.$router.push({name: 'client-selected', params: {id}})
      },
    }
  }
</script>
