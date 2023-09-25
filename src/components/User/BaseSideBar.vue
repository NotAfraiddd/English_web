<template lang="">
  <div class="user-side-bar fixed z-10">
    <div
      class="mt-5 sidebar-title text-2xl font-semibold h-8 flex items-center justify-center"
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
          to: '/blog',
          iconPath: USER_BLOG,
          activeLinks: [],
        },
        {
          message: 'Learn',
          to: '/learn',
          iconPath: USER_LEARN,
          activeLinks: [],
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
@import '../../assets/styles/sidebar.scss';
</style>
