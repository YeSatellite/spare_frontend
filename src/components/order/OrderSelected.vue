<template>
  <div class="px-4" v-if="order">
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
    <v-data-table v-if="items"
                  :headers="itemHeaders"
                  :items="items"
                  class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.product.id}}</td>
        <td>{{ props.item.product.type.name }} {{ props.item.product.name }}</td>
        <td>{{ props.item.price|tenge }}</td>
        <td>{{ props.item.amount }}</td>
        <td>{{ props.item.total|tenge}}</td>
        <td v-if="order.status === 'w'" class="text-xs-center">
          <v-btn
              small icon
              :color="props.item.status?'success':'secondary'"
              @click="changeStatus(props.item)">
            <v-icon size="20">done</v-icon>
          </v-btn>
          <v-btn
              small icon
              class="error"
              @click="dialogItem = {warning:true, item:props.item}">
            <v-icon size="20">delete_outline</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="footer" v-if="order.status === 'w'">
        <td>
          {{newItem.product.id}}
        </td>
        <td>
          <v-autocomplete
              v-model="newItem.product"
              :items="products"
              item-value="info"
              item-text="fullName"
          ></v-autocomplete>
        </td>
        <td>
          <v-text-field
              style="width: 80px"
              type="number"
              v-model="newItem.product.price"
              label="Price"
              required>
          </v-text-field>
        </td>
        <td>
          <v-text-field
              style="width: 80px"
              type="number"
              v-model="newItem.amount"
              label="Amount"
              required>
          </v-text-field>
        </td>
        <td>
          {{newItem.product.price*newItem.amount|tenge}}
        </td>
        <td class="text-xs-center">
          <v-btn @click="saveNewItem()" class="primary">
            <v-icon>playlist_add</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <div>
      <v-layout>
        <v-flex xs6 class="text-xs-center  caption ma-4">
          {{status.count}} ({{status.money|tenge}}) / {{status.countAll}} ({{status.moneyAll|tenge}})
          <v-progress-linear
              :value="status.count/status.countAll*100">
          </v-progress-linear>
        </v-flex>
        <v-flex xs6>
          <div class="text-xs-right mt-4 mb-5">
            <a :href="orderExcel" style="text-decoration:none">
              <v-btn class="success">
                <v-icon>description</v-icon>
              </v-btn>
            </a>
            <span v-if="order.status === 'w'">
              <v-dialog
                  width="500"
                  v-model="dialogOrderWarning">
                <v-btn
                    slot="activator"
                    class="error">
                  <v-icon>delete</v-icon>
                </v-btn>
                <v-card>
                  <v-card-title
                      class="headline grey lighten-2"
                      primary-title>
                    Warning
                  </v-card-title>
                  <v-card-text>
                    Are you sure to remove this ORDER?
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        flat
                        @click="removeOrder">
                      Yes
                    </v-btn>
                    <v-btn
                        color="primary"
                        flat
                        @click="dialogOrderWarning = false">
                      No
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn class="primary" @click="finish">
                <v-icon>save</v-icon>
              </v-btn>
            </span>
          </div>
        </v-flex>
      </v-layout>
    </div>
    <v-snackbar
        v-model="snackbar.show"
        :bottom="true"
        :timeout="5000">
      {{ snackbar.text }}
      <v-btn
          color="pink"
          flat
          @click="snackbar.show = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-dialog
        width="500"
        v-model="dialogItem.warning">
      <v-card>
        <v-card-title
            class="headline grey lighten-2"
            primary-title>
          Warning
        </v-card-title>
        <v-card-text>
          Are you sure to remove this item?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              flat
              @click="removeItem">
            Yes
          </v-btn>
          <v-btn
              color="primary"
              flat
              @click="dialogItem.warning = false">
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {api} from "@/plugins";
  import moment from "moment"
  import AddItem from "./AddItem";

  export default {
    components: {
      'app-add-item': AddItem,
    },
    mounted() {
      api.endpoints.order.getOne({id: this.id}).then(response => {
        this.order = response.data;
        console.log(this.order);
      }, error => {
        console.log(error.response.data)
      });
      api.endpoints.orderItem.getAll({order: this.id}).then(response => {
        this.items = response.data.map((item) => {
          item.total = item.price * item.amount;
          return item
        });
      }, error => {
        console.log(error.response.data)
      });
    },
    data() {
      return {
        id: this.$route.params.id,
        order: null,
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
        },
        newItem: {
          product: {
            id: 0,
            price: 0
          },
          amount: 1,
        },
        snackbar: {
          show: false,
          text: '',
        },
        dialogItemWarning: false,
        dialogItem: {
          warning: false,
          item: null,
        },
        dialogOrderWarning: false
      }
    },
    computed: {
      itemHeaders() {
        let headers = [
          {text: 'Id', value: 'id'},
          {text: 'Name', value: 'name'},
          {text: 'Price', value: 'price'},
          {text: 'Amount', value: 'amount'},
          {text: 'Total', value: 'total'},
        ];
        if (this.order.status === 'w'){
          headers.push({text: 'Status', value: 'status', align: 'center'},)
        }
        return headers
      },
      products() {
        return this.$store.getters.products
      },
      status() {
        let all = {
          money: 0,
          moneyAll: 0,
          count: 0,
          countAll: 0,
        };
        for (let i in this.items) {
          let item = this.items[i];
          if (item.status) {
            all.money += item.price * item.amount;
            all.count += 1;
          }
          all.moneyAll += item.price * item.amount;
          all.countAll += 1;
        }
        all.ok = all.count === all.countAll;
        return all
      },
      orderExcel() {
        return api.orderExcel(this.order.id)
      }
    },
    filters: {
      dateFormatLong(value) {
        if (value) {
          return moment(String(value)).format('llll');
        }
      }
    },
    methods: {
      changeStatus(item) {
        api.endpoints.orderItem.patch(item, {status: !item.status}).then(response => {
          response.data.total = response.data.price * response.data.amount;
          let index = this.items.map(x => x.id).indexOf(item.id);
          this.$set(this.items, index, response.data);
        }, error => {
          console.log(error.response.data)
        });
      },
      removeItem() {
        let item = this.dialogItem.item;
        api.endpoints.orderItem.delete(item).then(response => {
          let index = this.items.map(x => x.id).indexOf(item.id);
          this.items.splice(index, 1) //TODO check
        }, error => {
          console.log(error.response.data)
        });
        this.dialogItem.warning = false
      },
      saveNewItem() {
        let data = {
          order: this.order.id,
          product_id: this.newItem.product.id,
          amount: this.newItem.amount,
          price: this.newItem.product.price,
        };
        api.endpoints.orderItem.create(data).then(response => {
          response.data.total = response.data.price * response.data.amount;
          this.items.push(response.data)
        }, error => {
          console.log(error.response.data)
        });
        this.newItem = {
          product: {
            id: 0,
            price: 0
          },
          amount: 1,
        };
      },
      finish() {
        if (!this.status.ok) {
          this.snackbar.text = 'Choose all';
          this.snackbar.show = true;
          return
        }
        let data = {
          order_id: this.order.id,
          type: 'g',
        };
        api.endpoints.trade.create(data).then(response => {
          api.endpoints.order.getOne({id: this.id}).then(response => {
            this.order = response.data;
          }, error => {
          });
        }, error => {
          console.log(error.response.data)
        });
      },
      removeOrder() {
        api.endpoints.order.delete(this.order).then(response => {
          this.$router.push({name: 'order'})
        }, error => {
          console.log(error.response.data)
        });
        this.dialogItemWarning = false
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
