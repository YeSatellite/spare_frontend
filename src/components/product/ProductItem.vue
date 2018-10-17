<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex sm12 md6>
        <v-form ref="form" v-model="validator.ok" lazy-validation>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field v-model="product.name" :rules="validator.name" label="Name of product"
                            required></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-autocomplete
                  v-model="product.place.id"
                  :rules="validator.place"
                  :items="places"
                  item-value="id"
                  item-text="name"
                  hint="Choose place"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs6>
              <v-text-field type="number" v-model="product.price" :rules="validator.price" label="Price"
                            required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-autocomplete
                  v-model="product.type_id"
                  :rules="validator.type"
                  :items="types"
                  item-value="id"
                  item-text="name"
              ></v-autocomplete>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
      <v-flex sm12 md6>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {api} from '../../plugins'
  import PictureInput from 'vue-picture-input'

  export default {
    components: {
      PictureInput,
    },
    data() {
      return {
        product: {
          id: 1,
          image: null,
          name: "",
          place: {id: 0},
          price: 0,
          status: 2,
          type: {id: 0},
        },
        validator: {
          name: [v => !!v || 'Name is required',],
          type: [v => !!v || 'Type is required',],
          place: [v => !!v || 'Place is required',],
          price: [
            v => !!v || 'Price is required',
            v => parseFloat(v) >= 0 || 'Price must be positive'
          ],
          ok: false
        },
      }
    },
    computed: {
      types() {
        return this.$store.getters.productTypes
      },
      places() {
        return this.$store.getters.places
      }
    },
    mounted() {
      api.endpoints.products.getAll({id: this.$route.params.id},{id: this.$route.params.id}).then(response => {
        this.products = response.data;
        console.log(response.data)
      }, response => {
        console.log(response.data)
      })
    },
    methods: {}
  }
</script>

<style scoped>
</style>
