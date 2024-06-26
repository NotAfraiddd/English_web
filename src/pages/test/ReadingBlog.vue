<template>
  <div class="mx-2 mt-6">
    <ButtonBack
      title="Reading Test Level Blog"
      extend-class="mb-5"
      @back="handleBack"
      :hide-back="true"
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
    <div class="flex items-center flex-wrap mt-5 gap-5">
      <ButtonBack title="Read the passage above and choose the correct" />
      <div
        v-if="
          userInfor.role == 'ADMIN' && isMatchedRoute('TestLevelReadingBlog')
        "
        class="h-6 border-orange border rounded-xl flex items-center"
      >
        <div
          class="text-primary_black hover:underline cursor-pointer mx-3"
          @click="showModalMuilti"
        >
          Correct Answers
        </div>
      </div>
    </div>
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
          class="cursor-pointer font-semibold rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="goToEdit"
        >
          <span class="text-base text-primary">Edit</span>
        </div>
        <div
          @click="handleTest"
          class="cursor-pointer font-semibold rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
        >
          Test
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
    :showModal="modalMuilti"
    @closeModal="closeModalMuilti"
    @save="closeModalMuilti"
    :showFooter="false"
    :widthCustom="300"
  >
    <template #content>
      <div class="w-full text-center text-xl text-primary">Correct Answers</div>
      <div v-for="(item, index) in correctAnswer" :key="index" class="w-full">
        <div class="text-base flex w-full justify-between mt-3">
          <div>Answers {{ index + 1 }} is</div>
          <div class="text-orange">{{ item }}</div>
        </div>
      </div>
    </template>
  </ConfirmModal>
</template>
<script>
import ButtonBack from '../../components/common/ButtonBack.vue';
import MultipleChoice from '../../components/common/MultipleChoice.vue';
import {
  ARROW_LEFT,
  MOUNTAIN_CLIMB,
  CONGRATULATION,
  WARNING,
  RELOAD,
} from '../../constants/image';
import { mapState, mapMutations } from 'vuex';
import userApi from '../../apis/user';
import courseApi from '../../apis/course';
import { notification } from 'ant-design-vue';
import ConfirmModal from '../../components/admin/ConfirmModal.vue';
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
    this.idCourse = JSON.parse(localStorage.getItem('IDCourseTestLevelBlog'));
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
    ...mapState('auth', ['error']),
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
        else this.$router.push({ name: 'TestLevelReadingBlogCreate' });
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
          this.correctAnswer.push(+item.correctAnswer);
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
        name: 'TestLevelReadingBlogUpdate',
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
    handleTest() {
      if (!this.submitMultipleChoice) {
        this.errorsMultiple = [];
        for (let i = 0; i < this.dataMultipleChoice.length; i++) {
          if (
            this.compareMultiple(this.correctAnswer[i], this.myAnswer[i]) ==
            false
          ) {
            this.errorsMultiple.push(this.dataMultipleChoice[i].id);
          }
        }
        this.submitMultipleChoice = true;
      }
      if (this.errorsMultiple.length == 0) {
        notification.success({ message: 'Success' });
      } else notification.warning({ message: 'Failed' });
    },
    handleSubmit() {
      // MultipleChoice
      if (!this.submitMultipleChoice) {
        this.errorsMultiple = [];
        for (let i = 0; i < this.dataMultipleChoice.length; i++) {
          if (
            this.compareMultiple(this.correctAnswer[i], this.myAnswer[i]) ==
            false
          ) {
            this.errorsMultiple.push(this.dataMultipleChoice[i].id + 1);
          }
        }
        this.submitMultipleChoice = true;
      }
      if (this.submitMultipleChoice) {
        this.$nextTick(() => {
          this.numberErrors = +localStorage.getItem('error');
          this.modalNotifyLevel = true;
        });
      }
    },
    /**
     * show modal
     */
    showModalMuilti() {
      this.modalMuilti = true;
    },
    /**
     * close modal
     */
    closeModalMuilti() {
      this.modalMuilti = false;
    },
    isMatchedRoute(routeName) {
      return this.$route.matched.some(({ name }) => {
        return name == routeName;
      });
    },
  },
  data() {
    return {
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
      modalMuilti: false,
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
