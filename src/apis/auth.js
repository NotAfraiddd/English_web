import http from './http';
class authUser {
  async register(data) {
    const res = await http.post(`account/register`, data);
    return res.data;
  }

  async login(data) {
    const res = await http.get(`account/login`, data);
    return res.data;
  }
}

const authUserInstance = new authUser();
export default authUserInstance;
