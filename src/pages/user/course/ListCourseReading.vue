<template>
  <div>
    <ButtonBack title="Course Reading" :hide-back="true" @back="onBack" />
    <ListCourse :data="listReading" @clicked="goToDetailCourse" />
  </div>
</template>
<script>
import ButtonBack from '../../../components/common/ButtonBack.vue';
import ListCourse from '../../../components/common/ListCourse.vue';
import { EXAMPLE } from '../../../constants/image';
import { formatSpacerIntoHyphen } from '../../../constants/function';

export default {
  name: 'ListCourseReading',
  components: { ButtonBack, ListCourse },
  created() {
    this.EXAMPLE = EXAMPLE;
    this.formatSpacerIntoHyphen = formatSpacerIntoHyphen;
  },
  methods: {
    onBack() {
      this.$router.push({ name: 'Course' });
    },
    goToDetailCourse(data) {
      console.log('data', data);
      const path = formatSpacerIntoHyphen(data.item.title);
      this.$router.push({
        name: 'MemberDetailCourseReading',
        params: { course: path.toLowerCase() },
      });
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
