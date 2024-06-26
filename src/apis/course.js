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
  async updateCourse(data) {
    const res = await http.put(`course/modifyCourse`, data);
    return res.data;
  }
  async approvedCourse(data) {
    const res = await http.put(`course/approveCourse`, data);
    return res.data;
  }
  async approvedListeningSession(data) {
    const res = await http.put(`section/approveListeningSection`, data);
    return res.data;
  }
  async approvedReadingSession(data) {
    const res = await http.put(`section/approveReadingSection`, data);
    return res.data;
  }
  async rejectedListeningSession(data) {
    const res = await http.put(`section/rejectListeningSection`, data);
    return res.data;
  }
  async rejectedReadingSession(data) {
    const res = await http.put(`section/rejectReadingSection`, data);
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
  async getAllListeningSession(data) {
    const res = await http.post(`section/getListeningSectionList`, data);
    return res.data;
  }
  async createReadingSession(data) {
    const res = await http.post(`section/createReadingSection`, data);
    return res.data;
  }
  async updateReadingSession(data) {
    const res = await http.put(`section/updateReadingSection`, data);
    return res.data;
  }
  async updateListeningSession(data) {
    const res = await http.put(`section/updateListeningSection`, data);
    return res.data;
  }
  async createListeningSession(data) {
    const res = await http.post(`section/createListeningSection`, data);
    return res.data;
  }
  async getReadingSessionByID(data) {
    const res = await http.post(`section/getReadingSectionById`, data);
    return res.data;
  }

  async getCourseListAtempByIdCourse(data) {
    const res = await http.post(`courseAttemp/getCourseAttempViaId`, data);
    return res.data;
  }

  async getListeningSessionByID(data) {
    const res = await http.post(`section/getListeningSectionById`, data);
    return res.data;
  }
  async getRandomQuestionListening(data) {
    const res = await http.post(`section/mixupAnswer`, data);
    return res.data;
  }

  async createCourseAttemp(data) {
    const res = await http.post(`courseAttemp/createCourseAttempt`, data);
    return res.data;
  }

  async updateCourseAttemp(data) {
    const res = await http.put(`courseAttemp/updateCourseAttempt`, data);
    return res.data;
  }

  async submitListeningSecionAttemp(data) {
    const res = await http.put(
      `sectionAttempt/updateListeningSectionAttempt`,
      data,
    );
    return res.data;
  }
  async submitReadingSecionAttemp(data) {
    const res = await http.put(
      `sectionAttempt/updateReadingSectionAttempt`,
      data,
    );
    return res.data;
  }
}

const courseApi = new CourseApi();
export default courseApi;
