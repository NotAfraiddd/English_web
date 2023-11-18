<template>
  <div>
    <ButtonBack title="Course Grammar" :hide-back="true" @back="onBack" />
    <ListCourse :data="listReading" @clicked="goToDetailCourse" />
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
import { formatSpacerIntoHyphen } from '../../../constants/function';

export default {
  name: 'CourseGrammar',
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
      this.$router.push({ name: 'CreateCourseReading' });
    },
    goToDetailCourse(data) {
      const path = formatSpacerIntoHyphen(data.item.title);
      this.$router.push({
        name: 'DetailCourseReading',
        params: { name: path.toLowerCase() },
      });
    },
  },
  data() {
    return {
      listReading: [
        {
          id: 1,
          title: 'Message to new friend',
          subTitle:
            'Read a direct message on social media to practise and improve your reading skills.',
          image: EXAMPLE,
        },
        {
          id: 2,
          title: 'Message to new friend',
          subTitle:
            'Read a direct message on social media to practise and improve your reading skills.',
          image: EXAMPLE,
        },
        {
          id: 3,
          title: 'Message to new friend',
          subTitle:
            'Read a direct message on social media to practise and improve your reading skills.',
          image: EXAMPLE,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
