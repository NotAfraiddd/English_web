<template>
  <div>
    <ButtonBack title="Test level" @back="changeBack" />
    <div class="flex w-full mt-5 justify-between">
      <div
        class="h-10 leading-10 text-primary_black text-left font-semibold text-base w-1/4"
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
        class="h-10 leading-10 text-primary_black text-left font-semibold text-base w-1/4"
      >
        Title
      </div>
      <input
        ref="errorInputSubtitle"
        v-model="createTitle"
        type="text"
        class="input-type-course border rounded-lg form-control"
        spellcheck="false"
      />
    </div>
    <div class="flex w-full mt-5 justify-between">
      <div
        class="h-10 leading-10 text-primary_black text-left font-semibold text-base w-1/4"
      >
        Level
      </div>
      <InputLevel
        external-class="w-full"
        :disabled="true"
        :selected-value-prop="createLevel"
      />
    </div>
    <div class="flex w-full mt-5 gap-40 justify-center">
      <div
        class="cursor-pointer rounded-lg border-yellow-400 border w-24 text-center h-8 leading-8 hover:opacity-50"
        @click="handleUpdate"
      >
        <span class="text-base text-yellow-400">Update</span>
      </div>
      <div
        class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
        @click="handleNext"
      >
        <span class="text-base text-primary">Next</span>
      </div>
    </div>
    <ConfirmModal
      :showModal="modal"
      @closeModal="closeModal"
      @save="closeModal"
      :showFooter="false"
      :widthCustom="500"
    >
      <template #icon>
        <img :src="ADMIN_COURSE" alt="" srcset="" class="h-10 w-10" />
      </template>
      <template #content>
        <div class="text-base flex gap-2 items-center my-3">
          <p class="font-semibold text-xl m-0">Reading</p>
          or
          <p class="font-semibold text-xl m-0">Listening</p>
        </div>
      </template>
      <template #select>
        <div class="flex gap-10 mt-2">
          <div
            class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
            @click="goToReading"
          >
            <span class="text-base text-primary">Reading</span>
          </div>
          <div
            class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
            @click="goToListening"
          >
            <span class="text-base text-white">Listening</span>
          </div>
        </div>
      </template>
    </ConfirmModal>
  </div>
  <!-- test level to update  blog -->
  <div class="mt-10">
    <ButtonBack title="Test level to open blog" @back="changeBack" />
    <div class="flex w-full mt-5 justify-between">
      <div
        class="h-10 leading-10 text-primary_black text-left font-semibold text-base w-1/4"
      >
        Name course
      </div>
      <input
        ref="errorInputName"
        v-model="createName1"
        type="text"
        class="input-type-course border rounded-lg form-control"
        spellcheck="false"
      />
    </div>
    <div class="flex w-full mt-5 justify-between">
      <div
        class="h-10 leading-10 text-primary_black text-left font-semibold text-base w-1/4"
      >
        Title
      </div>
      <input
        ref="errorInputSubtitle"
        v-model="createTitle1"
        type="text"
        class="input-type-course border rounded-lg form-control"
        spellcheck="false"
      />
    </div>
    <div class="flex w-full mt-5 justify-between">
      <div
        class="h-10 leading-10 text-primary_black text-left font-semibold text-base w-1/4"
      >
        Level
      </div>
      <InputLevel
        external-class="w-full"
        :disabled="true"
        :selected-value-prop="createLevel1"
      />
    </div>
    <div class="flex w-full mt-5 gap-40 justify-center">
      <div
        class="cursor-pointer rounded-lg border-yellow-400 border w-24 text-center h-8 leading-8 hover:opacity-50"
        @click="handleUpdate1"
      >
        <span class="text-base text-yellow-400">Update</span>
      </div>
      <div
        class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
        @click="handleNext1"
      >
        <span class="text-base text-primary">Next</span>
      </div>
    </div>
    <ConfirmModal
      :showModal="modal1"
      @closeModal="closeModal1"
      @save="closeModal1"
      :showFooter="false"
      :widthCustom="500"
    >
      <template #icon>
        <img :src="ADMIN_COURSE" alt="" srcset="" class="h-10 w-10" />
      </template>
      <template #content>
        <div class="text-base flex gap-2 items-center my-3">
          <p class="font-semibold text-xl m-0">Reading</p>
          or
          <p class="font-semibold text-xl m-0">Listening</p>
        </div>
      </template>
      <template #select>
        <div class="flex gap-10 mt-2">
          <div
            class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
            @click="goToReading1"
          >
            <span class="text-base text-primary">Reading</span>
          </div>
          <div
            class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
            @click="goToListening1"
          >
            <span class="text-base text-white">Listening</span>
          </div>
        </div>
      </template>
    </ConfirmModal>
  </div>
  <!-- test level advanced to open func create course -->
  <div class="mt-10">
    <ButtonBack title="Test level to open creating course" />
    <div class="flex w-full mt-5 justify-between">
      <div
        class="h-10 leading-10 text-primary_black text-left font-semibold text-base w-1/4"
      >
        Name course
      </div>
      <input
        ref="errorInputName"
        v-model="createName2"
        type="text"
        class="input-type-course border rounded-lg form-control"
        spellcheck="false"
      />
    </div>
    <div class="flex w-full mt-5 justify-between">
      <div
        class="h-10 leading-10 text-primary_black text-left font-semibold text-base w-1/4"
      >
        Title
      </div>
      <input
        ref="errorInputSubtitle"
        v-model="createTitle2"
        type="text"
        class="input-type-course border rounded-lg form-control"
        spellcheck="false"
      />
    </div>
    <div class="flex w-full mt-5 justify-between">
      <div
        class="h-10 leading-10 text-primary_black text-left font-semibold text-base w-1/4"
      >
        Level
      </div>
      <InputLevel
        external-class="w-full"
        :disabled="true"
        :selected-value-prop="createLevel2"
      />
    </div>
    <div class="flex w-full mt-5 gap-40 justify-center">
      <div
        class="cursor-pointer rounded-lg border-yellow-400 border w-24 text-center h-8 leading-8 hover:opacity-50"
        @click="handleUpdate2"
      >
        <span class="text-base text-yellow-400">Update</span>
      </div>
      <div
        class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
        @click="handleNext2"
      >
        <span class="text-base text-primary">Next</span>
      </div>
    </div>
    <ConfirmModal
      :showModal="modal2"
      @closeModal="closeModal2"
      @save="closeModal2"
      :showFooter="false"
      :widthCustom="500"
    >
      <template #icon>
        <img :src="ADMIN_COURSE" alt="" srcset="" class="h-10 w-10" />
      </template>
      <template #content>
        <div class="text-base flex gap-2 items-center my-3">
          <p class="font-semibold text-xl m-0">Reading</p>
          or
          <p class="font-semibold text-xl m-0">Listening</p>
        </div>
      </template>
      <template #select>
        <div class="flex gap-10 mt-2">
          <div
            class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
            @click="goToReading2"
          >
            <span class="text-base text-primary">Reading</span>
          </div>
          <div
            class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
            @click="goToListening2"
          >
            <span class="text-base text-white">Listening</span>
          </div>
        </div>
      </template>
    </ConfirmModal>
  </div>
</template>

<script>
import {
  ARROW_LEFT,
  AVATAR,
  LOCK_COLOR,
  ADMIN_COURSE,
} from '../../../constants/image';
import { NOTIFY, NOTIFY_MESSAGE, SCREEN } from '../../../constants/index';
import ButtonBack from '../../../components/common/ButtonBack.vue';
import InputLevel from '../../../components/common/InputLevel2.vue';
import ConfirmModal from '../../../components/admin/ConfirmModal.vue';
import courseApi from '../../../apis/course';
import { notification } from 'ant-design-vue';
export default {
  name: 'Member',
  components: { ButtonBack, InputLevel, ConfirmModal },
  created() {
    this.ADMIN_COURSE = ADMIN_COURSE;
    this.LOCK_COLOR = LOCK_COLOR;
    this.AVATAR = AVATAR;
    this.ARROW_LEFT = ARROW_LEFT;
    this.NOTIFY = NOTIFY;
    this.SCREEN = SCREEN;
    this.userInfor = JSON.parse(localStorage.getItem('user'));
    this.getAllCoursePending();
  },
  methods: {
    /**
     * get all course pending
     */
    async getAllCoursePending() {
      try {
        this.emitter.emit('isShowLoading', true);
        const data = await courseApi.allCourse();
        data.forEach((item) => {
          if (item?.courseLevel == 'PENDING') {
            if (item.id == 1) {
              this.checkData = true;
              this.createName = this.checkData ? item?.name : '';
              this.createTitle = this.checkData ? item?.description : '';
              this.idCourseTest = this.checkData ? item?.id : '';
              localStorage.setItem('IDCourseTestLevel', this.idCourseTest);
            } else if (item.id == 152) {
              this.checkData1 = true;
              this.createName1 = this.checkData1 ? item?.name : '';
              this.createTitle1 = this.checkData1 ? item?.description : '';
              this.idCourseTest1 = this.checkData1 ? item?.id : '';
              localStorage.setItem('IDCourseTestLevelBlog', this.idCourseTest1);
            } else {
              this.checkData2 = true;
              this.createName2 = this.checkData2 ? item?.name : '';
              this.createTitle2 = this.checkData2 ? item?.description : '';
              this.idCourseTest2 = this.checkData2 ? item?.id : '';
              localStorage.setItem(
                'IDCourseTestLevelAdvanced',
                this.idCourseTest2,
              );
            }
          }
        });
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    /**
     * create course pending
     */
    async creatCoursePending() {
      try {
        this.emitter.emit('isShowLoading', true);
        await courseApi.createCourse({
          name: this.createName,
          description: this.createTitle,
          courseLevel: 0,
          colorCode: '#ccc',
          creatorUserid: {
            uid: this.userInfor.email,
          },
        });
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      } finally {
        await this.handleAprroved();
      }
    },
    /**
     * create course pending
     */
    async creatCoursePending1() {
      try {
        this.emitter.emit('isShowLoading', true);
        await courseApi.createCourse({
          name: this.createName1,
          description: this.createTitle1,
          courseLevel: 0,
          colorCode: '#ccc',
          creatorUserid: {
            uid: this.userInfor.email,
          },
        });
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      } finally {
        await this.handleAprroved1();
      }
    },
    /**
     * create course pending
     */
    async creatCoursePending2() {
      try {
        this.emitter.emit('isShowLoading', true);
        await courseApi.createCourse({
          name: this.createName2,
          description: this.createTitle2,
          courseLevel: 0,
          colorCode: '#ccc',
          creatorUserid: {
            uid: this.userInfor.email,
          },
        });
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      } finally {
        await this.handleAprroved2();
      }
    },
    /**
     * approve
     */
    async handleAprroved() {
      try {
        this.emitter.emit('isShowLoading', true);
        await courseApi.approvedCourse({ id: this.idCourseTest });
      } catch (error) {
        this.emitter.emit('isShowLoading', false);
        console.log(error);
      } finally {
        await this.getAllCoursePending();
      }
    },

    /**
     * approve
     */
    async handleAprroved1() {
      try {
        this.emitter.emit('isShowLoading', true);
        await courseApi.approvedCourse({ id: this.idCourseTest1 });
      } catch (error) {
        this.emitter.emit('isShowLoading', false);
        console.log(error);
      } finally {
        await this.getAllCoursePending();
      }
    },
    /**
     * approve
     */
    async handleAprroved2() {
      try {
        this.emitter.emit('isShowLoading', true);
        await courseApi.approvedCourse({ id: this.idCourseTest2 });
      } catch (error) {
        this.emitter.emit('isShowLoading', false);
        console.log(error);
      } finally {
        await this.getAllCoursePending();
      }
    },
    goToListening() {
      this.$router.push({ name: 'TestLevelListening' });
      this.modal = false;
    },
    goToReading() {
      this.$router.push({ name: 'TestLevelReading' });
      this.modal = false;
    },
    goToListening1() {
      this.$router.push({ name: 'TestLevelListeningBlog' });
      this.modal1 = false;
    },
    goToReading1() {
      this.$router.push({ name: 'TestLevelReadingBlog' });
      this.modal1 = false;
    },

    goToListening2() {
      this.$router.push({ name: 'TestLevelListeningAdvanced' });
      this.modal1 = false;
    },
    goToReading2() {
      this.$router.push({ name: 'TestLevelReadingAdvanced' });
      this.modal1 = false;
    },
    closeModal() {
      this.modal = false;
    },
    closeModal1() {
      this.modal1 = false;
    },
    closeModal2() {
      this.modal1 = false;
    },
    async handleUpdate() {
      try {
        this.emitter.emit('isShowLoading', true);
        await courseApi.updateCourse({
          id: this.idCourseTest,
          name: this.createName,
          description: this.createTitle,
          color: '#ccc',
          courseLevel: 0,
          creatorUserid: {
            uid: this.userInfor.email,
          },
        });
        this.emitter.emit('isShowLoading', false);
        notification.success({ message: NOTIFY_MESSAGE.UPDATE_SUCCESS });
      } catch (error) {
        console.log(error);
        notification.success({ message: NOTIFY_MESSAGE.UPDATE_FAILED });
      }
    },
    async handleUpdate1() {
      try {
        this.emitter.emit('isShowLoading', true);
        await courseApi.updateCourse({
          id: this.idCourseTest1,
          name: this.createName1,
          description: this.createTitle1,
          color: '#ccc',
          courseLevel: 0,
          creatorUserid: {
            uid: this.userInfor.email,
          },
        });
        this.emitter.emit('isShowLoading', false);
        notification.success({ message: NOTIFY_MESSAGE.UPDATE_SUCCESS });
      } catch (error) {
        console.log(error);
        notification.success({ message: NOTIFY_MESSAGE.UPDATE_FAILED });
      }
    },

    async handleUpdate2() {
      try {
        this.emitter.emit('isShowLoading', true);
        await courseApi.updateCourse({
          id: this.idCourseTest2,
          name: this.createName2,
          description: this.createTitle2,
          color: '#ccc',
          courseLevel: 0,
          creatorUserid: {
            uid: this.userInfor.email,
          },
        });
        this.emitter.emit('isShowLoading', false);
        notification.success({ message: NOTIFY_MESSAGE.UPDATE_SUCCESS });
      } catch (error) {
        console.log(error);
        notification.success({ message: NOTIFY_MESSAGE.UPDATE_FAILED });
      }
    },
    handleNext() {
      this.modal = true;
      if (!this.checkData) {
        this.creatCoursePending();
      }
    },

    handleNext1() {
      this.modal1 = true;
      if (!this.checkData1) {
        this.creatCoursePending1();
      }
    },

    handleNext2() {
      this.modal2 = true;
      if (!this.checkData2) {
        this.creatCoursePending2();
      }
    },
  },
  data() {
    return {
      checkChange: false,
      idCourseTest: null,
      idCourseTest1: null,
      idCourseTest2: null,
      userInfor: null,
      checkData: false,
      checkData1: false,
      checkData2: false,
      modal: false,
      createTitle: '',
      createName: '',
      createLevel: 'Pending',
      modal1: false,
      createTitle1: '',
      createName1: '',
      createLevel1: 'Pending',
      modal2: false,
      createTitle2: '',
      createName2: '',
      createLevel2: 'Pending',
    };
  },
};
</script>

<style lang="scss"></style>
