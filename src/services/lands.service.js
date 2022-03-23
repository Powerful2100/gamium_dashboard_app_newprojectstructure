import http from "../http-common";

class LandDataService {
  getAll() {
    return http.get("/public/lands");
  }

  get(id) {
    return http.get(`/public/lands/${id}/`);
  }

  /*
  create(data) {
    return http.post("/lands", data);
  }

  update(id, data) {
    return http.put(`/lands/${id}`, data);
  }

  delete(id) {
    return http.delete(`/lands/${id}`);
  }

  deleteAll() {
    return http.delete(`/lands`);
  }
  */
 
  checkTransaction(tx_hash) {
    return http.get(`/public/lands/transaction/${tx_hash}/`);
  }

  getByOwnerAddress(owner_address) {
    return http.get(`/public/lands?owner_address=${owner_address}`);
  }

  retrieveStatistics(state = null, island = null, district = null, bid_type = null, owner = null) {
    var params = "";
    params += state !== null ? (params.length ? "&" : "?") + `state=${state}` : ``
    params += island !== null ? (params.length ? "&" : "?") + `island=${island}` : ``
    params += district !== null ? (params.length ? "&" : "?") + `district=${district}` : ``
    params += bid_type !== null ? (params.length ? "&" : "?") + `bid_type=${bid_type}` : ``
    params += owner !== null ? (params.length ? "&" : "?") + `owner=${owner}` : ``
    return http.get(`/public/lands/statistics/`);
  }

}

export default new LandDataService();