import { createStore } from 'vuex';
import course from './module/course';
import member from './module/member';

export default createStore({
  modules: {
    course,
    member,
  },
});
