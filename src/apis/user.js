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
  async updateUser(data) {
    const res = await http.post(`user/updateInfo`, data);
    return res.data;
  }
  async getTotalUser() {
    const res = await http.get(`user/totalMember`);
    return res.data;
  }
  async getTotalUserOnline() {
    const res = await http.get(`user/getTotalOnlineMember`);
    return res.data;
  }
}

const userApi = new UserApi();
export default userApi;
