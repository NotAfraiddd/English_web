<template>
  <div>
    <ButtonBack title="Course Reading" :hide-back="true" @back="onBack" />
    <ListCourse :data="listReading" />
    <div
      @click="goToCreateCourse"
      class="flex flex-col mt-5 h-auto cursor-pointer text-base flex-1 justify-between items-center border-dashed border-4 border-primary_black_opacity-600 gap-1 py-2 px-5 rounded-lg"
    >
      <div
        class="bg-text_back w-7 h-7 rounded-full text-xl font-semibold text-gray-400"
      >
        +
      </div>
      <div class="text-primary_black font-semibold">Add new course</div>
    </div>
  </div>
</template>
<script>
import ButtonBack from '../../../components/common/ButtonBack.vue';
import ListCourse from '../../../components/common/ListCourse.vue';
import { EXAMPLE } from '../../../constants/image';
export default {
  name: 'CourseReading',
  components: { ButtonBack, ListCourse },
  created() {
    this.EXAMPLE = EXAMPLE;
  },
  methods: {
    onBack() {
      this.$router.push({ name: 'Course' });
    },
    goToCreateCourse() {
      this.$router.push({ name: 'CreateCourseReading' });
    },
  },
  data() {
    return {
      listReading: [
        { id: 1, title: 'Message to new friend', image: EXAMPLE },
        { id: 2, title: 'Message to new friend', image: EXAMPLE },
        { id: 3, title: 'Message to new friend', image: EXAMPLE },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
