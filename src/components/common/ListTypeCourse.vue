<template>
  <div class="grid grid-cols-3 list-course" :class="extendClass">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="h-auto min-h-max item-course"
      @click="handleClick(item)"
    >
      <div
        class="course flex justify-center border flex-col w-full px-4 gap-1 rounded-2xl h-40 cursor-pointer hover:opacity-80"
        :style="`background-color: ${item.color};`"
      >
        <div
          class="font-semibold text-2xl text-white flex flex-wrap justify-center"
        >
          {{ item.title }}
        </div>
        <div class="text-base text-white flex flex-wrap">
          {{ item.subtitle }}
        </div>
        <Processbar v-if="hideProcessBar" :percentages="item.percentages" />
      </div>
      <div class="w-full mt-3 flex flex-col gap-1 my-4 items-center">
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
    extendClass: { type: String, default: '' },
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
  padding: 0 25px;
  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    column-gap: 8px !important;
  }
  @media screen and (max-width: 750px) {
    padding: 0;
  }
}

.item-course {
  width: 20rem;
  @media screen and (max-width: 725px) {
    width: 98%;
    margin: 0 auto;
  }
}
</style>
