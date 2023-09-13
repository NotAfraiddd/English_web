<template>
  <div>
    <ButtonBack title="Course Listening" :hide-back="true" @back="onBack" />
    <div class="flex flex-col">
      <img :src="EXAMPLE" alt="" srcset="" />
    </div>
  </div>
</template>
<script>
import ButtonBack from '../../../components/common/ButtonBack.vue';
import { EXAMPLE } from '../../../constants/image';
export default {
  name: 'DetailCourseListening',
  components: { ButtonBack },
  created() {
    this.EXAMPLE = EXAMPLE;
  },
  methods: {
    goToDetailCourse(data) {
      console.log(data);
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
