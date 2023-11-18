<template>
  <div class="flex mt-7 flex-col gap-10">
    <slot name="content">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="relative w-full hover:opacity-80 cursor-pointer"
        @click="handleClick(item)"
      >
        <img :src="item.image" alt="" srcset="" class="h-44 course-image" />
        <div class="absolute w-7/12 top-12 bg-white h-32 course-infor">
          <div class="flex flex-col items-start ml-8 mt-8">
            <div class="font-semibold text-2xl text-left text-overflow">
              {{ item.title }}
            </div>
            <div class="text-base text-left subtext-overflow">
              {{ item.subTitle }}
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
    return {
      transcript: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.text-overflow {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.subtext-overflow {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
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
