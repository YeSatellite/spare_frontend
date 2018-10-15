import API from '@/utility/API'
import Vuex from '@/store';

const api = new API('http://192.168.1.108:8000/');

api.tokenUpdate = () => {
  api.setJWTToken(Vuex.getters.user.token);
};

api.createEntities({
  login:'auth/login',
  place:'depot/places',
  productType:'depot/product-type',
  product:'depot/product,'
});

export default api
