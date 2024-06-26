<template>
  <Slider />
  <div v-if="listCourses.length != 0">
    <ListTypeCourse
      :data="listCourses"
      @clicked="getData"
      @add="handleAdd"
      :hideCourseFinished="true"
      :show-add-course="isAdvanced"
      extendClass="grid-cols-user mt-2"
      extendItemClass="user-course mx-5"
    />
  </div>
  <div v-else>No data</div>
  <div class="text-left font-semibold text-xl mt-10">Featured blogs</div>
  <div class="grid grid-cols-5 detail-blog-grid gap-4 mr-4">
    <div
      v-for="(item, index) in listBlog"
      :key="index"
      @click="handleGoToBlog(item)"
      class="flex flex-col detail-blog-item cursor-pointer hover:opacity-90"
    >
      <div
        class="profile-background mt-5 hover:opacity-50"
        :style="{ backgroundImage: 'url(' + item.thumnail + ')' }"
      />
      <div class="font-semibold my-3 item-title">
        {{ item?.title }}
      </div>
      <div class="flex">
        <Avatar
          :imgUrl="item.avatar"
          :name="item.userID"
          class="w-5 h-5 border"
        />
        <div class="ml-3 flex justify-between items-center gap-2">
          <div class="text-sm font-semibold">{{ item?.name }}</div>
          ·
          <div class="text-sm text-primary_grey_time">
            {{ item?.created_at }}
          </div>
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
  <!-- modal create -->
  <ConfirmModal
    :showModal="showModalCreateCourse"
    @closeModal="closeModalCreateCourse"
    @save="closeModalCreateCourse"
    :showFooter="false"
    :widthCustom="850"
  >
    <template #content>
      <div class="w-full font-bold text-center text-xl text-primary opacity-90">
        New Course
      </div>
      <div class="flex w-full mt-5 justify-between">
        <div
          class="h-10 leading-10 text-primary_black text-left font-semibold text-base mr-20"
        >
          Title
        </div>
        <input
          v-model="createTitle"
          type="text"
          class="input-type-course border rounded-lg form-control"
          spellcheck="false"
          ref="errorInputTitle"
        />
      </div>
      <div class="flex w-full mt-5 justify-between">
        <div
          class="h-10 leading-10 text-primary_black text-left font-semibold text-base"
        >
          Subtitle
        </div>
        <input
          ref="errorInputSubtitle"
          v-model="createSubtitle"
          type="text"
          class="input-type-course border rounded-lg form-control"
          spellcheck="false"
        />
      </div>
      <div class="flex w-full mt-5 justify-between">
        <div
          class="h-10 leading-10 text-primary_black text-left font-semibold text-base"
        >
          Name course
        </div>
        <input
          ref="errorInputName"
          v-model="createName"
          type="text"
          class="input-type-course border rounded-lg form-control"
          spellcheck="false"
        />
      </div>
      <div class="flex w-full mt-5 justify-between">
        <div
          class="h-10 leading-10 text-primary_black text-left font-semibold text-base"
        >
          Level
        </div>
        <InputLevel
          external-class="input-type-course h-10"
          :selectedValueProp="createLevel"
          @update="updateLevel"
        />
      </div>
      <div class="flex w-full mt-5 justify-between">
        <div
          class="h-10 leading-10 text-primary_black text-left font-semibold text-base"
        >
          Background
        </div>
        <input
          v-model="createColor"
          class="input-type-course form-control h-10 text-left px-2 py-1 border cursor-pointer rounded-lg"
          ref="colorPicker"
          data-jscolor=""
          @input="
            createColorTemp?.length < 3 ? (createColorTemp = createColor) : null
          "
        />
      </div>
    </template>
    <template #select>
      <div class="flex justify-between items-center mt-3 gap-40">
        <div class="flex gap-10 mt-4">
          <div
            class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
            @click="cancelTypeCourse"
          >
            <span class="text-base text-primary">Cancel</span>
          </div>
          <div
            class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
            @click="createTypeCourse"
          >
            <span class="text-base text-white">Create</span>
          </div>
        </div>
      </div>
    </template>
  </ConfirmModal>
  <!-- modal check -->
  <ConfirmModal
    :showModal="modalCheckLastOne"
    @closeModal="closeModalCheckLastOne"
    @save="closeModalCheckLastOne"
    :showFooter="false"
    :widthCustom="600"
  >
    <template #icon>
      <img :src="WARNING" alt="" srcset="" class="w-10 h-10" />
    </template>
    <template #content>
      <div class="text-primary_black my-4 text-center">
        Please check one last time, because the course cannot be updated
      </div>
    </template>
    <template #select>
      <div class="flex gap-20">
        <div
          class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="cancelAPICreateCourse"
        >
          <span class="text-base text-primary">Cancel</span>
        </div>
        <div
          class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="sendAPICreateCourse"
        >
          <span class="text-base text-white">Send Admin</span>
        </div>
      </div>
    </template>
  </ConfirmModal>
  <!-- modal login -->
  <ConfirmModal
    :showModal="modalLogin"
    @closeModal="closeModalLogin"
    @save="closeModalLogin"
    :showFooter="false"
    :widthCustom="600"
  >
    <template #content>
      <div class="text-primary_black my-4 text-center">
        You must be logged in to do this action
      </div>
    </template>
    <template #select>
      <div class="flex gap-20">
        <div
          class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="closeModalLogin"
        >
          <span class="text-base text-primary">Cancel</span>
        </div>
        <div
          class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="goToLogin"
        >
          <span class="text-base text-white">Go to Login</span>
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
import { AVATAR, LEARN, LISTENING, WARNING } from '../../../constants/image';
import Slider from '../../../components/common/Slider.vue';
import moment from 'moment';
import userApi from '../../../apis/user';
import CourseApi from '../../../apis/course';
import jscolor from '@eastdesire/jscolor';
import { NOTIFY_MESSAGE } from '../../../constants';
import InputLevel from '../../../components/common/InputLevel.vue';
import { mapState } from 'vuex';
import courseApi from '../../../apis/course';
import blog from '../../../apis/blog';
import Avatar from '../../../components/common/Avatar.vue';
export default {
  name: 'HomeUser',
  components: {
    ListTypeCourse,
    ConfirmModal,
    InputLevel,
    Slider,
    Avatar,
  },
  created() {
    this.WARNING = WARNING;
    this.AVATAR = AVATAR;
    this.LISTENING = LISTENING;
    this.LEARN = LEARN;
    this.formatSpacerIntoHyphen = formatSpacerIntoHyphen;
    this.userInfor = JSON.parse(localStorage.getItem('user'));
    this.idBeginner = JSON.parse(localStorage.getItem('idBeginner'));
    this.isLogin = JSON.parse(localStorage.getItem('isLogin'));
    this.$nextTick(() => {
      this.getAllCourse();
      this.getDetail();
      this.getAllBlog();
    });
  },
  computed: {
    ...mapState('notify', ['statusCallAPICourse']),
    isAdvanced() {
      if (this.userInfor.level == this.checkLevel) return true;
      return false;
    },
  },
  data() {
    return {
      modalLogin: false,
      isLogin: false,
      checkLevel: 'ADVANCED',
      modalCheckLastOne: false,
      showModalChooseCourse: false,
      showModalCreateCourse: false,
      createTitle: '',
      createSubtitle: '',
      createName: '',
      createColor: '#000000',
      createColorTemp: '',
      createColorPickerTemp: '',
      createLevel: 1,
      userInfor: null,
      inputTime: '2023-10-25 01:08:00',
      delayMinutes: null,
      modalChooseCourse: false,
      userLevel: [],
      listeningSectionAttemptList: [],
      readingSectionAttemptList: [],
      courseObject: {
        id: null,
        title: null,
        name: null,
      },
      listCourses: [],
      listBlog: [],
      idBeginner: null,
      idAdvanced: null,
      idIntermediate: null,
    };
  },

  watch: {
    createTitle() {
      this.$refs.errorInputTitle.classList.remove('border-red-500');
    },
    createSubtitle() {
      this.$refs.errorInputSubtitle.classList.remove('border-red-500');
    },
    createName() {
      this.$refs.errorInputName.classList.remove('border-red-500');
    },
    statusCallAPICourse(newVal) {
      if (newVal) {
        this.getAllCourse();
      }
    },
  },
  mounted() {
    this.updateCurrentTime();
    setInterval(this.updateCurrentTime, 1000);
  },
  methods: {
    handleGoToBlog(data) {
      if (this.isLogin)
        this.$router.push({
          name: 'DetailBlog',
          params: { username: data.userID, id: data.id },
        });
      else {
        this.modalLogin = true;
      }
    },
    async getAllBlog() {
      try {
        const data = await blog.getRecentBlog();
        data.content.forEach((item) => {
          this.listBlog.push({
            id: item?.id,
            userID: item?.author?.email,
            avatar: item?.author?.avtURL,
            name: item?.author?.fullName,
            title: item?.title,
            thumnail: item?.thumbnailURL,
            created_at: moment(item?.createDate).format('DD/MM/YYYY HH:mm'),
          });
        });
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      }
    },

    async sendAPICreateCourse() {
      try {
        const data = {
          name: this.createTitle,
          description: this.createSubtitle,
          courseLevel: this.createLevel,
          colorCode: this.createColor,
          creatorUserid: {
            uid: this.userInfor.email,
          },
        };
        if (this.modalCheckLastOne) {
          this.emitter.emit('isShowLoading', true);
          await courseApi.createCourse(data);
          this.emitter.emit('isShowLoading', false);
          notification.success({ message: 'Create course success' });
        }
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      } finally {
        this.getAllCourse();
      }
      this.modalCheckLastOne = false;
      this.cancelTypeCourse();
    },
    cancelAPICreateCourse() {
      this.modalCheckLastOne = false;
    },
    closeModalLogin() {
      this.modalLogin = false;
    },
    /**
     * show and hide modal check last one
     */
    closeModalCheckLastOne() {
      this.modalCheckLastOne = false;
    },
    showModalCheckLastOne() {
      this.modalCheckLastOne = true;
    },
    updateLevel(e) {
      this.createLevel = e;
    },
    handleAdd() {
      this.showModalCreateCourse = true;
      this.handleCreateColor();
    },
    cancelTypeCourse() {
      this.createTitle = '';
      this.createSubtitle = '';
      this.createColor = '#000000';
      this.createName = '';
      this.createLevel = 1;
      this.showModalCreateCourse = false;
    },
    createTypeCourse() {
      if (
        this.createTitle &&
        this.createName &&
        this.createSubtitle &&
        this.createColor &&
        this.createLevel
      ) {
        this.showModalCheckLastOne();
      } else {
        notification.error({ message: NOTIFY_MESSAGE.CREATE_FAILED });
      }
      if (!this.createTitle) {
        this.$refs.errorInputTitle.classList.remove('border');
        this.$refs.errorInputTitle.classList.add('border-red-500');
      }
      if (!this.createSubtitle) {
        this.$refs.errorInputSubtitle.classList.remove('border');
        this.$refs.errorInputSubtitle.classList.add('border-red-500');
      }
      if (!this.createName) {
        this.$refs.errorInputName.classList.remove('border');
        this.$refs.errorInputName.classList.add('border-red-500');
      }
      if (!this.createColor) {
        this.$refs.colorPicker.classList.remove('border');
        this.$refs.colorPicker.classList.add('border-red-500');
      }
    },
    showModalCreate() {
      this.showModalCreateCourse = true;
      this.handleCreateColor();
    },
    closeModalCreateCourse() {
      this.showModalCreateCourse = false;
    },
    /**
     * @description show colorPicker and resolve value color when user choose any color
     * @returns {void}
     */
    handleCreateColor() {
      this.createColorTemp = this.createColor;
      // NOTE: Waitting DOM is updated before we access into DOM
      this.$nextTick(() => {
        this.createColorPickerTemp = new jscolor(this.$refs.colorPicker, {
          width: 120,
          position: 'top',
        });
        // NOTE: always set jscolor.init() before always show to set changing color
        jscolor.init();
        // this.colorPickerTemp.show();
      });
    },
    closeModalChoose() {
      this.modalChooseCourse = false;
    },
    /**
     * get all course
     */
    async getAllCourse() {
      this.listCourses = [];
      try {
        this.emitter.emit('isShowLoading', true);
        const data = await CourseApi.allCourse();
        data.forEach((item) => {
          if (item?.courseLevel != 'PENDING') {
            if (
              item.courseStatus == 'APPROVED' ||
              item.courseStatus == 'PENDING'
            ) {
              let modifiedLevel =
                item?.courseLevel.charAt(0).toUpperCase() +
                item?.courseLevel.slice(1).toLowerCase();
              this.listCourses.push({
                id: item?.id,
                title: modifiedLevel + ' Level',
                level: modifiedLevel,
                subtitle: item?.description,
                name: item?.name,
                courseFinished: 0,
                color: item?.colorCode,
                status: item.courseStatus == 'PENDING' ? true : false,
              });
              if (item.courseStatus == 'APPROVED') {
                item?.listeningSectionList.forEach((ele) => {
                  if (ele.sectionStatus == 'APPROVED') {
                    const check = this.userInfor.courseAttemptList.find(
                      (item) => item.course.id == ele.id,
                    );
                    const hasCompletedReadingSection =
                      check?.readingSectionAttemptList.some((item) => {
                        return (
                          item.listeningSection.id === check.course.id &&
                          item.completion === true
                        );
                      });
                    this.listeningSectionAttemptList.push({
                      completion: hasCompletedReadingSection ? 1 : 0,
                      listeningSection: {
                        id: ele.id,
                      },
                    });
                  }
                });
                item?.readingSectionList.forEach((ele) => {
                  if (ele.sectionStatus == 'APPROVED') {
                    const check = this.userInfor.courseAttemptList.find(
                      (item) => item.course.id == ele.id,
                    );
                    const hasCompletedReadingSection =
                      check?.readingSectionAttemptList.some((item) => {
                        return (
                          item.readingSection.id === check.course.id &&
                          item.completion === true
                        );
                      });
                    this.readingSectionAttemptList.push({
                      completion: hasCompletedReadingSection ? 1 : 0,
                      readingSection: {
                        id: ele.id,
                      },
                    });
                  }
                });
              }
            }
          }
        });
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        this.emitter.emit('isShowLoading', false);
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

        this.listCourses.forEach((item) => {
          const isAdvanced = item.level.toUpperCase() == 'ADVANCED';
          const isBeginner = item.level.toUpperCase() == 'BEGINNER';
          if (user.level == 'ADVANCED')
            this.userLevel.push({
              id: item.id,
              level: item.level,
              status: true,
            });
          else if (user.level == 'INTERMEDIATE') {
            this.userLevel.push({
              id: item.id,
              level: item.level,
              status: isAdvanced ? false : true,
            });
          } else if (user.level == 'BEGINNER') {
            this.userLevel.push({
              id: item.id,
              level: item.level,
              status: isBeginner ? true : false,
            });
          }
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.userInfor = JSON.parse(localStorage.getItem('user'));
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
    goToLogin() {
      this.$router.push({ name: 'Login' });
    },
    getData(data) {
      if (this.isLogin) {
        if (data.status) {
          this.courseObject.id = data.item.id;
          this.courseObject.title = data.item.title;
          this.courseObject.subtitle = data.item.subtitle;
          this.modalChooseCourse = data.status;
          if (data.item.id) {
            localStorage.setItem('IDCourse', data.item.id);
          }
        }
      } else {
        this.modalLogin = true;
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
@import '../../user/blog/Blog.scss';
</style>
