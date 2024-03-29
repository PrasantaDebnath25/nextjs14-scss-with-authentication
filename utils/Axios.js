import axios from 'axios';
import { getCookie } from "cookies-next";

const axiosConfig = {
  baseURL: process.env.REACT_APP_API_URL,
  // timeout: 600000, //10 mnts
  // timeout: 70000,
  headers: {
    'Content-Type': 'application/json',
    'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
  },
};

// axios.defaults.headers.post['X-XSRF-Token'] = Cookie.getCookie('_tokenZealousCsrfToken')
const api = axios.create(axiosConfig);
// api.defaults.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
export default api;
