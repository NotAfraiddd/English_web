<template>
  <div>
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

<style scoped></style>
