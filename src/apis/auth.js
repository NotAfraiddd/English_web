import http from './http';
import axios from 'axios';
class authUser {
  async register(data) {
    const res = await http.post(`account/register`, data);
    return res.data;
  }

  async login(data) {
    const res = await http.post(`account/login`, data);
    return res.data;
  }
  async logout(data) {
    const res = await http.post(`account/logout`, data);
    return res.data;
  }
  async updatePassword(data) {
    const res = await http.post(`account/resetPassword`, data);
    return res.data;
  }
  async sendOTP(data) {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:9090/',
      headers: {
        'Content-type': 'text/plain',
      },
    });
    const res = await axiosInstance.post(`account/SendOTP`, data);
    return res.data;
  }
}

const authUserInstance = new authUser();
export default authUserInstance;
