import API from "../utility/API";
import Vuex from "../store";
import Vue from "vue";
import Moment from "moment";

// ========================API===========================


export const api = new API('http://192.168.1.37:8000/');

api.setJWTToken(Vuex.getters.user.token);
api.instance.interceptors.response.use(null, error => {
  if (error.response.status === 401) Vue.Store.commit('logout');
  return Promise.reject(error);
});

api.createEntities({
  login:'auth/login',
  client:'finance/clients',
  place:'depot/places',
  productType:'depot/product-types',
  product:'depot/products',
  order:'store/orders',
  orderItem:'store/order-items',
});


require('moment/locale/kk');




// ======================EVENT BUS=========================
export const EventBus = new Vue();

// ======================FILTERS===========================
Vue.filter("tenge", str => str+' ₸');





