<template>
  <div class="mx-2 mt-6">
    <ButtonBack
      title="Reading Test Level Intermediate"
      extend-class="mb-5"
      @back="handleBack"
    />
    <div class="flex items-center w-full">
      <div class="bg-primary_line course-line w-full" />
      <div class="text-lg text-primary_black font-semibold w-full">
        Reading Test Blog
      </div>
      <div class="bg-primary_line course-line w-full" />
    </div>
    <div class="detail-field mx-auto mt-5">
      <div
        class="detail-image border-gray-100 border-t-0 border ml-2 mr-10"
        :style="{ backgroundImage: 'url(' + imgURL || MOUNTAIN_CLIMB + ')' }"
      />
    </div>
    <ButtonBack title="Reading text" extend-class="mt-5" />
    <div class="text-left detail-text mt-5" v-html="textContent" />
    <ButtonBack
      title="Read the passage above and choose the correct"
      extend-class="mt-5"
    />
    <div class="px-5 pb-2 mt-5 detail-multiple-choice">
      <MultipleChoice
        :data="dataMultipleChoice"
        @setValue="getAnswerMultichoice"
        :correctAnswer="correctAnswer"
        :errors="errorsMultiple"
        :submit-prop="submitMultipleChoice"
      />
    </div>
    <div class="flex justify-center gap-20 items-center py-5 text-base">
      <div class="flex gap-20 items-center">
        <div
          @click="handleSubmit"
          class="cursor-pointer font-semibold rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
        >
          Submit
        </div>
        <img
          :src="RELOAD"
          alt=""
          class="w-5 h-5 rotate-transition"
          @click="resetResult"
          :style="{ transform: 'rotate(' + rotation + 'deg)' }"
        />
      </div>
    </div>
  </div>
  <ConfirmModal
    :showModal="modalSubmit"
    @closeModal="closeModalSubmit"
    @save="closeModalSubmit"
    :showFooter="false"
    :widthCustom="550"
  >
    <template #icon>
      <img :src="WARNING" alt="" srcset="" class="h-10 w-10" />
    </template>
    <template #content>
      <div class="text-primary_black my-2 text-center">
        Please check again, you cannot do it again if you select
        <b>'Next to reading'</b>
      </div>
    </template>
    <template #select>
      <div class="flex gap-10 mt-2">
        <div
          class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="closeModalNextReading"
        >
          <span class="text-base text-primary">Cancel</span>
        </div>
        <div
          class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="goToNextReading"
        >
          <span class="text-base text-white">OK</span>
        </div>
      </div>
    </template>
  </ConfirmModal>
</template>
<script>
import ButtonBack from '../../../components/common/ButtonBack.vue';
import MultipleChoice from '../../../components/common/MultipleChoice.vue';
import {
  ARROW_LEFT,
  MOUNTAIN_CLIMB,
  CONGRATULATION,
  WARNING,
  RELOAD,
} from '../../../constants/image';
import { mapState, mapMutations } from 'vuex';
import userApi from '../../../apis/user';
import courseApi from '../../../apis/course';
import { notification } from 'ant-design-vue';
import ConfirmModal from '../../../components/admin/ConfirmModal.vue';
export default {
  name: 'ReadingTest',
  components: { ButtonBack, MultipleChoice, ConfirmModal },
  created() {
    this.RELOAD = RELOAD;
    this.WARNING = WARNING;
    this.CONGRATULATION = CONGRATULATION;
    this.ARROW_LEFT = ARROW_LEFT;
    this.MOUNTAIN_CLIMB = MOUNTAIN_CLIMB;
    this.userInfor = JSON.parse(localStorage.getItem('user'));
    this.idCourse = this.$route.params.id;
    if (this.idCourse) {
      this.getAllReading();
    }
  },
  watch: {
    listAnswers() {
      this.errorsMatching = [];
    },
  },
  computed: {
    ...mapState('member', ['hasErrorListeningAdvanced']),
  },
  methods: {
    /**
     * get all session
     * @param {*} dataID
     */
    async getAllReading() {
      try {
        this.emitter.emit('isShowLoading', true);
        const arrAPI = await courseApi.getAllReadingSession({
          id: this.idCourse,
        });

        this.listReading = [];
        arrAPI.forEach((item, index) => {
          if (index == 0) {
            this.listReading.push({
              id: item?.id,
              title: item?.title,
              subTitle: item?.description,
              status: item?.sectionStatus == 'PENDING' ? true : false,
            });
            this.idSection = item.id;
          }
        });
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      } finally {
        if (this.idSection) await this.getDetailSession();
        else this.$router.push({ name: 'TestLevelReadingAdvancedCreate' });
      }
    },
    /**
     * get detail session
     */
    async getDetailSession() {
      try {
        this.emitter.emit('isShowLoading', true);
        const detailSession = await courseApi.getReadingSessionByID({
          id: this.idSection,
        });
        this.title = detailSession?.title;
        this.textContent = detailSession?.textContent;
        this.imgURL = detailSession?.imgURL;
        detailSession?.questionList.forEach((item, index) => {
          this.dataMultipleChoice.push({
            id: index + 1,
            title: item.questionContent,
            question: item.options.map((item) => item.content),
          });
          this.correctAnswer.push(+item.correctAnswer + 1);
        });
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    handleBack() {
      this.$router.push({ name: 'Test' });
    },
    goToEdit() {
      this.$router.push({
        name: 'TestLevelReadingAdvancedUpdate',
        params: { id: this.idSection },
      });
    },
    resetResult() {
      this.myAnswer = [];
      this.errorsMultiple = [];
      this.numberErrors = 0;
      this.submitMultipleChoice = false;
      this.rotation += 360;
    },
    acceptShowModal() {
      this.modalNotifyLevel = false;
      this.$router.push({ name: 'HomeUser' });
    },
    cancelHideModal() {
      this.modalNotifyLevel = false;
    },
    acceptShowModalBack() {
      if (this.modalBack) {
        this.$router.push({ name: 'ListeningTest' });
        this.modalBack = false;
      }
    },
    cancelHideModalBack() {
      this.modalBack = false;
    },
    closeModalNotifyLevel() {
      this.modalNotifyLevel = false;
    },
    onBack() {
      this.modalBack = true;
    },
    getAnswerMultichoice(data) {
      this.myAnswer = data;
    },
    compareMultiple(valueA, valueB) {
      return JSON.stringify(valueA) === JSON.stringify(valueB);
    },
    async handleSubmit() {
      let errorMulti = 0;
      if (!this.submitMultipleChoice) {
        this.errorsMultiple = [];
        for (let i = 0; i < this.dataMultipleChoice.length; i++) {
          if (!this.compareMultiple(this.correctAnswer[i], this.myAnswer[i])) {
            errorMulti++;
          }
        }
        this.submitMultipleChoice = true;
      }
      if (errorMulti == 0 && !this.hasErrorListening) {
        if (this.userInfor.level == 'BEGINNER') {
          await userApi.updateLevel({
            user: {
              uid: this.userInfor.email,
            },
            level: 2,
          });
          notification.success({
            message: 'Congratulations !!! Your level upgrade to intermediate',
          });
        } else
          notification.warning({
            message: `Your level is ${this.userInfor.level}`,
          });
      } else notification.warning({ message: 'Failed' });
    },
    closeModalSubmit() {
      this.modalSubmit = false;
      this.submitMultipleChoice = false;
    },
  },
  data() {
    return {
      modalSubmit: false,
      listReading: [],
      idCourse: null,
      title: null,
      textContent: null,
      imgURL: null,
      idSection: null,
      checkData: false,
      rotation: 0,
      userInfor: null,
      modalBack: false,
      modalNotifyLevel: false,
      numberErrors: 0,
      submitMultipleChoice: false,
      errorsMultiple: [],
      myAnswer: [],
      correctAnswer: [],
      dataMultipleChoice: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.course-line {
  height: 1px;
}
.detail {
  &-field {
    height: 510px;
    object-fit: contain;
  }
  &-image {
    height: 500px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 20px;
    border: 1px solid #eae4e4;
    box-shadow: -4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
  &-multiple-choice {
    border-radius: 15px;
    border: 1px solid #eae4e4;
    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
  &-text {
    padding: 12px;
    border-radius: 20px;
    border: 1px solid #eae4e4;
    box-shadow: -4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
}
.rotate-transition {
  transition: transform 1s ease-in-out;
}
</style>
