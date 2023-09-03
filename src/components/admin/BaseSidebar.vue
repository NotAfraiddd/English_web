<template lang="">
  <!-- Main Sidebar Container -->
  <aside
    :class="isResize ? 'sidebar-wrapper-resize ' : 'sidebar-wrapper '"
    class="main sidebar-collapse fixed overflow-x-hidden sidebar-no-expand"
  >
    <div
      :class="isResize ? 'logo rounded-full' : 'sidebar-logo rounded-full'"
      class="mt-5 mx-auto"
    >
      <div
        :class="
          isResize ? 'sidebar-title-resize rounded-full' : 'sidebar-title'
        "
        class="text-2xl font-semibold h-full w-full"
      >
        CircleZ
      </div>
    </div>
    <!-- Sidebar -->
    <div ref="sidebar" class="sidebar p-0" id="js-sidebar">
      <!-- Sidebar Menu -->
      <nav class="mb-5 mt-5">
        <BaseMenu :panel="userPanel" :isResize="isResize" />
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
  <div
    :class="isResize && 'btn-sidebar-collapse-resize'"
    class="nav-item btn-sidebar-collapse fixed mb-0 cursor-pointer overflow-hidden hide-on-sp"
    data-widget="pushmenu"
    @click="onResizeSidebar"
  >
    <span class="nav-link h-10 flex items-center mb-0 ml-3">
      <img
        :class="[
          'toggle-sidebar-icon',
          isResize && 'logo-xl-btn-collapse mx-auto',
        ]"
        :src="ADMIN_BUTTON_BACK"
      />
      <span
        v-bind:class="isResize && 'hidden'"
        class="text-primary text-btn-collapse leading-10"
      >
        Put away the menu
      </span>
    </span>
  </div>
  <a
    class="nav-link top-5 flex absolute justify-center items-center text-2xl extend-icon"
    data-widget="pushmenu"
    href="#"
    role="button"
  >
    <i class="fas fa-bars text-red-300" />
  </a>
</template>
<script>
import BaseMenu from "./BaseMenu.vue";
// import { LOGO_V } from "../../../js/constants/imageConst";
// import { HOME_ROUTE, ADMIN_DASHBOARD_ROUTE } from "../constants";
import {
  ADMIN_BUTTON_BACK,
  ADMIN_COURSE,
  ADMIN_HOME,
  ADMIN_MEMBER,
} from "../../constants/image";
export default {
  name: "BaseSidebar",
  props: {
    isResize: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BaseMenu,
  },
  // emits: ["resize"],
  created() {
    // const indexOfHeadquaterInAdminPanel = 6;
    // const indexOfHeadquaterInSubAdminPanel = 1;
    // this.adminPanel[indexOfHeadquaterInAdminPanel].children[
    //   indexOfHeadquaterInSubAdminPanel
    // ].to = "/shop/" + this.$store.state?.auth.staff.shop_id;
    // this.LOGO_V = LOGO_V;
    this.ADMIN_BUTTON_BACK = ADMIN_BUTTON_BACK;
    this.ADMIN_COURSE = ADMIN_COURSE;
    this.ADMIN_HOME = ADMIN_HOME;
    this.ADMIN_MEMBER = ADMIN_MEMBER;
    // this.logoRoute = this.isRoleAdmin ? ADMIN_DASHBOARD_ROUTE : HOME_ROUTE;
  },
  data() {
    return {
      //   isRoleAdmin: JSON.parse(localStorage.getItem("isRoleAdmin")),
      //   logoRoute: HOME_ROUTE,
      adminPanel: [],
      userPanel: [
        {
          message: "Dashboard",
          to: "/admin",
          iconPath: ADMIN_HOME,
          activeLinks: [],
        },
        {
          message: "Course",
          to: "/admin/course",
          iconPath: ADMIN_COURSE,
          activeLinks: [],
        },
        {
          message: "Member",
          to: "/admin/member",
          iconPath: ADMIN_MEMBER,
          activeLinks: [],
        },
      ],
    };
  },
  mounted() {
    const scrollTop = sessionStorage.getItem("scrollTop");
    if (this.$refs.sidebar) {
      this.$refs.sidebar.scrollTop = scrollTop;
    }
  },
  methods: {
    onResizeSidebar() {
      this.$emit("resize");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/styles/sidebar.scss";
</style>
