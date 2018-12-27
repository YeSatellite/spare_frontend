<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 v-for="product in products" :key="product.id" >
          <v-card :style="{'background-color': statusColor[product.status]}" @click.native="selected(product.id)">
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
  import products from '@/plugins/mixins/product'
  export default {
    mixins: [products],
    props: {
      filter: {
        required: true
      }
    },
    data() {
      return {
        statusColor:{
          0:'#FFDDDD',
          1:'#FFFFAA',
          2:'#FFFFFF',
        }
      }
    },
    computed:{
      products(){
        console.log(this.filter);
        return this.productsFilter(this.filter)
      }
    },
    methods:{
      selected(id){
        console.log(id);
        this.$router.push({ name: 'product-selected', params: { id }})
      }
    }
  }
</script>

<style scoped>
</style>
