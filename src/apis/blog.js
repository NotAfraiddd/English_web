import http from './http';
import axios from 'axios';
class Blog {
  async createBlog(data) {
    const res = await http.post(`post/createPost`, data);
    return res.data;
  }
  async updateBlog(data) {
    const res = await http.put(`post/modifyPost`, data);
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
  async getAllPostByStatus(data) {
    const res = await http.post(`post/getAllPostsByStatus`, data);
    return res.data;
  }
  async getAllPostByAuthor(data) {
    const res = await http.post(`post/getPostByUserAndStatus`, data);
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

  async reactBlog(data) {
    const res = await http.post(`post/likePost`, data);
    return res.data;
  }
  async unReactBlog(data) {
    const res = await http.post(`post/dislikePost`, data);
    return res.data;
  }
}

const blog = new Blog();
export default blog;
