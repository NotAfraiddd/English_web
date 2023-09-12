<template>
  <div class="flex mt-7 flex-col gap-10">
    <slot name="content">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="relative w-full hover:opacity-80 cursor-pointer"
        @click="handleClick"
      >
        <img :src="item.image" alt="" srcset="" class="h-44 course-image" />
        <div class="absolute w-1/2 top-12 bg-white h-32 course-infor">
          <div class="flex flex-col items-start ml-10 mt-10">
            <div class="font-semibold text-2xl">{{ item.title }}</div>
            <div class="text-base">
              Read a direct message on social media to practise and improve your
              reading skills.
            </div>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>
<script>
export default {
  name: 'ListCourse',
  created() {},
  emits: ['clicked'],
  props: {
    data: { type: Array, default: () => [] },
  },
  methods: {
    handleClick(data) {
      this.$emit('clicked', { item: data, status: true });
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.course-image {
  width: 20rem;
  border-bottom-left-radius: 40px;
  @media screen and (max-width: 1400px) {
    width: 19rem;
  }
  @media screen and (max-width: 900px) {
    height: 10rem !important;
    width: 18rem;
  }
}
.course-infor {
  left: 220px;
  border-top-left-radius: 40px;
}
</style>
