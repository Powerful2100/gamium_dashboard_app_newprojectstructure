import axios from 'axios';
import apiConfig from '../app/config/api';

export default axios.create({
  baseURL:  `${apiConfig.dashboardProfile.baseUrl}:${apiConfig.dashboardProfile.port}`,
  headers: {
    "Content-type": "application/json"
  }
});
