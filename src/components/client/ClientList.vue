<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm4 md3 v-for="client in clientsFiltered" :key="client.id">
          <v-card>
            <v-img
                :src="client.avatar" alt="avatar"
                aspect-ratio="0.85">
            </v-img>
            <v-card-title>
              <span class="title">
                {{client.first_name}} {{client.last_name}} ({{client.username}})
              </span>
            </v-card-title>
            <v-card-text class="text-sm-left">
              <div>
                <div class="grey--text">
                  TODO
                </div>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="orange" @click="detail(client.id)">Detail</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import {api, EventBus} from "@/plugins";

  export default {
    props: {
      filter: {
        required: true
      },
    },
    mounted() {
      this.getClients();
      EventBus.$on('client-update', () => {
        this.getClients();
      });
    },
    data() {
      return {
        clients: [],
      }
    },
    computed: {
      clientsFiltered() {
        return this.clients.filter(client =>
            client.username.includes(this.filter.search) ||
            client.first_name.includes(this.filter.search) ||
            client.last_name.includes(this.filter.search)
        );
      }
    },
    methods: {
      getClients(){
        api.endpoints.client.getAll().then(response => {
          this.clients = response.data
        }, error => {
          console.log(error.response.data)
        });
      },
      detail(id) {
        this.$router.push({name: 'client-selected', params: {id}})
      },
    }
  }
</script>
