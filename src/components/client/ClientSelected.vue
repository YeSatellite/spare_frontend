<template>
  <div class="px-4" v-if="client">
    <div class="my-3">
      <v-layout row wrap>
        <v-flex xs4>
          <v-avatar size="200">
            <v-img :src="client.avatar"></v-img>
          </v-avatar>
        </v-flex>
        <v-flex xs8 class="pa-2">
          <div class="title">
            <v-icon color="green" size="27">account_box</v-icon>
            {{client.first_name}} {{client.last_name}} ({{client.username}})
          </div>
          <div class="title">
            <v-icon color="green" size="27">home</v-icon>
            {{client.address}}
          </div>
          <div class="title">
            <v-icon color="green" size="27">account_balance_wallet</v-icon>
            {{client.money|tenge}}
          </div>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
  import {api} from "@/plugins";

  export default {
    mounted() {
      api.endpoints.client.getOne({id: this.id}).then(response => {
        this.client = response.data;
      }, error => {
        console.log(error.response.data)
      });
    },
    data() {
      return {
        id: this.$route.params.id,
        client: null,
      }
    },
    methods: {

    }
  }
</script>
