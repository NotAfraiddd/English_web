<template>
  <div class="flex">
    <div
      class="bg-primary w-max p-2 text-white text-xl rounded-xl font-semibold"
    >
      {{ title }}
    </div>
    <div
      class="flex ml-3 justify-center items-center cursor-pointer"
      @mouseenter="hoverBack"
      @mouseleave="resetHover"
    >
      <img :src="ARROW_LEFT" alt="" srcset="" class="image-arrow mr-3" />
      <div class="text-xl text-text_back" @click="changeBack">Back</div>
    </div>
  </div>
</template>

<script>
import { ARROW_LEFT } from '../../constants/image';

export default {
  name: 'GroupBack',
  emits: ['back'],
  created() {
    this.ARROW_LEFT = ARROW_LEFT;
  },
  props: {
    title: { type: String, default: '' },
  },
  data() {
    return {};
  },
  methods: {
    changeBack() {
      this.$emit('back');
    },
    hoverBack() {
      this.isHover = true;
      const imageArrow = document.querySelector('.image-arrow');
      if (this.isHover) {
        imageArrow.style.transform = 'translateX(-5px) ';
      }
    },
    resetHover() {
      this.isHover = false;
      const imageArrow = document.querySelector('.image-arrow');
      if (!this.isHover) {
        imageArrow.style.transform = 'translateX(0px)';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.image-arrow {
  transition: transform 0.2s;
  transform-origin: center;
}
</style>
