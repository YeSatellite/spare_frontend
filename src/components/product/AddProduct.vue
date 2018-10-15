<template>
  <v-dialog v-model="dialogOn" persistent max-width="500px">
    <slot slot="activator"></slot>
    <v-card>
      <v-card-title>
        <span class="headline">Add Product</span>
      </v-card-title>
      <v-card-text>
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
                <v-text-field label="Select Image" @click='$refs.image.click()' v-model='imageName'
                              prepend-icon='attach_file'></v-text-field>
                <input
                    type="file"
                    style="display: none"
                    ref="image"
                    accept="image/*"
                    @change="onImagePicked"
                >
              </v-flex>
            </v-layout>
            <div v-if="which">
              <v-layout row wrap>
                <v-flex xs12 sm7>
                  <v-text-field v-model="productType.name" :rules="validator.name" label="Name of Type"
                                required></v-text-field>
                </v-flex>
                <v-flex xs12 sm5>
                  <v-btn-toggle class="alignright" v-model="productType.device">
                    <v-btn flat>Traktor</v-btn>
                    <v-btn flat>&nbsp &nbsp Moto &nbsp &nbsp &nbsp</v-btn>
                  </v-btn-toggle>
                </v-flex>
              </v-layout>
            </div>
            <div v-else>
              <v-layout row wrap>
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
            </div>
          </v-container>
        </v-form>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="which = !which">Change</v-btn>
        <v-btn color="blue darken-1" flat @click.native="dialogOn = false">Close</v-btn>
        <v-btn color="blue darken-1" :disabled="!validator.ok" flat @click.native="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {ProductResource, ProductTypeResource} from '@/plugins/http'
  import {EventBus} from "@/plugins/utility";

  export default {
    components: {},
    data() {
      return {
        dialogOn: false,
        which: true,
        product: {
          name: 'ghjk',
          place_id: 1,
          price: '580',
          image: null,
          type_id: 1,
        },
        productType: {
          name: '',
          device: 0
        },
        validator: {
          name: [v => !!v || 'Name is required',],
          type: [v => !!v || 'Type is required',],
          place: [v => !!v || 'Place is required',],
          price: [
              v => !!v || 'Price is required',
              v => parseFloat(v)>=  0 || 'Price must be positive'
          ],
          ok: false
        },
        imageName: ''
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
    methods: {
      save() {
        if (this.$refs.form.validate()) {
          if (this.which) {
            ProductTypeResource.add({}, {
              name: this.productType.name,
              device_id: this.productType.device + 1
            }).then(response => {
              this.product.type_id = response.body.id;
              this.saveProduct()
            }, response => {
              console.log(response.body)
            });
          } else {
            this.saveProduct()
          }

        }
      },
      saveProduct(){
        let formData = new FormData();
        formData.append('name',this.product.name);
        formData.append('place_id',this.product.place_id);
        formData.append('price',this.product.price);
        formData.append('image',this.product.image);
        formData.append('type_id',this.product.type_id);
        ProductResource.add({}, formData).then(response => {
          console.log(response.body);
          this.dialogOn = false
        }, response => {
          console.log(response.body)
        });
        EventBus.$emit('productCreated')
      },
      onImagePicked($event) {
        this.product.image = $event.target.files[0];
        if (this.product.image !== undefined) {
          this.imageName = this.product.image.name;
        } else {
          this.imageName = '';
          this.product.image = null;
        }
      }
    }
  }
</script>

<style scoped>
  .fab-container {
    position: fixed;
    bottom: 0;
    right: 0;
  }
</style>
