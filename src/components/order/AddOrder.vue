<template>
  <v-dialog v-model="dialogOn" persistent max-width="500px">
    <slot slot="activator"></slot>
    <v-card>
      <v-card-title>
        <span class="headline">Add Order</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="validator.ok" lazy-validation>
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <v-autocomplete
                    v-model="order.client_id"
                    :rules="validator.client_id"
                    :items="clients"
                    item-value="id"
                    item-text="username"
                    hint="Choose Client"
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialogOn = false">Close</v-btn>
        <v-btn color="blue darken-1" :disabled="!validator.ok" flat @click.native="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {api ,EventBus } from '@/plugins'

  export default {
    components: {},
    data() {
      return {
        dialogOn: false,
        order: {
          client_id: null,
        },
        validator: {
          client_id: [v => !!v || 'Client is required',],
        },
      }
    },
    computed: {
      clients() {
        return this.$store.getters.clients
      },
    },
    methods: {
      save() {
        if (this.$refs.form.validate()) {
          api.endpoints.order.create(this.order).then(response => {
            EventBus.$emit('order-update');
          }, error => {
            console.log(error.response.data)
          });
          this.dialogOn = false
        }
      },
    }
  }
</script>
