<template>
  <div class="grid list-course" :class="extendClass">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="h-auto min-h-max"
      :class="extendItemClass"
    >
      <div class="course relative ml-5">
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
        <div class="flex">
          <button
            v-if="item.status"
            class="course-learn__button cursor-pointer"
            :style="{ left: showDelete ? '35%' : '50%' }"
            @click="handleClickPending(item.status)"
          >
            Pending
          </button>
          <button
            v-else
            class="course-learn__button cursor-pointer"
            :style="{ left: showDelete ? '35%' : '50%' }"
            @click="handleClick(item)"
          >
            Learn
          </button>
          <button
            v-if="showDelete"
            @click="handleDeleteCourse(item)"
            class="course-learn__button-2"
          >
            <img :src="DELETE_GRAY_ICON" alt="" class="h-5 w-5" />
          </button>
        </div>
      </div>
      <div class="w-full mt-3 flex flex-col gap-1 my-4 items-center">
        <div class="font-semibold text-xl w-full">{{ item.name }}</div>
        <div v-if="hideCourseFinished" class="text-sm flex gap-3">
          Completed
          <div class="font-semibold">{{ item.courseFinished }}</div>
          <div v-if="item.status" class="text-right text-yellow-400">
            ( Pending )
          </div>
        </div>
      </div>
    </div>
    <div v-if="showAddCourse" class="course relative">
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
import { notification } from 'ant-design-vue';
import Processbar from './Processbar.vue';
import { DELETE_GRAY_ICON } from '../../constants/image';
export default {
  name: 'ListTypeCourse',
  components: { Processbar },
  created() {
    this.DELETE_GRAY_ICON = DELETE_GRAY_ICON;
  },
  emits: ['clicked', 'add', 'delete'],
  props: {
    data: { type: Array, default: () => [] },
    extendClass: { type: String, default: '' },
    extendItemClass: { type: String, default: '' },
    hideProcessBar: { type: Boolean, default: false },
    hideCourseFinished: { type: Boolean, default: false },
    showAddCourse: { type: Boolean, default: false },
    showDelete: { type: Boolean, default: false },
  },
  methods: {
    handleDeleteCourse(data) {
      this.$emit('delete', data);
    },
    handleClickPending(data) {
      if (data) {
        notification.warning({ message: 'Course awaiting approval' });
      }
    },
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
  &-learn__button-2 {
    background-color: #fff;
    border-color: #fff;
    right: 15%;
    opacity: 0;
    font-weight: 600;
    position: absolute;
    top: 55%;
    border-radius: 12px;
    padding: 10px 20px;
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
.course:hover .course-learn__button-2,
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
