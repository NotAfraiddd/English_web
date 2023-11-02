<template lang="">
  <div class="user-side-bar fixed z-10">
    <div
      class="mt-6 sidebar-title text-2xl font-semibold h-8 flex items-center justify-center cursor-pointer"
      @click="handleGoToHome"
    >
      CircleZ
    </div>
    <BaseMenu :panel="userPanel" />
  </div>
</template>
<script>
import { USER_BLOG, USER_LEARN, USER_HOME } from '../../constants/image';
import BaseMenu from './BaseMenu.vue';
export default {
  name: 'UserBaseSidebar',
  props: {
    isResize: {
      type: Boolean,
      default: false,
    },
  },
  components: { BaseMenu },
  created() {
    this.USER_BLOG = USER_BLOG;
    this.USER_HOME = USER_HOME;
    this.USER_LEARN = USER_LEARN;
  },
  data() {
    return {
      userPanel: [
        {
          message: 'Home',
          to: '/',
          iconPath: USER_HOME,
          activeLinks: [],
        },
        {
          message: 'Blog',
          to: '/list-blog',
          iconPath: USER_BLOG,
          activeLinks: [],
        },
        {
          message: 'Learn',
          to: '/list-course',
          iconPath: USER_LEARN,
          activeLinks: [],
        },
      ],
    };
  },
  mounted() {},
  methods: {
    handleGoToHome() {
      this.$router.push({ name: 'HomeUser' });
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/styles/sidebar.scss';
</style>
