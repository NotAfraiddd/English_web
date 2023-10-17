<template>
  <div class="slideshowContainer">
    <div
      v-for="(image, index) in images"
      :key="index"
      :class="['imageSlides', { visible: index === currentIndex }]"
    >
      <img :src="image.src" :alt="image.alt" />
    </div>

    <span id="leftArrow" class="slideshowArrow" @click="prevSlide">
      &#8249;
    </span>
    <span id="rightArrow" class="slideshowArrow" @click="nextSlide">
      &#8250;
    </span>

    <div class="slideshowCircles">
      <span
        v-for="(circle, index) in circles"
        :key="index"
        :class="['circle', { dot: index === currentIndex }]"
        @click="jumpToSlide(index)"
      />
    </div>
  </div>
</template>

<script>
import {
  GROUP_STUDENT_1,
  GROUP_STUDENT_2,
  GROUP_STUDENT_3,
} from '../../constants/image';

export default {
  data() {
    return {
      images: [
        {
          src: GROUP_STUDENT_1,
          alt: 'beach side city view',
        },
        {
          src: GROUP_STUDENT_2,
          alt: 'leaf on the ground',
        },
        {
          src: GROUP_STUDENT_3,
          alt: 'lake surrounded by mountains',
        },
      ],
      currentIndex: 0,
    };
  },
  computed: {
    circles() {
      return Array(this.images.length).fill('');
    },
  },
  methods: {
    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    jumpToSlide(index) {
      this.currentIndex = index;
    },
    startSlideshow() {
      setInterval(() => {
        this.nextSlide();
      }, 7500);
    },
  },
  created() {
    this.startSlideshow();
    this.GROUP_STUDENT_1 = GROUP_STUDENT_1;
    this.GROUP_STUDENT_2 = GROUP_STUDENT_2;
    this.GROUP_STUDENT_3 = GROUP_STUDENT_3;
  },
};
</script>

<style scoped>
@import '../../assets/styles/_silder.scss';
</style>
