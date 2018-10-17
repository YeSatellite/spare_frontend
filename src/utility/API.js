import axios from "axios";

class API {
  constructor(url){
    this.instance = axios.create({
      baseURL: url,
      timeout: 1000,
    });
    this.endpoints = {}
  }

  setJWTToken(token){
    if (!!token) delete this.instance.defaults.headers['Authorization'];
    this.instance.defaults.headers['Authorization'] = `JWT ${token}`
  }

  createEntities(entities) {
    for (let entity in entities){
      this.endpoints[entity] = this.createBasicCRUDEndpoint(entities[entity])
    }
  }

  createBasicCRUDEndpoint(name) {
    const endpoint = {};
    endpoint.getAll = (query) => this.instance.get(`${name}/`, { params: query});
    endpoint.getOne = ({id}) => this.instance.get(`${name}/${id}/`);
    endpoint.create = (body) => this.instance.post(`${name}/`, body);
    endpoint.update = ({id}, body) => this.instance.put  (`${name}/${id}/`, body);
    endpoint.patch  = ({id}, body) => this.instance.patch(`${name}/${id}/`, body);
    endpoint.delete = ({id}) => this.instance.delete(`${name}/${id}/`);

    return endpoint
  }

}

export default API
