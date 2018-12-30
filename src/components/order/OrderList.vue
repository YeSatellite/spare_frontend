<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 v-for="order in ordersFiltered" :key="order.id">
          <v-card>
            <v-img
                :src="order.client.avatar" alt="avatar"
                aspect-ratio="0.85">
            </v-img>
            <v-card-title>
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
              <v-btn flat color="orange">Client</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import {api, EventBus} from "@/plugins";
  import moment from "moment"

  export default {
    props: {
      filter: {
        required: true
      },
    },
    mounted() {
      this.getOrders();
      EventBus.$on('order-update', () => {
        this.getOrders();
      });
    },
    data() {
      return {
        statusColor: {
          0: '#FFDDDD',
          1: '#FFFFAA',
          2: '#FFFFFF',
        },
        orders: [],
      }
    },
    computed: {
      ordersFiltered() {
        return this.orders.filter(order =>
            order.client.username.includes(this.filter.search) ||
            order.client.first_name.includes(this.filter.search) ||
            order.client.last_name.includes(this.filter.search)
        );
      }
    },
    filters: {
      dateFormatShort(value) {
        if (value) {
          return moment(String(value)).format('ll');
        }
      }
    },
    methods: {
      getOrders(){
        api.endpoints.order.getAll().then(response => {
          this.orders = response.data
        }, error => {
          console.log(error.response.data)
        });
      },
      detail(id) {
        this.$router.push({name: 'order-selected', params: {id}})
      },
      orderFilter(filter) {
        let products = this.$store.getters.orders;

        if (filter == null) return products;

        if (filter.device && filter.device.length === 1) {
          products = products.filter(product => product.type.device.id === this.filter.device[0] + 1)
        }

        if (filter.few) {
          products = products.filter(product => product.status <= 1)
        }

        if (filter.search) {
          let newProducts = products.slice();
          const searches = filter.search.split(',').map((part) => part.trim());
          console.log(searches);
          for (let search of searches) {
            console.log(search);
            let tmp = products.filter((product) => {
              return product.name.includes(search)
                  || product.type.name.includes(search)
            });
            newProducts = newProducts.filter(value => -1 !== tmp.indexOf(value));
          }
          products = newProducts
        }

        return products
      }
    }
  }
</script>
