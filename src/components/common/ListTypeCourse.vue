<template>
  <div class="grid list-course" :class="extendClass">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="h-auto min-h-max"
      :class="extendItemClass"
    >
      <div class="course relative">
        <div
          class="course-learn__detail flex justify-center border flex-col w-full px-4 gap-1 rounded-2xl h-40"
          :style="`background-color: ${item.color};`"
        >
          <div
            class="font-semibold text-2xl text-white flex flex-wrap justify-center"
          >
            {{ item.title }}
          </div>
          <div class="text-base text-white flex flex-wrap justify-center">
            {{ item.subtitle }}
          </div>
          <Processbar v-if="hideProcessBar" :percentages="item.percentages" />
        </div>
        <button
          class="course-learn__button cursor-pointer"
          @click="handleClick(item)"
        >
          Learn
        </button>
      </div>
      <div class="w-full mt-3 flex flex-col gap-1 my-4 items-center">
        <div class="font-semibold text-xl w-full">{{ item.name }}</div>
        <div v-if="hideCourseFinished" class="text-sm flex gap-3">
          Completed
          <div class="font-semibold">{{ item.courseFinished }}</div>
        </div>
      </div>
    </div>
    <div class="course relative">
      <div
        @click="handleAdd"
        class="flex justify-center cursor-pointer border-dashed border-4 border-primary_black_opacity-600 flex-col w-full px-4 gap-1 rounded-2xl h-40"
      >
        <div
          class="bg-text_back mx-auto w-7 h-7 rounded-full text-xl font-semibold text-gray-400"
        >
          +
        </div>
        <div class="text-primary_black font-semibold">Add new course</div>
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
  emits: ['clicked', 'add'],
  props: {
    data: { type: Array, default: () => [] },
    extendClass: { type: String, default: '' },
    extendItemClass: { type: String, default: '' },
    hideProcessBar: { type: Boolean, default: false },
    hideCourseFinished: { type: Boolean, default: false },
    showAddCourse: { type: Boolean, default: false },
  },
  methods: {
    handleClick(data) {
      this.$emit('clicked', { item: data, status: true });
    },
    handleAdd() {
      this.$emit('add');
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
  &-learn__button {
    background-color: #fff;
    border-color: #fff;
    left: 50%;
    opacity: 0;
    font-weight: 600;
    position: absolute;
    top: 55%;
    border-radius: 12px;
    padding: 9px 16px;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease 0s;
    visibility: hidden;
    z-index: 1;
  }
  &-learn__detail::after {
    border-radius: 16px;
    content: '';
    inset: 0;
    opacity: 0;
    position: absolute;
    transition: all 0.3s ease 0s;
    visibility: hidden;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
.course:hover .course-learn__detail::after,
.course:hover .course-learn__button {
  opacity: 1;
  visibility: visible;
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
</style>
