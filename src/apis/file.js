import axios from 'axios';

class FileAPI {
  async updateImg(data) {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:9090/',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const res = await axiosInstance.post(`util/uploadImage`, data);
    return res.data;
  }
  async updateMp3(data) {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:9090/',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const res = await axiosInstance.post(`util/uploadFile`, data);
    return res.data;
  }
}

const fileAPI = new FileAPI();
export default fileAPI;
