import { createStore } from 'vuex';
import course from './module/course';
import member from './module/member';
import auth from './module/auth';

export default createStore({
  modules: {
    course,
    member,
    auth,
  },
});
