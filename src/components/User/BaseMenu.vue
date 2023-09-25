<template>
  <ul class="flex flex-col user-menu mx-auto mt-5 gap-2 mb-0">
    <template v-for="(menu, index) in panel" :key="index">
      <li v-if="menu.children" class="nav-header p-0" :key="menu.message" />
      <li
        v-else
        :class="[
          'nav-item',
          { active: isActiveMenu(menu.to, menu.activeLinks) },
        ]"
      >
        <router-link
          :to="menu.to"
          class="flex items-center flex-col w-full px-3 py-3"
        >
          <img
            v-if="menu.iconPath"
            class="w-10 h-10"
            :src="menu.iconPath"
            alt="navIcon"
          />
          <p class="my-0 text-base font-semibold text-primary_black">
            {{ menu.message }}
          </p>
        </router-link>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  props: {
    panel: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },

  methods: {
    isActiveMenu(checkPath, activeRoute) {
      const currentPath = this.$route.path;
      const currentRouteName = this.$route.name;
      const isActive =
        currentPath === checkPath ||
        (activeRoute &&
          activeRoute.some(
            (route) => route === currentPath || route === currentRouteName,
          ));
      return isActive ? 'active' : '';
    },
  },
};
</script>

<style>
.user-menu {
  width: 100px;
  height: 100%;
}

.nav-item.active,
.nav-item:hover {
  border-radius: 16px;
  background: rgba(227, 226, 226, 0.4);
}
</style>
