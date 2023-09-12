export default [
  {
    path: '',
    name: 'EmptyLayout',
    component: () => import('../layouts/EmptyLayout.vue'),
    children: [],
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
        path: 'course/create-course',
        name: 'CreateCourse',
        component: () => import('../pages/admin/course/CreateCourse.vue'),
      },
      {
        path: 'blog/pending',
        name: 'BlogPending',
        component: () => import('../pages/admin/blog/BlogPending.vue'),
      },
      {
        path: 'blog/pending/detail/:id',
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
