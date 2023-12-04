<template>
  <div v-if="listCourses.length != 0">
    <ListTypeCourse
      :data="listCourses"
      @clicked="getData"
      :hideProcessBar="true"
      :hideCourseFinished="true"
      extendClass="grid-cols-user"
      extendItemClass="user-course mx-5"
    />
  </div>
  <div v-else>
    <ButtonBackUser title="My courses" :hide-back="true" @back="changeBack" />
    <div class="mt-2 text-left">No courses yet</div>
    <div class="mt-2 justify-start flex gap-1">
      You can learn
      <div
        @click="handleGoToHome"
        class="text-green-500 hover:underline cursor-pointer"
      >
        new courses
      </div>
    </div>
  </div>
  <ConfirmModal
    :showModal="modalChooseCourse"
    @closeModal="closeModalChoose"
    @save="closeModalChoose"
    :showFooter="false"
    :widthCustom="600"
  >
    <template #icon>
      <img :src="LEARN" alt="" srcset="" />
    </template>
    <template #content>
      <div class="text-primary_black my-5 flex gap-1">
        Do you want to choose
        <div class="font-semibold">Listening</div>
        or
        <div class="font-semibold">Reading</div>
        ?
      </div>
    </template>
    <template #select>
      <div class="flex gap-20">
        <div
          class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="goToListening"
        >
          <span class="text-base text-primary">Listening</span>
        </div>
        <div
          class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="goToReading"
        >
          <span class="text-base text-white">Reading</span>
        </div>
      </div>
    </template>
  </ConfirmModal>
</template>
<script>
import { notification } from 'ant-design-vue';
import ConfirmModal from '../../../components/admin/ConfirmModal.vue';
import ListTypeCourse from '../../../components/common/ListTypeCourse.vue';
import { formatSpacerIntoHyphen } from '../../../constants/function';
import { LEARN } from '../../../constants/image';
import ButtonBackUser from '../../../components/common/ButtonBackUser.vue';

export default {
  name: 'HomeUser',
  components: { ListTypeCourse, ConfirmModal, ButtonBackUser },
  created() {
    this.LEARN = LEARN;
    this.formatSpacerIntoHyphen = formatSpacerIntoHyphen;
    this.userInfor = JSON.parse(localStorage.getItem('user'));
    if (this.userInfor) {
      this.getListCourseStudied(this.userInfor.courseAttemptList);
    }
  },
  data() {
    return {
      userInfor: null,
      modalChooseCourse: false,
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
  computed: {
    listCoursesLearned() {
      return this.listCourses.filter(
        (course) => course.percentages[0].percentage !== 0,
      );
    },
  },
  methods: {
    getListCourseStudied(data) {
      console.log(data);
    },
    handleGoToHome() {
      this.$router.push({ name: 'HomeUser' });
    },
    changeBack() {
      this.$router.push({ name: 'HomeUser' });
    },

    closeModalChoose() {
      this.modalChooseCourse = false;
    },
    getData(data) {
      const result = this.userLevel.some(
        (item) =>
          item.level == data.item.level && item.status == data.item.status,
      );
      const resultCourseAll = this.userLevel.some(
        (item) => data.item.level == 'All' && item.status == data.item.status,
      );
      if (result) {
        if (!resultCourseAll) {
          if (data.status) {
            this.courseObject.id = data.item.id;
            this.courseObject.title = data.item.title;
            this.courseObject.subtitle = data.item.subtitle;
            this.modalChooseCourse = data.status;
          }
        } else
          this.$router.push({
            name: 'Grammar',
          });
      } else notification.warn({ message: 'Your level is not yet achieved' });
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
