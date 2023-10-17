<template>
  <Slider />
  <div v-if="listCourses.length != 0">
    <ListTypeCourse
      :data="listCourses"
      @clicked="getData"
      :hideProcessBar="true"
      :hideCourseFinished="true"
      extendClass="grid-cols-user mt-2"
      extendItemClass="user-course mx-5"
    />
  </div>
  <div v-else>
    <ButtonBackUser title="My course" :hide-back="true" @back="changeBack" />
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
import Slider from '../../../components/common/Slider.vue';
export default {
  name: 'HomeUser',
  components: { ListTypeCourse, ConfirmModal, ButtonBackUser, Slider },
  created() {
    this.LEARN = LEARN;
    this.formatSpacerIntoHyphen = formatSpacerIntoHyphen;
  },
  data() {
    return {
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
      listCourses: [
        {
          id: 1,
          title: 'Basic Level',
          level: 'Basic',
          subtitle: 'English for individuals with basic knowledge.',
          percentages: [{ percentage: 30 }],
          name: 'Basic English Course',
          courseFinished: '3/10',
          color: '#0068FF',
          status: 1,
        },
        {
          id: 2,
          title: 'Intermediate Level',
          level: 'Intermediate',
          subtitle: 'English for individuals with intermediate knowledge.',
          percentages: [{ percentage: 65 }],
          name: 'Intermediate English Course',
          courseFinished: '3/10',
          color: '#AA53EE',
          status: 0,
        },
        {
          id: 3,
          title: 'Advanced Level',
          level: 'Advanced',
          subtitle: 'English for individuals with advanced knowledge.',
          percentages: [{ percentage: 0 }],
          name: 'Advanced English Course',
          courseFinished: '0/10',
          color: '#87CF2A',
          status: 0,
        },
        {
          id: 4,
          title: 'Grammar',
          level: 'All',
          subtitle: 'English for individuals with basic knowledge.',
          percentages: [{ percentage: 90 }],
          name: 'Grammar English Course',
          courseFinished: '3/10',
          color: '#7C89CE',
          status: 1,
        },
      ],
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
        } else {
          const path = formatSpacerIntoHyphen(data.item.title).toLowerCase();
          this.$router.push({
            name: 'Grammar',
            params: { name: path },
          });
        }
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
