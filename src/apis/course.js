import http from './http';
import axios from 'axios';

class CourseApi {
  async allCourse() {
    const res = await http.get(`course/getAllCourse`);
    return res.data;
  }
  async allCoursePending() {
    const res = await http.get(`course/getAllPendingCourse`);
    return res.data;
  }
  async getCourseByID(data) {
    const res = await http.get(`course/getCourseViaId`, data);
    return res.data;
  }
  async createCourse(data) {
    const res = await http.post(`course/createCourse`, data);
    return res.data;
  }
  async approvedCourse(data) {
    const res = await http.put(`course/approveCourse`, data);
    return res.data;
  }
  async approvedSession(data) {
    const res = await http.put(`section/approveReadingSection`, data);
    return res.data;
  }
  async rejectedCourse(data) {
    const res = await http.put(`course/rejectCourse`, data);
    return res.data;
  }
  async getAllReadingSession(data) {
    const res = await http.post(`section/getReadingSectionList`, data);
    return res.data;
  }
  async createReadingSession(data) {
    const res = await http.post(`section/createReadingSection`, data);
    return res.data;
  }
  async getReadingSessionByID(data) {
    const res = await http.post(`section/getReadingSectionById`, data);
    return res.data;
  }
}

const courseApi = new CourseApi();
export default courseApi;
