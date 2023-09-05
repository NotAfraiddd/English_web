<template>
  <section
    class="page-404 bg-white min-h-screen flex items-center justify-center"
  >
    <div class="mx-auto text-center">
      <div
        class="four_zero_four_bg"
        :style="{ backgroundImage: `url(${ERROR_GIF})` }"
      >
        <div class="text-center text-6xl font-bold">404</div>
      </div>

      <div class="contant_box_404 mt-8">
        <div class="h2 text-4xl font-semibold">Looks like you're lost</div>
        <div class="text-primary_black_opacity text-base">
          The page you are looking for is not available!
        </div>
        <div
          @click="goToHome"
          class="link_404 cursor-pointer font-semibold text-base inline-block text-white bg-green-500 px-6 py-3 mt-4 rounded-full hover:bg-green-600 transition duration-300"
        >
          Go to Home
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ERROR_GIF } from '../../constants/image';

export default {
  name: 'NotFound',
  data() {
    return {
      ERROR_GIF: ERROR_GIF,
    };
  },
  methods: {
    goToHome() {
      if (
        this.isMatchedRoute('BlogPending') ||
        this.isMatchedRoute('Course') ||
        this.isMatchedRoute('CommentReported')
      ) {
        this.$router.push({ name: 'Dashboard' });
      } else {
        this.$router.push({ name: 'Course' });
      }
    },
    isMatchedRoute(routeName) {
      return this.$route.matched.some(({ name }) => {
        return name == routeName;
      });
    },
  },
};
</script>

<style scoped>
.page-404 {
  padding: 40px 0;
  background: #fff;
}

.four_zero_four_bg {
  height: 400px;
  background-position: center;
  background-size: cover;
}

.link_404 {
  color: #fff !important;
  padding: 10px 20px;
  background: #39ac31;
  margin: 20px 0;
  display: inline-block;
}

.contant_box_404 {
  margin-top: -50px;
}
</style>
