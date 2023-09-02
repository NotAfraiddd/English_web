export default [
  {
    path: "",
    name: "EmptyLayout",
    component: () => import("../layouts/EmptyLayout.vue"),
    children: [],
  },
  {
    path: "",
    name: "UserLayout",
    component: () => import("../layouts/UserLayout.vue"),
    children: [
      {
        path: "/user",
        name: "user",
        component: () => import("../pages/user/index.vue"),
      },
    ],
  },
  {
    path: "/admin",
    name: "AdminLayout",
    component: () => import("../layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("../pages/admin/home/Home.vue"),
      },
      {
        path: "/course",
        name: "Course",
        component: () => import("../pages/admin/course/Course.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../pages/error/index.vue"),
  },
];
