<template>
  <div v-if="listCourses.length != 0">
    <ListTypeCourse
      :data="listCourses"
      @clicked="getData"
      :hideCourseFinished="true"
      extendClass="grid-cols-user mt-2"
      extendItemClass="user-course mx-5"
    />
  </div>
  <div v-else>No data</div>
</template>
<script>
import { notification } from 'ant-design-vue';
import ListTypeCourse from '../../../components/common/ListTypeCourse.vue';
import { formatSpacerIntoHyphen } from '../../../constants/function';
import { LEARN } from '../../../constants/image';
import courseApi from '../../../apis/course';

export default {
  name: 'HomeUser',
  components: { ListTypeCourse },
  created() {
    this.LEARN = LEARN;
    this.formatSpacerIntoHyphen = formatSpacerIntoHyphen;
    this.userInfor = JSON.parse(localStorage.getItem('user'));
    this.getAllCourse();
  },
  data() {
    return {
      userInfor: null,
      userLevel: [
        { id: 1, level: 'Basic', status: 1 },
        { id: 2, level: 'Intermediate', status: 0 },
        { id: 3, level: 'All', status: 1 },
      ],
      courseObject: {
        id: null,
        title: null,
        name: null,
      },
      listCourses: [],
    };
  },
  methods: {
    /**
     * get all course
     */
    async getAllCourse() {
      this.listCourses = [];
      try {
        this.emitter.emit('isShowLoading', true);
        const data = await courseApi.allCourse();
        data.forEach((item) => {
          if (item?.courseLevel == 'PENDING') {
            if (item?.id != 1) {
              this.listCourses.push({
                id: item?.id,
                title: item?.name,
                subtitle: item?.description,
                name: item?.name,
                courseFinished: 0,
                color: item?.colorCode,
              });
            }
          }
        });
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        this.emitter.emit('isShowLoading', false);
        console.log(error);
      }
    },
    handleGoToHome() {
      this.$router.push({ name: 'HomeUser' });
    },
    changeBack() {
      this.$router.push({ name: 'HomeUser' });
    },

    getData(data) {
      if (data.item.id == 152) {
        this.$router.push({
          name: 'TestLevelListeningIntermediate',
          params: { id: data.item.id },
        });
      }
      if (data.item.id == 202) {
        if (this.userInfor.level == 'INTERMEDIATE') {
          this.$router.push({
            name: 'TestLevelListeningCreateCourse',
            params: { id: data.item.id },
          });
        } else if (this.userInfor.level == 'ADVANCED')
          notification.warning({
            message:
              'Your level is Advanced, so cannot update to level Advanced',
          });
        else {
          notification.warning({ message: 'Your level is not Intermediate' });
        }
      }
    },
    goToListening() {
      const path = formatSpacerIntoHyphen(
        this.courseObject.title,
      ).toLowerCase();
      this.$router.push({
        name: 'ListCourseListening',
        params: { name: path },
      });
    },
    goToReading() {
      const path = formatSpacerIntoHyphen(
        this.courseObject.title,
      ).toLowerCase();
      this.$router.push({ name: 'ListCourseReading', params: { name: path } });
    },
  },
};
</script>

<style lang="scss" scoped>
.grid-cols-user {
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  @media screen and (max-width: 1460px) {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    column-gap: 8px !important;
  }
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    column-gap: 8px !important;
  }
  @media screen and (max-width: 705px) {
    grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
    width: 98%;
  }
}
.user-course {
  width: 20rem;
  margin: 0 auto;
  @media screen and (max-width: 705px) {
    width: 98%;
  }
}
</style>
