<template>
  <div class="flex" :class="extendClass">
    <div
      @click="handleClicked"
      class="bg-primary max-w-5xl px-2 py-1 text-white text-lg rounded-xl font-semibold cursor-default"
    >
      {{ title }}
    </div>
    <div
      v-if="hideBack"
      class="flex ml-3 justify-center items-center cursor-pointer"
      @click="changeBack"
      @mouseenter="hoverBack"
      @mouseleave="resetHover"
    >
      <img :src="ARROW_LEFT" alt="" srcset="" class="image-arrow mr-3" />
      <div class="text-xl text-text_back">Back</div>
    </div>
  </div>
</template>

<script>
import { ARROW_LEFT } from '../../constants/image';

export default {
  name: 'ButtonBack',
  emits: ['back', 'clicked'],
  created() {
    this.ARROW_LEFT = ARROW_LEFT;
  },
  props: {
    title: { type: String, default: '' },
    extendClass: { type: String, default: '' },
    hideBack: { type: Boolean, default: false },
  },
  data() {
    return {};
  },
  methods: {
    handleClicked() {
      this.$emit('clicked');
    },
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
