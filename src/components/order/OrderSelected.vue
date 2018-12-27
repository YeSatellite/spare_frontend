<template>
  <div class="px-4">
    <div v-if="order">
      <div class="my-3">
        <v-layout row wrap>
          <v-flex xs4>
            <v-avatar size="200">
              <v-img :src="order.client.avatar"></v-img>
            </v-avatar>
          </v-flex>
          <v-flex xs8 class="pa-2">
            <div class="title">
              <v-icon color="green" size="27">account_box</v-icon>
              {{order.client.first_name}} {{order.client.last_name}} ({{order.client.username}})
            </div>
            <div class="title">
              <v-icon color="green" size="27">home</v-icon>
              {{order.client.address}}
            </div>
            <div class="title">
              <v-icon color="green" size="27">account_balance_wallet</v-icon>
              {{order.client.money|tenge}}
            </div>
            <hr class="my-2">
            <div class="title">
              <v-icon color="red" size="27">alarm</v-icon>
              {{order.created|dateFormatLong}}
            </div>
            <p class="text-xs-right mr-5">
              <v-icon :color="status_icons[order.status].color" size="45">{{status_icons[order.status].icon}}</v-icon>
            </p>
          </v-flex>
        </v-layout>
      </div>
    </div>
    <div>
      <v-data-table v-if="items"
                    :headers="itemHeaders"
                    :items="items"
                    class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.product.id}}</td>
          <td>{{ props.item.product.name }}</td>
          <td>{{ props.item.price|tenge }}</td>
          <td>{{ props.item.amount }}</td>
          <td>{{ props.item.price*props.item.amount|tenge}}</td>
          <td class="text-xs-center">
            <v-btn
                small icon
                :color="props.item.status==='f'?'green':'grey lighten-3'"
                @click="changeStatus(props.index,props.item.id,'f')">
              <v-icon size="20">add</v-icon>
            </v-btn>
            <v-btn
                small icon
                :color="props.item.status==='c'?'red':'grey lighten-3'"
                @click="changeStatus(props.index,props.item.id,'c')">
              <v-icon size="20">remove</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
  import {api} from "@/plugins";
  import moment from "moment"
  import * as Vue from "vue";

  export default {
    data() {
      return {
        id: this.$route.params.id,
        order: null,
        itemHeaders: [
          {text: 'Id', value: 'id'},
          {text: 'Name', value: 'name'},
          {text: 'Price', value: 'price'},
          {text: 'Amount', value: 'amount'},
          {text: 'Total', value: 'total'},
          {text: 'Status', value: 'status', align: 'center'},
        ],
        items: null,
        status_icons: {
          'w': {
            icon: 'add_shopping_cart',
            color: 'brown'
          },
          'a': {
            icon: 'local_shipping',
            color: 'blue'
          },
          'f': {
            icon: 'done_all',
            color: 'green'
          },
          'c': {
            icon: 'clear',
            color: 'red'
          },
        }
      }
    },
    computed: {},
    filters: {
      dateFormatLong(value) {
        if (value) {
          return moment(String(value)).format('llll');
        }
      }
    },
    mounted() {
      api.endpoints.order.getOne({id: this.id}).then(response => {
        this.order = response.data;
        console.log(this.order);
      }, error => {
        console.log(error.response.data)
      });
      api.endpoints.orderItem.getAll({order: this.id}).then(response => {
        this.items = response.data;
      }, error => {
        console.log(error.response.data)
      });
    },
    methods: {
      changeStatus(index,id,status){
        api.endpoints.orderItem.patch({id},{status}).then(response => {
          this.$set(this.items, index, response.data)
        }, error => {
          console.log(error.response.data)
        });
      }
    }
  }
</script>

<style scoped>
  .circle {
    border-radius: 50%;
  }
</style>
