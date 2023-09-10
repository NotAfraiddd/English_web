import { createStore } from 'vuex';
import course from './module/course';

export default createStore({
  modules: {
    course,
  },
});
