import axios from "axios";
import {isObject} from "vuetify/lib/util/helpers";

class API {
  constructor(url){
    this.instance = axios.create({
      baseURL: url,
      timeout: 1000,
    });
    this.endpoints = {}
  }

  setJWTToken(token){
    if (token) this.instance.defaults.headers['Authorization'] = `JWT ${token}`;
    else delete this.instance.defaults.headers['Authorization'];
  }

  createEntities(entities) {
    for (let entity in entities){
      let e = entities[entity];
      if(isObject(e)){
        this.endpoints[entity] = this.createExtraEndpoint(entities[entity])
      }else {
        this.endpoints[entity] = this.createBasicCRUDEndpoint(entities[entity])
      }
    }
  }

  createBasicCRUDEndpoint(path) {
    const endpoint = {};
    endpoint.getAll = (query) => this.instance.get(`${path}/`, { params: query});
    endpoint.getOne = ({id}) => this.instance.get(`${path}/${id}/`);
    endpoint.create = (body) => this.instance.post(`${path}/`, body);
    endpoint.update = ({id}, body) => this.instance.put  (`${path}/${id}/`, body);
    endpoint.patch  = ({id}, body) => this.instance.patch(`${path}/${id}/`, body);
    endpoint.delete = ({id}) => this.instance.delete(`${path}/${id}/`);

    return endpoint
  }

  createExtraEndpoint(obj) {
    const endpoint = {};
    endpoint.get = ({id}) => this.instance.get(`${obj.path}/${id}/${obj.action}/`);
    endpoint.post = ({id},body) => this.instance.post(`${obj.path}/${id}/${obj.action}/`, body);

    return endpoint
  }
}

export default API
