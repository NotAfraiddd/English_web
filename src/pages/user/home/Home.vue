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
  <div class="text-left font-semibold text-xl mt-10">Featured blogs</div>
  <div class="grid grid-cols-5 detail-blog-grid gap-4 mr-4">
    <div
      v-for="(item, index) in 8"
      :key="index"
      class="flex flex-col detail-blog-item cursor-pointer hover:opacity-90"
    >
      <div
        class="profile-background mt-5 hover:opacity-50"
        :style="{ backgroundImage: 'url(' + LISTENING + ')' }"
      />
      <div class="font-semibold my-3 item-title">
        Effective Methods for Improving English Language Skills.
      </div>
      <div class="flex">
        <img :src="AVATAR" alt="" class="w-5 h-5 rounded-full" />
        <div class="ml-3 flex justify-between items-center gap-2">
          <div class="text-sm font-semibold">Chi Bao</div>
          ·
          <div class="text-sm text-primary_grey_time">{{ delayMinutes }}</div>
        </div>
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
import { AVATAR, LEARN, LISTENING } from '../../../constants/image';
import ButtonBackUser from '../../../components/common/ButtonBackUser.vue';
import Slider from '../../../components/common/Slider.vue';
import moment from 'moment';
import userApi from '../../../apis/user';
import CourseApi from '../../../apis/course';

export default {
  name: 'HomeUser',
  components: { ListTypeCourse, ConfirmModal, ButtonBackUser, Slider },
  created() {
    this.AVATAR = AVATAR;
    this.LISTENING = LISTENING;
    this.LEARN = LEARN;
    this.formatSpacerIntoHyphen = formatSpacerIntoHyphen;
    this.userInfor = JSON.parse(localStorage.getItem('user'));
    this.getAllCourse();
    this.getDetail();
  },
  data() {
    return {
      userInfor: null,
      inputTime: '2023-10-25 01:08:00',
      delayMinutes: null,
      modalChooseCourse: false,
      userLevel: [
        // { id: 1, level: 'Basic', status: 1 },
        // { id: 2, level: 'Intermediate', status: 0 },
        // { id: 3, level: 'All', status: 1 },
      ],
      courseObject: {
        id: null,
        title: null,
        name: null,
      },
      listCourses: [],
    };
  },
  mounted() {
    this.updateCurrentTime();
    setInterval(this.updateCurrentTime, 1000);
  },
  methods: {
    /**
     * get all course
     */
    async getAllCourse() {
      try {
        const data = await CourseApi.allCourse();
        data.forEach((item) => {
          let modifiedLevel =
            item?.courseLevel.charAt(0).toUpperCase() +
            item?.courseLevel.slice(1).toLowerCase();
          this.listCourses.push({
            id: item?.id,
            title: modifiedLevel + ' Level',
            level: modifiedLevel,
            subtitle: item?.description,
            percentages: [{ percentage: 0 }],
            name: item?.name,
            courseFinished: 0,
            color: item?.colorCode,
            status: 0,
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * get detail user
     */
    async getDetail() {
      try {
        const email = this.userInfor.email;
        const data = await userApi.getUser(email);
        localStorage.setItem('user', JSON.stringify(data));
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(
          user.level == 'BEGINNER',
          user.level == 'INTERMEDIATE',
          user.level == 'ADVANCED',
        );
        this.listCourses.forEach((item) => {
          console.log(' item', item);
          if (user.level == 'BEGINNER') {
            this.userLevel.push({
              id: item.id,
              level: item.level,
              status: 1,
            });
          } else if (user.level == 'Intermediate') {
            this.userLevel.push({
              id: item.id,
              level: item.level,
              status: 1,
            });
          } else if (user.level == 'ADVANCED') {
            this.userLevel.push({
              id: item.id,
              level: item.level,
              status: 1,
            });
          } else
            this.userLevel.push({
              id: item.id,
              level: item.level,
              status: 0,
            });
        });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * set time to show history time of blog
     */
    updateCurrentTime() {
      const currentTime = moment();
      const inputTimeMoment = moment(this.inputTime, 'YYYY-MM-DD HH:mm:ss');
      const delayInSeconds = currentTime.diff(inputTimeMoment, 'seconds');
      let timeSeconds = delayInSeconds;
      if (timeSeconds < 60) this.delayMinutes = timeSeconds + ` seconds ago`;
      else if (timeSeconds < 60 * 60 && timeSeconds >= 60) {
        if (timeSeconds < 60 * 2)
          this.delayMinutes = Math.floor(timeSeconds / 60) + ` min ago`;
        else this.delayMinutes = Math.floor(timeSeconds / 60) + ` mins ago`;
      } else if (timeSeconds < 60 * 60 * 24 && timeSeconds >= 60 * 60) {
        if (timeSeconds < 60 * 60 * 2)
          this.delayMinutes = Math.floor(timeSeconds / 3600) + ` hour ago`;
        else this.delayMinutes = Math.floor(timeSeconds / 3600) + ` hours ago`;
      } else if (timeSeconds < 86400 * 24 && timeSeconds >= 86400) {
        if (timeSeconds < 86400 * 2)
          this.delayMinutes = Math.floor(timeSeconds / 86400) + ` day ago`;
        else if (86400 * 2 <= timeSeconds && timeSeconds <= 86400 * 8) {
          this.delayMinutes = Math.floor(timeSeconds / 86400) + ` days ago`;
        } else this.delayMinutes = inputTimeMoment.format('YYYY-MM-DD');
      }
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
      console.log(data, result);
      if (result) {
        if (data.status) {
          this.courseObject.id = data.item.id;
          this.courseObject.title = data.item.title;
          this.courseObject.subtitle = data.item.subtitle;
          this.modalChooseCourse = data.status;
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
@import '../../user/blog/Blog.scss';
</style>
