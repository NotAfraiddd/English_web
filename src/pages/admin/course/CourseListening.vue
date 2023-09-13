<template>
  <div>
    <ButtonBack title="Course Listening" :hide-back="true" @back="onBack" />
    <ListCourse :data="listListening" @clicked="goToDetailCourse" />
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
import { formatSpacerIntoHyphen } from '../../../constants/function';
import { EXAMPLE } from '../../../constants/image';
export default {
  name: 'CourseListening',
  components: { ButtonBack, ListCourse },
  created() {
    this.EXAMPLE = EXAMPLE;
    this.formatSpacerIntoHyphen = formatSpacerIntoHyphen;
  },
  methods: {
    onBack() {
      this.$router.push({ name: 'Course' });
    },
    goToCreateCourse() {
      this.$router.push({ name: 'CreateCourseListening' });
    },
    goToDetailCourse(data) {
      const path = formatSpacerIntoHyphen(data.item.title);
      this.$router.push({
        name: 'DetailCourseListening',
        params: { name: path },
      });
    },
  },
  data() {
    return {
      listListening: [
        { id: 1, title: 'Message to new friend', image: EXAMPLE },
        { id: 2, title: 'Message to new friend', image: EXAMPLE },
        { id: 3, title: 'Message to new friend', image: EXAMPLE },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
