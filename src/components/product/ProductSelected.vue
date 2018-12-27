<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex sm6 >
          <v-form ref="form" v-model="validator.ok" lazy-validation>
            <v-container>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field v-model="product.name" :rules="validator.name" label="Name of product"
                                required></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-autocomplete
                      v-model="product.place_id"
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
                <v-flex xs12>
                  <v-btn @click="save">Save</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-flex>
        <v-flex sm6 >
          <picture-input
              accept="image/jpeg,image/png"
              :prefill="product.image"
              :z-index="0"
              ref="pictureInput">
          </picture-input>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import {api} from "@/plugins";
  import PictureInput from 'vue-picture-input'

  export default {
    components:{
      PictureInput
    },
    data() {
      return {
        product: {
          id: 1,
          image: null,
          name: "",
          place_id: 0,
          price: 0,
          status: 2,
          type_id: 0,
        },
        validator: {
          name: [v => !!v || 'Name is required',],
          type: [v => !!v || 'Type is required',],
          place: [v => !!v || 'Place is required',],
          price: [
            v => !!v || 'Price is required',
            v => parseFloat(v) >= 0 || 'Price must be positive'
          ],
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
    mounted(){
      api.endpoints.product.getOne({id:this.$route.params.id}).then(response => {
        this.product = response.data;
        this.product.place_id = this.product.place.id;
        this.product.type_id = this.product.type.id;
        console.log(response.data)
      }, response => {
        console.log(response.data)
      });
    },
    methods: {
      save() {
        let formData = new FormData();
        formData.append('name',this.product.name);
        formData.append('place_id',this.product.place_id);
        formData.append('price',this.product.price);
        if (this.$refs.pictureInput.file) {
          formData.append('image', this.$refs.pictureInput.file)
        }
        formData.append('type_id',this.product.type_id);
        api.endpoints.product.patch(this.product,formData).then(response => {
          console.log(response.data);
          this.dialogOn = false;
          this.$store.dispatch('updateProducts');
        }).catch(error => {
          console.log("adas",error.response.data);
        });
      }
    }
  }
</script>

<style scoped>
</style>
