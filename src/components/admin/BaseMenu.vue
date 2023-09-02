<template>
  <ul
    class="nav nav-pills nav-sidebar nav-child-indent flex-col"
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

      <li v-else class="nav-item" :key="menu.message">
        <router-link
          :to="menu.to"
          @click="onCollapse"
          :class="[
            'nav-link h-10 flex items-center gap-10 mb-2 ml-2',
            isActiveMenu(menu.to, menu.activeLinks),
          ]"
        >
          <img
            v-if="menu.iconPath"
            class="h-8 w-8"
            :src="menu.iconPath"
            alt="navIcon"
          />
          <p class="mb-0" v-bind:class="{ hidden: isResize }">
            {{ menu.message }}
          </p>
        </router-link>
      </li>

      <li v-if="menu.children" :key="`children_${menu.message}`">
        <ul class="nav">
          <li
            class="nav-item"
            v-for="subMenu in menu.children"
            :key="`submenu_${subMenu.message}`"
            @click="onCollapse"
          >
            <router-link
              :to="subMenu.to"
              :class="[
                'nav-link h-10 flex items-center gap-10 mb-1 w-full ml-2',
                !subMenu.children &&
                  isActiveMenu(subMenu.to, subMenu.activeLinks),
              ]"
            >
              <img
                v-if="subMenu.iconPath"
                class="w-8 h-8"
                :src="subMenu.iconPath"
                alt="navIcon"
              />
              <div v-else class="h-8 w-8" />
              <p class="mb-0" v-bind:class="{ hidden: isResize }">
                {{ subMenu.message }}
              </p>
            </router-link>
            <ul
              v-if="subMenu.children"
              :class="{ hidden: isResize, 'nav-menu-3': true }"
            >
              <li
                class="w-full"
                v-for="subMenu3 in subMenu.children"
                :key="`submenu_${subMenu3.message}`"
              >
                <router-link
                  :to="subMenu3.to"
                  :class="[
                    'nav-link h-10 flex items-center gap-10 mb-1 w-full ml-2',
                    isActiveMenu(subMenu3.to, subMenu3.activeLinks),
                  ]"
                >
                  <img
                    v-if="subMenu3.iconPath"
                    class="h-8 w-8"
                    :src="subMenu3.iconPath"
                    alt="navIcon"
                  />
                  <div v-else class="h-8 w-8" />
                  <p class="mb-0" v-bind:class="{ hidden: isResize }">
                    {{ subMenu3.message }}
                  </p>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </template>
  </ul>
</template>

<script>
import $ from "jquery";
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
      isFirstItemActive: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.updateWindowWidth);
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateWindowWidth);
  },
  methods: {
    isActiveMenu(checkPath, activeRoute) {
      const currentPath = this.$route.path;
      const currentRouteName = this.$route.name;
      const isActive =
        currentPath === checkPath ||
        (activeRoute &&
          activeRoute.some(
            (route) => route === currentPath || route === currentRouteName
          ));
      if (!this.isFirstItemActive && isActive) {
        this.isFirstItemActive = true;
        return "active";
      }
      return isActive ? "active" : "";
    },
    /**
     * hide sidebar when click change screen and screen less 996
     */
    onCollapse() {
      if (this.windowWidth < 996) {
        $('[data-widget="pushmenu"]').PushMenu("collapse");
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
  margin-bottom: 0.5rem !important;
}

.nav-item {
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  &:hover {
    border-radius: 8px;
    background: rgba(227, 226, 226, 0.4);
  }

  &:active {
    background: rgba(227, 226, 226, 0.4);
  }
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
