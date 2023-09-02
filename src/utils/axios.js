import axios from "axios";

const baseURL = "/api/v1";

const instance = axios.create({
  baseURL,
});

/**
 * Custom response.
 */
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
