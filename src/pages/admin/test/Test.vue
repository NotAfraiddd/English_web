<template>
  <ButtonBack title="Test level" @back="changeBack" />
  <div>
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
        :selectedValueProp="createLevel"
        @update="updateLevel"
      />
    </div>
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
</template>

<script>
import {
  ARROW_LEFT,
  AVATAR,
  LOCK_COLOR,
  GARBAGE,
  ADMIN_COURSE,
} from '../../../constants/image';
import { NOTIFY, SCREEN } from '../../../constants/index';
import ButtonBack from '../../../components/common/ButtonBack.vue';
import InputLevel from '../../../components/common/InputLevel2.vue';
import ConfirmModal from '../../../components/admin/ConfirmModal.vue';
import courseApi from '../../../apis/course';
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
            this.checkData = true;
            this.createName = this.checkData ? item?.name : '';
            this.createTitle = this.checkData ? item?.description : '';
            this.idCourseTest = this.checkData ? item?.id : '';
            localStorage.setItem('IDCourseTestLevel', this.idCourseTest);
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
    goToListening() {
      this.$router.push({ name: 'TestLevelListening' });
      this.modal = false;
    },
    goToReading() {
      this.$router.push({ name: 'TestLevelReading' });
      this.modal = false;
    },
    closeModal() {
      this.modal = false;
    },
    updateModal() {},
    updateLevel(data) {
      console.log(data);
    },
    handleUpdate() {},
    handleNext() {
      this.modal = true;
      if (!this.checkData) {
        this.creatCoursePending();
      }
    },
  },
  data() {
    return {
      idCourseTest: null,
      userInfor: null,
      checkData: false,
      modal: false,
      createTitle: '',
      createName: '',
      createLevel: 'Pending',
    };
  },
};
</script>

<style lang="scss"></style>
