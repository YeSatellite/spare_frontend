import API from "../utility/API";
import Vuex from "../store";
import Vue from "vue";

// ========================API===========================
export const api = new API('http://192.168.1.110:8000/');

api.tokenUpdate = () => {
  api.setJWTToken(Vuex.getters.user.token);
};

api.createEntities({
  login:'auth/login',
  places:'depot/places',
  productTypes:'depot/product-types',
  products:'depot/products'
});

api.setJWTToken(Vuex.state.user.token);


// ======================EVENT BUS=========================
export const EventBus = new Vue();





