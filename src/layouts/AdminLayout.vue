<template>
  <BaseSidebar @resize="onResizeSidebar" :isResize="isResize" />
  <div :class="!isResize ? 'content' : 'content-resize'">
    <BaseHeader />
    <div class="layout">
      <div class="layout-content">
        <router-view />
      </div>
    </div>
  </div>
  <div id="sidebar-overlay" @click="onCollapse" />
  <LoadingScreen v-if="isLoading" />
</template>

<script>
import LoadingScreen from "../components/common/LoadingScreen";
import BaseSidebar from "../components/admin/BaseSidebar.vue";
import BaseHeader from "../components/admin/BaseHeader.vue";
import $ from "jquery";
export default {
  name: "AdminLayout",
  components: {
    LoadingScreen,
    BaseSidebar,
    BaseHeader,
  },
  data() {
    return {
      isResize: false,
      windowWidth: window.innerWidth,
      isLoading: false,
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
  watch: {
    windowWidth(newWidth) {
      if (newWidth <= 990 && this.isResize === true) {
        this.isResize = false;
      }
    },
    $route(to, from) {
      this.emitter.emit("isShowLoading", true);
      setTimeout(() => {
        this.emitter.emit("isShowLoading", false);
      }, 1000);
    },
  },
  methods: {
    onResizeSidebar() {
      this.isResize = !this.isResize;
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth;
    },

    onCollapse() {
      if (this.windowWidth < 996) {
        $('[data-widget="pushmenu"]').PushMenu("collapse");
      }
    },
  },
};
</script>

<style lang="scss">
.content {
  padding-left: 250px;
  transition: all 0.3s ease-in-out;
}

.content-resize {
  width: 100%;
  padding-left: 80px;
  transition: all 0.3s ease-in-out;
}

.layout {
  // box-shadow: inset 11px 0 9px -7px rgb(0 0 0 / 10%),
  //   inset 0px 11px 9px -7px rgb(0 0 0 / 10%);
  min-height: 100vh;
  padding-left: 2rem;
  padding-right: 2rem;
  border-left: 1px solid #eee;
  border-top: 1px solid #eee;
  background-color: #fff;

  .layout-content {
    border-radius: 15px;
    width: 100%;
    min-height: 100%;
    margin-top: 30px;
  }
}
</style>
