<template>
  <div class="px-10">
    <router-view />
  </div>
  <LoadingScreen v-if="isLoading" />
</template>

<script>
import LoadingScreen from '../components/common/LoadingScreen.vue';
import { LoadingMixins } from '..//mixins/Loading';

export default {
  name: 'EmptyLayout',
  components: { LoadingScreen },
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

<style scoped>
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
