export default [
  {
    path: '',
    name: 'EmptyLayout',
    component: () => import('../layouts/EmptyLayout.vue'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('../pages/login/Login.vue'),
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('../pages/login/Register.vue'),
      },
    ],
  },
  {
    path: '',
    name: 'UserLayout',
    component: () => import('../layouts/UserLayout.vue'),
    children: [
      {
        path: '/user',
        name: 'user',
        component: () => import('../pages/user/index.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'AdminLayout',
    component: () => import('../layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../pages/admin/home/Home.vue'),
      },
      {
        path: 'course',
        name: 'Course',
        component: () => import('../pages/admin/course/Course.vue'),
      },
      {
        path: 'member',
        name: 'Member',
        component: () => import('../pages/admin/member/Member.vue'),
      },
      {
        path: 'member/edit/:id',
        name: 'MemberDetail',
        component: () => import('../pages/admin/member/MemberDetail.vue'),
      },
      {
        path: 'edit/:id',
        name: 'AdminDetail',
        component: () => import('../pages/admin/member/MemberDetail.vue'),
      },
      {
        path: 'course/:course/listening',
        name: 'CourseListening',
        component: () => import('../pages/admin/course/CourseListening.vue'),
      },
      {
        path: 'course/:course/reading',
        name: 'CourseReading',
        component: () => import('../pages/admin/course/CourseReading.vue'),
      },
      {
        path: 'course/:course/listening/detail/:name',
        name: 'DetailCourseListening',
        component: () =>
          import('../pages/admin/course/DetailCourseListening.vue'),
      },
      {
        path: 'course/:course/reading/detail/:name',
        name: 'DetailCourseReading',
        component: () =>
          import('../pages/admin/course/DetailCourseReading.vue'),
      },
      {
        path: 'course/:course/reading/create',
        name: 'CreateCourseReading',
        component: () =>
          import('../pages/admin/course/CreateCourseReading.vue'),
      },
      {
        path: 'course/:course/reading/detail/:name/update',
        name: 'CreateCourseReading',
        component: () =>
          import('../pages/admin/course/CreateCourseReading.vue'),
      },
      {
        path: 'course/:course/listening/create',
        name: 'CreateCourseListening',
        component: () =>
          import('../pages/admin/course/CreateCourseListening.vue'),
      },
      {
        path: 'course/:course/listening/detail/:name/update',
        name: 'CreateCourseListening',
        component: () =>
          import('../pages/admin/course/CreateCourseListening.vue'),
      },
      {
        path: 'blog-pending',
        name: 'BlogPending',
        component: () => import('../pages/admin/blog/BlogPending.vue'),
      },
      {
        path: 'blog-pending/detail/:id',
        name: 'DetailBlogPending',
        component: () => import('../pages/admin/blog/DetailBlogPending.vue'),
      },
      {
        path: 'comment/reported',
        name: 'CommentReported',
        component: () => import('../pages/admin/comment/CommentReported.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/error/index.vue'),
  },
];
