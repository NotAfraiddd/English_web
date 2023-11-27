import axios from 'axios';

class FileAPI {
  async updateImg(data) {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:9090/',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const res = await axiosInstance.post(`section/uploadFile`, data);
    return res.data;
  }
}

const fileAPI = new FileAPI();
export default fileAPI;
