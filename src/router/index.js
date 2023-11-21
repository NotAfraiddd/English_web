import * as VueRouter from 'vue-router';
import routes from './routes';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, behavior: 'smooth' };
  },
});

router.beforeEach((to, from) => {
  let isLogin = JSON.parse(localStorage.getItem('isLogin'));
  if (to.meta.requiresAuth && !isLogin) {
    return {
      path: '/login',
    };
  }
});
export default router;
