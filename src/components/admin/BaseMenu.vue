<template>
  <ul
    class="nav nav-pills nav-sidebar nav-child-indent flex-col gap-2"
    data-widget="treeview"
    role="menu"
  >
    <template v-for="(menu, index) in panel" :key="index">
      <li
        v-bind:class="{ hidden: isResize }"
        v-if="menu.children"
        class="nav-header p-0"
        :key="menu.message"
        @click="onCollapse"
      />

      <li
        v-else
        :class="[
          'nav-item',
          { active: isActiveMenu(menu.to, menu.activeLinks) },
        ]"
      >
        <router-link
          :to="menu.to"
          @click="onCollapse"
          class="nav-link h-10 flex items-center gap-10"
        >
          <img
            v-if="menu.iconPath"
            class="h-7 w-7"
            :src="menu.iconPath"
            alt="navIcon"
          />
          <p
            class="mb-0 h-10 leading-10 text-base"
            v-bind:class="{ hidden: isResize }"
          >
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
    isResize: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.updateWindowWidth);
    });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth);
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
    /**
     * hide sidebar when click change screen and screen less 996
     */
    onCollapse() {
      if (this.windowWidth < 1000) {
        $('[data-widget="pushmenu"]').PushMenu('collapse');
      }
    },

    /**
     * update window-width when resize window
     */
    updateWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
  },
};
</script>

<style>
.separator {
  display: list-item;
  background-color: gray;
  opacity: 0.2;
}

.nav-header {
  font-size: 12px !important;
}

.nav-link {
  margin-bottom: 0px !important;
}

.nav-item {
  margin-right: 0.5rem;
  margin-left: 0.5rem;

  &:hover {
    border-radius: 8px;
    background: rgba(227, 226, 226, 0.4);
  }
}

.nav-item.active {
  border-radius: 8px;
  background: rgba(227, 226, 226, 0.4);
}

.nav-item p,
.nav-header p {
  color: #615a5a;
}

.nav-menu-3 {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}
</style>
