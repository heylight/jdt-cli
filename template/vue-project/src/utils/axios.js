import Vue from "vue";
import axios from "axios";
import { Message } from "element-ui";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  baseURL: "/api",
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Add a response interceptor
_axios.interceptors.response.use(
  (response) => {
    let { code } = response.data;
    if (code && code !== 1) {
      Message.warning(response.data.message || response.data.msg);
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
_axios.upload = (url, data) => {
  const form = new FormData();
  Object.keys(data).forEach((val) => {
    form.append(val, data[val]);
  });
  return _axios.post(url, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
// eslint-disable-next-line no-unused-vars
Plugin.install = function PL(Vue, option) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
