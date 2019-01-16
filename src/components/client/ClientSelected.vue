<template>
  <div class="px-4" v-if="client">
    <v-layout row wrap class="my-3">
      <v-flex xs4>
        <v-avatar size="200">
          <v-img :src="client.avatar"></v-img>
        </v-avatar>
      </v-flex>
      <v-flex xs8 class="pa-2">
        <div class="title">
          <v-icon color="green" size="27">account_box</v-icon>
          {{client.first_name}} {{client.last_name}} ({{client.username}})
        </div>
        <div class="title">
          <v-icon color="green" size="27">home</v-icon>
          {{client.address}}
        </div>
        <div class="title">
          <v-icon color="green" size="27">account_balance_wallet</v-icon>
          {{client.money|tenge}}
        </div>
      </v-flex>
    </v-layout>
    <v-data-table v-if="trades"
                  :headers="tradeHeaders"
                  :items="trades"
                  :rows-per-page-items="[{text:'All',value:-1},10]"
                  :pagination.sync="pagination"
                  class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id}}</td>
        <td>
          <v-btn v-if="props.item.type === 'g'"
                 fab flat small
                 color="primary"
                 @click="detail(props.item.order.id)">
            <v-icon size="25">assignment</v-icon>
          </v-btn>
          <v-btn v-if="props.item.type === 'm'"
                 fab flat small
                 color="green">
            <v-icon size="25">account_balance_wallet</v-icon>
          </v-btn>
        <td>{{ props.item.created|dateFormatDigit}}</td>
        <td>{{ props.item.money|tenge}}</td>
        <td>{{ props.item.sum |tenge}}</td>
      </template>
    </v-data-table>
    <v-layout class="mb-5">
      <v-spacer></v-spacer>
      <div class="ma-2 mb-5">
        <a href="#" style="text-decoration:none">
          <v-btn class="success">
            <v-icon>description</v-icon>
          </v-btn>
        </a>
      </div>
    </v-layout>
    <v-dialog
        width="500"
        v-model="payment.dialog">
      <v-btn fab slot="activator" class="fab-container">
        <v-icon>account_balance_wallet</v-icon>
      </v-btn>
      <v-card>
        <v-card-title
            class="headline grey lighten-2"
            primary-title>
          Payment
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                  type="number"
                  v-model="payment.money"
                  label="Price">
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary" flat @click="payment.dialog = false">Close</v-btn>
          <v-btn class="primary" flat @click="savePayment">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {api} from "@/plugins";

  export default {
    mounted() {
      this.update()
    },
    data() {
      return {
        id: this.$route.params.id,
        client: null,
        trades: null,
        tradeHeaders: [
          {text: 'Id', value: 'id'},
          {text: 'Type', value: 'type'},
          {text: 'Time', value: 'created'},
          {text: 'Money', value: 'money'},
          {text: 'Finally', value: 'sum'},
        ],
        pagination: {
          descending: true,
          sortBy: 'created',
        },
        payment: {
          dialog: false,
          money: null,
        },

      }
    },
    methods: {
      savePayment() {
        let trade = {
          client: this.client.id,
          type: 'm',
          money: this.payment.money,
        };
        api.endpoints.trade.create(trade).then(response => {
          this.update()
        }, error => {
          console.log(error.response.data)
        });
        this.payment.dialog = false
      },
      update(){
        api.endpoints.client.getOne({id: this.id}).then(response => {
          this.client = response.data;
        }, error => {
          console.log(error.response.data)
        });
        api.endpoints.trade.getAll({client: this.id}).then(response => {
          this.trades = response.data.results
        }, error => {
          console.log(error.response.data)
        });
      },
      detail(id) {
        this.$router.push({name: 'order-selected', params: {id}})
      },
    }
  }
</script>

<style scoped>
  .fab-container {
    position: fixed;
    bottom: 24px;
    right: 24px;
  }
</style>

