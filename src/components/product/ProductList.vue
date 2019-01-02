<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 v-for="product in products" :key="product.id" >
          <v-card>
            <v-img
                :src="product.image || 'http://savings.gov.pk/wp-content/plugins/ldd-directory-lite/public/images/noimage.png'"
                alt="avatar"
                aspect-ratio="1.3">
            </v-img>
            <v-card-title>
              <div class="title">
                <span class="headline">{{product.type.name}} </span>
                <span class="grey--text">{{product.name}}</span>
              </div>
            </v-card-title>
            <v-card-text class="text-sm-left">
              <v-layout>
                <div>
                  <div class="title">{{product.price|tenge}}</div>
                  <div class="grey--text">{{product.place.name}}</div>
                </div>
                <v-spacer></v-spacer>
                <v-icon
                    v-if="product.amount<3"
                    size="40"
                    :color="product.amount===0?'error':'warning'">
                  error
                </v-icon>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="orange"  @click.native="selected(product.id)">Edit</v-btn>
            </v-card-actions>
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
