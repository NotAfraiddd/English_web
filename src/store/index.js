import { createStore } from 'vuex';
import course from './module/course';
import member from './module/member';
import auth from './module/auth';
import notify from './module/notify';
import blog from './module/blog';
export default createStore({
  modules: {
    course,
    member,
    auth,
    notify,
    blog,
  },
});
