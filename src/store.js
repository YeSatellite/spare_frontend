import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {api} from '@/plugins'

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: {},
    clients: [],
    places: [],
    productTypes: [],
    products: [],
  },
  getters: {
    user: state => {
      return state.user
    },
    clients: state => {
      return state.clients
    },
    places: state => {
      return state.places
    },
    productTypes: state => {
      return state.productTypes
    },
    products: state => {
      return state.products
    }
  },
  mutations: {
    setUser(state, value) {
      state.user = {
        name: value.first_name + ' ' + value.last_name,
        avatar: value.avatar,
        token: value.token
      };
      api.setJWTToken(value.token)
    },
    logout(state) {
      state.user = {};
      api.setJWTToken(null)
    },
    setClients(state, value) {
      state.clients = value
    },
    setPlaces(state, value) {
      state.places = value
    },
    setProductTypes(state, value) {
      state.productTypes = value
    },
    setProducts(state, value) {
      state.products = value
    }
  },
  actions: {
    updateClients({commit}) {
      api.endpoints.client.getAll().then(response => {
        commit('setClients', response.data);
        console.log(response.data)
      }, response => {
        console.log(response.data)
      });
    },
    updatePlaces({commit}) {
      api.endpoints.place.getAll().then(response => {
        response.data.unshift({
          id:null,
          name:'None'
        });
        commit('setPlaces', response.data);
        console.log(response.data)
      }, response => {
        console.log(response.data)
      });
    },
    updateProductTypes({commit}) {
      api.endpoints.productType.getAll().then(response => {
        commit('setProductTypes', response.data);
        console.log(response.data)
      }, response => {
        console.log(response.data)
      });
    },
    updateProducts({commit}) {
      api.endpoints.product.getAll().then(response => {
        commit('setProducts', response.data);
        console.log(response.data)
      }, response => {
        console.log(response.data)
      });
    },
  }
})
