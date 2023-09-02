export default [
  {
    path: "",
    name: "EmptyLayout",
    component: () => import("../layouts/EmptyLayout.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../pages/home/index.vue"),
      },
    ],
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
    path: "",
    name: "AdminLayout",
    component: () => import("../layouts/AdminLayout.vue"),
    children: [],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../pages/error/index.vue"),
  },
];
