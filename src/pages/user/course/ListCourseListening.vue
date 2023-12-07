<template>
  <div class="w-full">
    <ButtonBack title="Course Listening" :hide-back="true" @back="onBack" />
    <div
      class="profile-background mt-5 mr-10"
      :style="{ backgroundImage: 'url(' + LISTENING + ')' }"
    />
    <div class="text-left mt-5">
      <div>
        Here you can find activities to practise your listening skills.
        Listening will help you to improve your understanding of the language
        and your pronunciation.
      </div>
      <div class="mt-5">
        The self-study lessons in this section are written and organised by
        English level based on the Common European Framework of Reference for
        languages (CEFR). There are recordings of different situations and
        interactive exercises that practise the listening skills you need to do
        well in your studies, to get ahead at work and to communicate in English
        in your free time. The speakers you will hear are of different
        nationalities and the recordings are designed to show how English is
        being used in the world today.
      </div>
    </div>
    <ListCourse
      v-if="listListening.length != 0"
      :data="listListening"
      @clicked="goToDetailCourse"
    />
    <div v-else class="text-primary_grey_time mt-10 text-right text-xl">
      No data
    </div>
  </div>
  <div
    v-if="userInfor.level == 'ADVANCED'"
    @click="goToCreateCourse"
    class="flex flex-col mt-10 mr-5 h-auto cursor-pointer text-base flex-1 justify-between items-center border-dashed border-4 border-primary_black_opacity-600 gap-1 py-2 px-5 rounded-lg"
  >
    <div
      class="bg-text_back w-7 h-7 rounded-full text-xl font-semibold text-gray-400"
    >
      +
    </div>
    <div class="text-primary_black font-semibold">Add new session</div>
  </div>
</template>
<script>
import ButtonBack from '../../../components/common/ButtonBack.vue';
import ListCourse from '../../../components/common/ListCourse.vue';
import {
  EXAMPLE,
  MOUNTAIN_CLIMB,
  CANCEL,
  CHECKED,
  LISTENING,
} from '../../../constants/image';
import { formatSpacerIntoHyphen } from '../../../constants/function';
import courseApi from '../../../apis/course';
import { notification } from 'ant-design-vue';

export default {
  name: 'ListCourseListening',
  components: { ButtonBack, ListCourse },
  created() {
    this.MOUNTAIN_CLIMB = MOUNTAIN_CLIMB;
    this.EXAMPLE = EXAMPLE;
    this.CANCEL = CANCEL;
    this.CHECKED = CHECKED;
    this.LISTENING = LISTENING;
    this.formatSpacerIntoHyphen = formatSpacerIntoHyphen;
    if (this.isMatchedRoute('ListCourseListening')) {
      this.$nextTick(() => {
        this.courseListening = true;
        this.checkHeightListening();
      });
    }
    this.namePath = this.$route.params.name;
    this.userInfor = JSON.parse(localStorage.getItem('user'));
    this.idCourse = JSON.parse(localStorage.getItem('IDCourse'));
    this.getAllListening();
    if (this.userInfor) {
      this.getListReading();
      this.getListListening();
    }
  },
  methods: {
    goToDetailReadingSection(data) {
      const path = formatSpacerIntoHyphen(data.title);
      this.$router.push({
        name: 'MemberDetailCourseReading',
        params: { course: path.toLowerCase(), id: data?.id },
      });
    },
    goToDetailListeningSection(data) {
      const path = formatSpacerIntoHyphen(data.title);
      this.$router.push({
        name: 'MemberDetailCourseListening',
        params: { course: path.toLowerCase(), id: data?.id },
      });
    },
    getListReading() {
      this.userInfor.courseAttemptList.forEach((item) => {
        if (item.course.id == this.idCourse) {
          item.readingSectionAttemptList.forEach((ele) => {
            if (!ele.completion) {
              this.listDetailReading.push({
                id: ele.readingSection.id,
                title: ele.readingSection.title,
                status: 0,
              });
            } else {
              this.listDetailReading.push({
                id: ele.readingSection.id,
                title: ele.readingSection.title,
                status: 1,
              });
              this.listDetailReadingFinished = this.listDetailReading.filter(
                (item) => item.status == 1,
              );
            }
          });
        }
      });
    },
    getListListening() {
      this.userInfor.courseAttemptList.forEach((item) => {
        if (item.course.id == this.idCourse) {
          item.listeningSectionAttemptList.forEach((ele) => {
            if (!ele.completion) {
              this.listDetailListening.push({
                id: ele.listeningSection.id,
                title: ele.listeningSection.title,
                status: 0,
              });
            } else {
              this.listDetailListening.push({
                id: ele.readingSection.id,
                title: ele.readingSection.title,
                status: 1,
              });
              this.listDetailListeningFinished =
                this.listDetailListening.filter((item) => item.status == 1);
            }
          });
        }
      });
    },
    /**
     * get all session
     * @param {*} dataID
     */
    async getAllListening() {
      try {
        this.emitter.emit('isShowLoading', true);
        const arrAPI = await courseApi.getAllListeningSession({
          id: this.idCourse,
        });

        this.listListening = [];

        if (
          this.userInfor.role == 'ADMIN' ||
          this.userInfor.level == 'ADVANCED'
        ) {
          arrAPI.forEach((item) => {
            this.listListening.push({
              id: item?.id,
              title: item?.title,
              subTitle: item?.description,
              image: item?.thumbnailURL || EXAMPLE,
              status: item?.sectionStatus == 'PENDING' ? true : false,
            });
          });
        } else {
          arrAPI.forEach((item) => {
            if (item?.sectionStatus == 'APPROVED') {
              this.listListening.push({
                id: item?.id,
                title: item?.description,
                subTitle: item?.textContent,
                image: item?.thumbnailURL || EXAMPLE,
                status: false,
              });
            }
          });
        }
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    onBack() {
      this.$router.push({ name: 'HomeUser' });
    },
    /**
     *  Check if the route name matches the route being displayed.
     *  @returns {boolean} - Returns true if the route name matches the current route, false otherwise.
     */
    isMatchedRoute(routeName) {
      return this.$route.matched.some(({ name }) => {
        return name == routeName;
      });
    },
    goToCreateCourse() {
      this.$router.push({
        name: 'UserCreateCourseListening',
        params: { course: this.namePath },
      });
    },
    goToDetailCourse(data) {
      if (!data?.item.status) {
        const path = formatSpacerIntoHyphen(data.item.title);
        this.$router.push({
          name: 'MemberDetailCourseListening',
          params: { course: path.toLowerCase(), id: data?.item.id },
        });
      } else {
        notification.warning({ message: 'Session awaiting approval' });
      }
    },
    showListCourseReading() {
      this.courseReading = true;
      this.checkHeightReading();
      this.courseListening = false;
      this.checkHeightListening();
    },
    showListCourseListening() {
      this.courseListening = true;
      this.checkHeightListening();
      this.courseReading = false;
      this.checkHeightReading();
    },
    checkHeightReading() {
      const heightReading = this.$refs.course;
      const marginTopReading = this.$refs.listening;
      if (heightReading) {
        const scrollHeight = heightReading.scrollHeight;
        if (this.courseReading == true) {
          heightReading.style.height = `${scrollHeight}px`;
          heightReading.style.opacity = '1';
          heightReading.style.transform = 'translateY(0)';
          marginTopReading.style.marginTop = `${scrollHeight}px`;
          marginTopReading.style.transition = 'margin-top 0.65s ease';
          this.courseListening = false;
        } else {
          heightReading.style.height = `0px`;
          marginTopReading.style.transition = 'margin-top 0.65s ease';
          marginTopReading.style.marginTop = `0px`;
        }
      }
    },
    checkHeightListening() {
      const heightListening = this.$refs.courseListening;
      const marginTopText = this.$refs.text;
      if (heightListening) {
        const scrollHeight = heightListening.scrollHeight;
        if (this.courseListening == true) {
          this.courseReading = false;
          heightListening.style.height = `${scrollHeight}px`;
          heightListening.style.opacity = '1';
          heightListening.style.transform = 'translateY(0)';
          marginTopText.style.marginTop = `${scrollHeight}px`;
          marginTopText.style.transition = 'margin-top 0.65s ease';
        } else {
          heightListening.style.height = `0px`;
          marginTopText.style.transition = 'margin-top 0.65s ease';
          marginTopText.style.marginTop = `0px`;
        }
      }
    },
  },
  data() {
    return {
      idCourse: null,
      namePath: null,
      userInfor: null,
      createPost: 0,
      courseReading: false,
      courseListening: false,
      listListening: [],
      listDetailReading: [],
      listDetailListening: [],
      listDetailReadingFinished: [],
      listDetailListeningFinished: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.text-overflow {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.profile-background {
  height: 550px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.contain-list {
  &__reading {
    height: fit-content;
    padding-bottom: 8px;
  }
}
.detail-course {
  z-index: 1;
  overflow: hidden;
  left: 0;
  height: 0;
  transition: height 0.65s ease, opacity 0.65s ease;
  top: 30px;
  width: 100%;
  border-radius: 12px;
}

.detail-course-listening {
  z-index: 1;
  overflow: hidden;
  left: 0;
  height: 0;
  transition: height 0.65s ease, opacity 0.65s ease;
  top: 30px;
  width: 100%;
  border-radius: 12px;
}

.checked:hover {
  transform: translateY(-2px);
}
</style>
