/* eslint-disable @typescript-eslint/no-shadow */
import axios from "axios";
import type { AxiosInstance, Axios } from "axios";
import { createHashHistory } from "history";
import { message } from "antd";

const history = createHashHistory();
const config = {
  baseURL: "/api",
  timeout: 50 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};
const _axios = axios.create(config) as AxiosInstance & {
  upload: Axios["post"];
};
// Add a response interceptor
_axios.interceptors.response.use(
  (response) => {
    const { code } = response.data;
    if (code && code !== 1) {
      message.warning(response.data.message || response.data.msg);
    }
    return response.data;
  },
  (error) => {
    console.log(error);
    const { status, config } = error.response;
    if (config.url !== "/cms/system/login") {
      if (status === 401) {
        // goLogin();
        history.push("/login");
      } else {
        message.error(JSON.stringify(error.response.data || error.message));
        // Message.error(error.response.data);
        console.log(error.response.data);
      }
    }
    if (status === 400) {
      message.error(error.response.data);
    }
    return Promise.reject(error);
  }
);
_axios.upload = (url: string, data: any) => {
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
export default _axios;
