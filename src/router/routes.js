const routes = [
  {
    path: '/auth',
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
      {
        path: '/test-level/listening',
        name: 'ListeningTest',
        component: () => import('../pages/test/Listening.vue'),
      },
      {
        path: '/test-level/reading',
        name: 'ReadingTest',
        component: () => import('../pages/test/Reading.vue'),
      },
    ],
  },
  {
    path: '',
    name: 'UserLayout',
    component: () => import('../layouts/UserLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'HomeUser',
        component: () => import('../pages/user/home/Home.vue'),
      },
      {
        path: '/create-blog',
        name: 'CreateBlog',
        component: () => import('../pages/user/blog/CreateBlog.vue'),
      },
      {
        path: '/list-blog',
        name: 'MemberListBlog',
        component: () => import('../pages/user/blog/MyListBlog.vue'),
      },
      {
        path: '/my-blog',
        name: 'MyBlog',
        component: () => import('../pages/user/blog/MyBlog.vue'),
      },
      {
        path: '/list-course',
        name: 'ListCourse',
        component: () => import('../pages/user/home/ListCourse.vue'),
      },
      {
        path: '/detail/:id',
        name: 'DetailBlog',
        component: () => import('../pages/user/blog/DetailBlog.vue'),
      },
      {
        path: '/create-course/listening',
        name: 'CreateCourseForAdvancedListening',
        component: () =>
          import('../pages/admin/course/CreateCourseListening.vue'),
      },
      {
        path: '/create-course/reading',
        name: 'CreateCourseForAdvancedReading',
        component: () =>
          import('../pages/admin/course/CreateCourseReading.vue'),
      },
      {
        path: 'member/edit/:id',
        name: 'SettingProfile',
        component: () => import('../pages/user/profile/SettingProfile.vue'),
      },
      {
        path: 'member/information',
        name: 'Profile',
        component: () => import('../pages/user/profile/Profile.vue'),
      },
      {
        path: 'course/:name/reading',
        name: 'ListCourseReading',
        component: () => import('../pages/user/course/ListCourseReading.vue'),
      },
      {
        path: 'course/:name/listening',
        name: 'ListCourseListening',
        component: () => import('../pages/user/course/ListCourseListening.vue'),
      },
      {
        path: 'course/:name/grammar',
        name: 'Grammar',
        component: () => import('../pages/user/course/Grammar.vue'),
      },
      {
        path: 'course/:course/reading/detail/:name/:id',
        name: 'MemberDetailCourseReading',
        component: () =>
          import('../pages/admin/course/DetailCourseReading.vue'),
      },
      {
        path: 'course/:course/listening/detail/:name/:id',
        name: 'MemberDetailCourseListening',
        component: () =>
          import('../pages/admin/course/DetailCourseListening.vue'),
      },
      {
        path: 'course/:course/grammar/detail/:name',
        name: 'MemberDetailCourseGrammar',
        component: () =>
          import('../pages/admin/course/DetailCourseGrammar.vue'),
      },
      {
        path: 'course/:course/reading/create',
        name: 'UserCreateCourseReading',
        component: () => import('../pages/user/course/CreateReading.vue'),
      },
      {
        path: 'course/:course/listening/create',
        name: 'UserCreateCourseListening',
        component: () => import('../pages/user/course/CreateListening.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'AdminLayout',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
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
        path: 'course/:course/grammar',
        name: 'CourseGrammar',
        component: () => import('../pages/admin/course/CourseGrammar.vue'),
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
        name: 'UpdateCourseReading',
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
        name: 'UpdateCourseListening',
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
        path: 'comment-reported',
        name: 'CommentReported',
        component: () => import('../pages/admin/comment/CommentReported.vue'),
      },
      {
        path: 'course-pending',
        name: 'CoursePending',
        component: () => import('../pages/admin/course/CoursePending.vue'),
      },
      {
        path: 'course-pending/detail/:name/:type/:id',
        name: 'DetailCourseListeningPending',
        component: () =>
          import('../pages/admin/course/DetailCourseListeningPending.vue'),
      },
      {
        path: 'course-pending/detail/:name/:type/:id',
        name: 'DetailCourseReadingPending',
        component: () =>
          import('../pages/admin/course/DetailCourseReadingPending.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/error/index.vue'),
  },
];
export default routes;
