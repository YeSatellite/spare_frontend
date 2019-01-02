import API from "../utility/API";
import Vuex from "../store";
import Vue from "vue";
import Moment from "moment";

// ========================API===========================

const host = 'http://192.168.1.37:8000/';
export const api = new API(host);

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
  trade:'finance/trades',
  finishTrade: {path:'finance/trades',action:'archive'},
});
api.orderExcel = (id)=>`${host}store/orders/${id}/items`;

require('moment/locale/kk');




// ======================EVENT BUS=========================
export const EventBus = new Vue();

// ======================FILTERS===========================
Vue.filter("tenge", str => str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+' ₸');
Vue.filter("dateFormatShort", str => Moment(String(str)).format('ll'));





