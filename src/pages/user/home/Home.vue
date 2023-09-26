<template>
  <div>
    <ListTypeCourse
      :data="listCourses"
      @clicked="getData"
      :hideProcessBar="true"
      :hideCourseFinished="true"
      extendClass="grid-cols-user"
      extendItemClass="user-course mx-5"
    />
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
import ConfirmModal from '../../../components/admin/ConfirmModal.vue';
import ListTypeCourse from '../../../components/common/ListTypeCourse.vue';
import { LEARN } from '../../../constants/image';
export default {
  name: 'HomeUser',
  components: { ListTypeCourse, ConfirmModal },
  created() {
    this.LEARN = LEARN;
  },
  data() {
    return {
      modalChooseCourse: false,
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
    closeModalChoose() {
      this.modalChooseCourse = false;
    },
    getData(data) {
      if (data.status) {
        this.modalChooseCourse = data.status;
      }
    },
    goToListening() {
      // this.$router.push({ name: 'DetailBlogPending', params: { id: dataID } });
    },
    goToReading() {},
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
