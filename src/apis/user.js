import http from './http';
import axios from 'axios';

class UserApi {
  async getUser(data) {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:9090/',
      headers: {
        'Content-type': 'text/plain',
      },
    });
    const res = await axiosInstance.post(`user/getUser`, data);
    return res.data;
  }
}

const userApi = new UserApi();
export default userApi;
