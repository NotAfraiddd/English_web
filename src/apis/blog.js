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
  async getAllPost(data) {
    const res = await http.post(`post/getAllPost`, data);
    return res.data;
  }
  async getAllPostPending(data) {
    const res = await http.post(`post/getAllPendingPosts`, data);
    return res.data;
  }
  async approvePost(data) {
    const res = await http.put(`post/approvePost`, data);
    return res.data;
  }
  async rejectPost(data) {
    const res = await http.put(`post/deletePost`, data);
    return res.data;
  }
}

const blog = new Blog();
export default blog;
