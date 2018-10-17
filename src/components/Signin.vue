<template>
  <div>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12 mt-5">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Sign In</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                      prepend-icon="person"
                      v-model="login"
                      :rules="login$"
                      label="Login"
                      type="text"
                      required>
                  </v-text-field>
                  <v-text-field
                      prepend-icon="lock"
                      v-model="password"
                      :rules="password$"
                      label="Password"
                      type="password"
                      required>
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    :disabled="!valid"
                    @click="signin">
                  Sign In
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
  import {api} from "../plugins";

  export default {
    name: 'Signin',
    data: () => ({
      valid: true,
      login: '',
      login$: [
        v => !!v || 'Login is required',
      ],
      password: '',
      password$: [
        v => !!v || 'Password is required',
      ],
    }),
    methods: {
      signin() {
        if (this.$refs.form.validate()) {
          api.endpoints.login.create({username: this.login, password: this.password}).then(response => {
            console.log(response);
            this.$store.commit('setUser', response.data);
            this.$router.push('/');
          }, response => {

          });
        }
      },
    }
  }
</script>

<style scoped lang="scss">
</style>
