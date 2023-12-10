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
    ],
  },
  {
    path: '',
    name: 'UserLayout',
    component: () => import('../layouts/UserLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'test-level/listening/intermediate/:id',
        name: 'TestLevelListeningIntermediate',
        component: () => import('../pages/user/home/ListeningIntermediate.vue'),
      },
      {
        path: 'test-level/reading/intermediate/:id',
        name: 'TestLevelReadingIntermediate',
        component: () => import('../pages/user/home/ReadingIntermediate.vue'),
      },
      {
        path: 'test-level/listening/advanced/:id',
        name: 'TestLevelListeningCreateCourse',
        component: () => import('../pages/user/home/ListeningAdvanced.vue'),
      },
      {
        path: 'test-level/reading/advanced/:id',
        name: 'TestLevelReadingCreateCourse',
        component: () => import('../pages/user/home/ReadingAdvanced.vue'),
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
      {
        path: '/test-level/listening',
        name: 'ListeningBlogTest',
        component: () => import('../pages/test/ListeningBlog.vue'),
      },
      {
        path: '/test-level/reading',
        name: 'ReadingBlogTest',
        component: () => import('../pages/test/ReadingBlog.vue'),
      },
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
        path: '/update-blog/:username/:id',
        name: 'UpdateBlog',
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
        path: '/test-level-user',
        name: 'ListCourse',
        component: () => import('../pages/user/home/ListCourse.vue'),
      },
      {
        path: '/detail/:username/:id',
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
        path: 'test-level',
        name: 'Test',
        component: () => import('../pages/admin/test/Test.vue'),
      },
      {
        path: 'test-level/reading',
        name: 'TestLevelReading',
        component: () => import('../pages/test/Reading.vue'),
      },
      {
        path: 'test-level/reading/blog',
        name: 'TestLevelReadingBlog',
        component: () => import('../pages/test/ReadingBlog.vue'),
      },
      {
        path: 'test-level/reading/blog/update/:id',
        name: 'TestLevelReadingBlogUpdate',
        component: () =>
          import('../pages/admin/test/TestReadingUpdateBlog.vue'),
      },
      {
        path: 'test-level/reading/blog/create',
        name: 'TestLevelReadingBlogCreate',
        component: () =>
          import('../pages/admin/test/TestReadingUpdateBlog.vue'),
      },
      {
        path: 'test-level/reading/create-course',
        name: 'TestLevelReadingAdvanced',
        component: () => import('../pages/test/ReadingAdvanced.vue'),
      },
      {
        path: 'test-level/reading/create-course/update/:id',
        name: 'TestLevelReadingAdvancedUpdate',
        component: () =>
          import('../pages/admin/test/TestReadingUpdateAdvanced.vue'),
      },
      {
        path: 'test-level/reading/create-course/create',
        name: 'TestLevelReadingAdvancedCreate',
        component: () =>
          import('../pages/admin/test/TestReadingUpdateAdvanced.vue'),
      },
      {
        path: 'test-level/reading/update/:id',
        name: 'TestLevelReadingUpdate',
        component: () => import('../pages/admin/test/TestReadingUpdate.vue'),
      },
      {
        path: 'test-level/reading/create',
        name: 'TestLevelReadingCreate',
        component: () => import('../pages/admin/test/TestReadingUpdate.vue'),
      },
      {
        path: 'test-level/listening',
        name: 'TestLevelListening',
        component: () => import('../pages/test/Listening.vue'),
      },
      {
        path: 'test-level/listening/blog',
        name: 'TestLevelListeningBlog',
        component: () => import('../pages/test/ListeningBlog.vue'),
      },
      {
        path: 'test-level/listening/blog/update/:id',
        name: 'TestLevelListeningBlogUpdate',
        component: () =>
          import('../pages/admin/test/TestListeningUpdateBlog.vue'),
      },
      {
        path: 'test-level/listening/blog/create',
        name: 'TestLevelListeningBlogCreate',
        component: () =>
          import('../pages/admin/test/TestListeningUpdateBlog.vue'),
      },
      {
        path: 'test-level/listening/create-course',
        name: 'TestLevelListeningAdvanced',
        component: () => import('../pages/test/ListeningAdvanced.vue'),
      },
      {
        path: 'test-level/listening/create-course/update/:id',
        name: 'TestLevelListeningAdvancedUpdate',
        component: () =>
          import('../pages/admin/test/TestListeningUpdateAdvanced.vue'),
      },
      {
        path: 'test-level/listening/create-course/create',
        name: 'TestLevelListeningAdvancedCreate',
        component: () =>
          import('../pages/admin/test/TestListeningUpdateAdvanced.vue'),
      },
      {
        path: 'test-level/listening/update/:id',
        name: 'TestLevelListeningUpdate',
        component: () => import('../pages/admin/test/TestListeningUpdate.vue'),
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
        path: 'course/:course/listening/detail/:id',
        name: 'DetailCourseListening',
        component: () =>
          import('../pages/admin/course/DetailCourseListening.vue'),
      },
      {
        path: 'course/:course/reading/detail/:id',
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
        path: 'course/:course/reading/detail/:id/update',
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
        path: 'blog-pending/detail/:username/:id',
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
        path: 'course-pending/detail/listening/:id',
        name: 'DetailCourseListeningPending',
        component: () =>
          import('../pages/admin/course/DetailCourseListeningPending.vue'),
      },
      {
        path: 'course-pending/detail/reading/:id',
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
