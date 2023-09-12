<template>
  <div>
    <ButtonBack
      title="List Course Listening"
      :hide-back="true"
      @back="onBack"
    />
    <ListCourse :data="listListening" />
  </div>
</template>
<script>
import ButtonBack from '../../../components/common/ButtonBack.vue';
import ListCourse from '../../../components/common/ListCourse.vue';
import { EXAMPLE } from '../../../constants/image';
export default {
  name: 'CourseListening',
  components: { ButtonBack, ListCourse },
  created() {
    this.EXAMPLE = EXAMPLE;
  },
  methods: {
    onBack() {
      this.$router.push({ name: 'Course' });
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
