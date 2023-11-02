<template>
  <BaseSideBar />
  <div class="content-user-layout">
    <BaseHeader :hideSearch="true" />
    <div class="user-layout">
      <div class="user-content-wrap">
        <router-view />
      </div>
    </div>
  </div>
  <BaseFooter />
  <LoadingScreen v-if="isLoading" />
</template>

<script>
import BaseSideBar from '../components/User/BaseSideBar.vue';
import BaseHeader from '../components/admin/BaseHeader';
import BaseFooter from '../components/admin/BaseFooter';
import LoadingScreen from '../components/common/LoadingScreen';
import { LoadingMixins } from '../mixins/Loading';
export default {
  name: 'UserLayout',
  components: { BaseSideBar, BaseHeader, LoadingScreen, BaseFooter },
  mixins: [LoadingMixins],
  data() {
    return {
      isLoading: false,
    };
  },
  watch: {
    $route(to, from) {
      this.emitter.emit('isShowLoading', true);
      setTimeout(() => {
        this.emitter.emit('isShowLoading', false);
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
.user-layout {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: #615a5a;
}
.content-user-layout {
  position: relative;
  width: 100%;
  padding-left: 121px;
}

.user-content-wrap {
  /* margin-top: 15px; */
}

html *::-webkit-scrollbar {
  border-radius: 0;
  height: 12px;
  width: 8px;
}

html *::-webkit-scrollbar {
  border-radius: 0;
  height: 12px;
  width: 8px;
}

html *::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.15);
}

html *::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.15);
}

html *::-webkit-scrollbar-track {
  border-radius: 0;
  background-color: rgba(0, 0, 0, 0);
}

html *::-webkit-scrollbar-track {
  border-radius: 0;
  background-color: rgba(0, 0, 0, 0);
}
</style>
