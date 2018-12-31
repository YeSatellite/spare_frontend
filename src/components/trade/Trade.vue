<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm8>
        <v-autocomplete class="mr-5"
            v-model="filter.client"
            :items="clients"
            item-value="id"
            item-text="username"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs12 sm4>
        <v-switch v-model="filter.archive" label="Archive"></v-switch>
      </v-flex>
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 v-for="trade in trades" :key="trade.id">
            <v-card>
              <v-img
                  :src="trade.order.client.avatar" alt="avatar"
                  aspect-ratio="0.85">
              </v-img>
              <v-card-title>
              <span class="title">
                {{trade.order.client.first_name}} {{trade.order.client.last_name}} ({{trade.order.client.username}})
              </span>
              </v-card-title>
              <v-card-text class="text-sm-left">
                <div>
                  <div class="title">
                    {{trade.money|tenge}}
                  </div>
                  <div class="grey--text">
                    <v-layout>
                      <v-flex xs6>{{trade.order.created|dateFormatShort}}</v-flex>
                      <v-flex xs6 class="text-xs-right">
                        {{trade.order.registered.first_name}} {{trade.order.registered.last_name}}
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs6>{{trade.created|dateFormatShort}}</v-flex>
                      <v-flex xs6 class="text-xs-right">
                        {{trade.registered.first_name}} {{trade.registered.last_name}}
                      </v-flex>
                    </v-layout>
                  </div>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn flat color="orange" @click="detail(trade.order.id)">Order</v-btn>
                <v-btn flat color="orange">Client</v-btn>
                <v-btn flat color="orange" @click="finishTrade(trade.id)">Finish</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <div class="text-xs-center">
      <v-pagination
          v-model="filter.page"
          :length="pages"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
  import {api} from "@/plugins";

  export default {
    data() {
      return {
        filter:{
          client: 0,
          archive: false,
          page:1
        },
        trades: [],
        pages:1
      }
    },
    computed: {
      clients() {
        let clients =  this.$store.getters.clients.slice();
        clients.unshift({id:0,username:'All'});
        return clients
      },
    },
    watch: {
      filter: {
        handler: function(value) {
          let query = {
            page:value.page,
            archive:value.archive
          };
          if(value.client) query.client = value.client;

            api.endpoints.trade.getAll(query).then(response => {
            this.trades = response.data.results;
            console.log(this.trades);
            this.pages = response.data.pages
          }, error => {
            console.log(error.response.data)
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
      finishTrade(id){
        api.endpoints.finishTrade.post({id}).then(response => {
          console.log(response.data);
        }, error => {
          console.log(error.response.data)
        });
      }
    }
  }
</script>
