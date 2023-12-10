<template>
  <div class="px-5">
    <BaseHeader v-if="isMatchedRoute('HomeUserNotLogin')" />
    <router-view />
  </div>
  <LoadingScreen v-if="isLoading" />
</template>

<script>
import LoadingScreen from '../components/common/LoadingScreen.vue';
import { LoadingMixins } from '..//mixins/Loading';
import BaseHeader from '../components/admin/BaseHeader.vue';

export default {
  name: 'EmptyLayout',
  components: { LoadingScreen, BaseHeader },
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
  methods: {
    /**
     *  Check if the route name matches the route being displayed.
     *  @returns {boolean} - Returns true if the route name matches the current route, false otherwise.
     */
    isMatchedRoute(routeName) {
      return this.$route.matched.some(({ name }) => {
        return name == routeName;
      });
    },
  },
};
</script>

<style>
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
