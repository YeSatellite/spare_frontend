<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 v-for="product in products" :key="product.id" >
          <v-card :style="{'background-color': statusColor[product.status]}">
            <v-img class="white--text"
                   height="200px"
                   :src="product.image || 'http://savings.gov.pk/wp-content/plugins/ldd-directory-lite/public/images/noimage.png'">
            </v-img>
            <v-card-text class="text-sm-left">
              <div>
                <div class="headline">{{product.type.name}}</div>
                <div class="grey--text">{{product.name}}</div>
                <div class="text-sm-right"><h2>{{product.price}} ₸</h2></div>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import {ProductResource} from '@/plugins/http'
  import {EventBus} from '@/plugins/utility'

  export default {
    props: {
      filter: {
        required: true
      }
    },
    data() {
      return {
        products: [],
        busy: false,
        statusColor:{
          0:'#FFDDDD',
          1:'#FFFFAA',
          2:'#FFFFFF',
        }
      }
    },
    mounted(){
      EventBus.$on('productCreated', () => {
        console.log('yes');
        this.getProducts()
      });
    },
    watch: {
      filter: {
        immediate: true,
        deep: true,
        handler() {
          this.getProducts()
        },
      },
    },
    methods: {
      getProducts(){
        if (this.busy) return;
        this.busy = true;
        ProductResource.getAll({
          search: this.filter.search,
          device: this.filter.device.map(val => val+1).join('-'),
          few: this.filter.few?1:0
        }).then(response => {
          this.products = response.body;
          this.busy = false;
          console.log(response.body)
        }, response => {
          console.log(response.body)
        });
      }
    }
  }
</script>

<style scoped>
</style>
