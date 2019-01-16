<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm4 md3 v-for="trade in trades" :key="trade.id">
        <v-card>
          <v-img
              :src="trade.order.client.avatar" alt="avatar"
              aspect-ratio="0.85">
          </v-img>
          <v-card-title class="card-title">
              <span class="title">
                {{trade.order.client.first_name}} {{trade.order.client.last_name}} ({{trade.order.client.username}})
              </span>
          </v-card-title>
          <v-card-text class="text-sm-left">
            <div>
              <div class="title text-xs-right">
                {{trade.money|tenge}}
              </div>
              <div class="grey--text">
                <v-layout>
                  <v-flex xs6>{{trade.order.created|dateFormatShort}}</v-flex>
                  <v-flex xs6 class="text-xs-right">
                    {{trade.created|dateFormatShort}}
                  </v-flex>
                </v-layout>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="orange" @click="detail(trade.order.id)">Order</v-btn>
            <v-btn flat color="orange" @click="client(trade.order.client.id)">Client</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <div class="text-xs-center">
      <v-pagination v-if="page > 1"
          v-model="page"
          :length="pages"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
  import {api} from "@/plugins";

  export default {
    props: {
      search: String,
      archive: Boolean,
    },
    data() {
      return {
        trades: [],
        page: 1,
        pages: 1
      }
    },
    computed: {
      filter() {
        return {
          search: this.search,
          archive: this.archive,
          page: this.page,
          type: 'g',
        }
      },
      clients() {
        let clients = this.$store.getters.clients.slice();
        clients.unshift({id: 0, username: 'All'});
        return clients
      },
    },
    watch: {
      filter: {
        handler(value) {
          api.endpoints.trade.getAll(value).then(response => {
            this.trades = response.data.results;
            this.pages = response.data.pages
          }, error => {
          });
        },
        immediate: true,
        deep: true,
      },
    },
    methods: {
      detail(id) {
        this.$router.push({name: 'order-selected', params: {id}})
      },
      client(id) {
        this.$router.push({name: 'client-selected', params: {id}})
      },
    }
  }
</script>
