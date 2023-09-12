<template>
  <div class="grid grid-cols-3 list-course px-5">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="h-auto min-h-max w-80 item-course"
      @click="handleClick(item)"
    >
      <div
        class="course flex justify-center border flex-col w-full px-4 gap-1 rounded-2xl h-40 cursor-pointer hover:opacity-80"
        :style="`background-color: ${item.color};`"
      >
        <div class="font-semibold text-2xl text-white break-all">
          {{ item.title }}
        </div>
        <div class="text-base text-white break-all">
          {{ item.subtitle }}
        </div>
        <Processbar v-if="hideProcessBar" :percentages="item.percentages" />
      </div>
      <div class="w-full mt-3 flex flex-col gap-1 items-start my-4">
        <div class="font-semibold text-xl w-full">{{ item.name }}</div>
        <div v-if="hideCourseFinished" class="text-sm flex gap-3">
          Completed
          <div class="font-semibold">{{ item.courseFinished }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Processbar from './Processbar.vue';
export default {
  name: 'ListTypeCourse',
  components: { Processbar },
  created() {},
  emits: ['clicked'],
  props: {
    data: { type: Array, default: () => [] },
    hideProcessBar: { type: Boolean, default: false },
    hideCourseFinished: { type: Boolean, default: false },
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
.course {
  &:hover {
    transform: translateY(-2px);
  }
}

.list-course {
  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    column-gap: 8px !important;
  }
  @media screen and (max-width: 725px) {
    grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
  }
}

.item-course {
  @media screen and (max-width: 725px) {
    width: 26rem !important;
    margin: 0 auto;
  }
}
</style>
