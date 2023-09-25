<template>
  <div>
    <ListTypeCourse
      :data="listCourses"
      @clicked="getData"
      :hideProcessBar="true"
      :hideCourseFinished="true"
      extendClass="grid-cols-4"
    />
  </div>
</template>
<script>
import ListTypeCourse from '../../../components/common/ListTypeCourse.vue';

export default {
  name: 'HomeUser',
  components: { ListTypeCourse },
  data() {
    return {
      listCourses: [
        {
          id: 1,
          title: 'Basic Level',
          subtitle: 'English for individuals with basic knowledge.',
          percentages: [{ percentage: 30 }],
          name: 'Basic English Course',
          courseFinished: '3/10',
          color: '#0068FF',
        },
        {
          id: 2,
          title: 'Intermediate Level',
          subtitle: 'English for individuals with intermediate knowledge.',
          percentages: [{ percentage: 65 }],
          name: 'Intermediate English Course',
          courseFinished: '3/10',
          color: '#AA53EE',
        },
        {
          id: 3,
          title: 'Advanced Level',
          subtitle: 'English for individuals with advanced knowledge.',
          percentages: [{ percentage: 10 }],
          name: 'Advanced English Course',
          courseFinished: '3/10',
          color: '#87CF2A',
        },
        {
          id: 4,
          title: 'Grammar',
          subtitle: 'English for individuals with basic knowledge.',
          percentages: [{ percentage: 90 }],
          name: 'Grammar English Course',
          courseFinished: '3/10',
          color: '#7C89CE',
        },
      ],
    };
  },
  methods: {
    getData(data) {
      if (data.status) {
        this.$router.push({ name: 'Dashboard' });
      }
      console.log(data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
