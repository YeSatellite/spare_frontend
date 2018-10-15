import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {ProductTypeResource, PlacesResource} from '@/plugins/http'

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: {},
    productTypes: [],
    places: [],
  },
  getters: {
    user: state => {
      return state.user
    },
    productTypes: state => {
      return state.productTypes
    },
    places: state => {
      return state.places
    }
  },
  mutations: {
    setUser(state, value) {
      state.user = {
        name: value.first_name + ' ' + value.last_name,
        avatar: value.avatar,
        token: value.token
      };
    },
    logout(state, value) {
      state.user = {};
    },
    setProductTypes(state, value) {
      state.productTypes = value
    },
    setPlaces(state, value) {
      state.places = value
    }
  },
  actions: {
    updateProductTypes({commit}) {
      ProductTypeResource.getAll().then(response => {
        commit('setProductTypes', response.body);
        console.log(response.body)
      }, response => {
        console.log(response.body)
      });
    },
    updatePlaces({commit}) {
      PlacesResource.getAll().then(response => {
        response.body.unshift({
          id:null,
          name:'None'
        });
        commit('setPlaces', response.body);
        console.log(response.body)
      }, response => {
        console.log(response.body)
      });
    },
  }
})
