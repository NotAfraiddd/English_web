import http from './http';
import axios from 'axios';
class Blog {
  async createBlog(data) {
    const res = await http.post(`post/createPost`, data);
    return res.data;
  }

  async getDetailBlog(data) {
    const res = await http.post(`post/getPost`, data);
    return res.data;
  }
}

const blog = new Blog();
export default blog;
