<template>
  <div class="create-course">
    <!-- Reading -->
    <div>
      <ButtonBack
        title="Reading Test Level Advanced"
        hide-back="true"
        @back="changeBack"
      />
      <div class="flex gap-10">
        <div class="flex mt-5 w-full items-center">
          <div class="flex create-course__title">
            <div
              class="my-auto text-primary_black text-left font-semibold text-base mr-2"
            >
              Title
            </div>
            <img :src="STAR_RED" alt="" srcset="" class="w-2 h-2 my-auto" />
          </div>
          <input
            type="text"
            v-model="title"
            class="w-full border rounded-lg form-control"
            spellcheck="false"
          />
        </div>
      </div>
      <div class="flex mt-5 items-center">
        <div
          class="my-auto text-primary_black text-left font-semibold text-base create-course__subtitle"
        >
          Subtitle
        </div>
        <input
          v-model="subTitle"
          type="text"
          class="w-full border rounded-lg form-control"
          spellcheck="false"
        />
      </div>
      <div class="flex mt-5 items-center">
        <div
          class="my-auto text-primary_black text-left font-semibold text-base create-course__subtitle"
        >
          Level
        </div>
        <InputLevel
          external-class="w-52 flex mr-auto w-full"
          :selectedValueProp="inputLevel"
          @update="updateLevel"
          :disabled="true"
        />
      </div>
      <ImageUpload
        :src-img="avatar"
        extend-class="w-96 h-96"
        extend-class-icon="icon-remove"
        @update="getAvatar"
      />

      <ButtonBack title="Reading text" extend-class="mt-5" />
      <Word :contentProp="contentReading" @update="updateContentReading" />
      <ButtonBack
        title="Read the passage above and choose the correct"
        extend-class="mt-5"
      />
      <AddAnswer
        :data-questions="dataQuestionReading"
        :correct-answers="dataQuestionReadingCorrect"
        @subtract="subtractQuestionReading"
      />
      <div class="flex items-center gap-5">
        <div
          @click="addQuestionReading"
          class="bg-primary w-max px-2 py-1 mt-3 cursor-pointer text-white text-lg rounded-xl font-semibold"
        >
          Add Question
        </div>
      </div>
    </div>
    <div class="border-t border-primary_line mt-5" />
    <div class="flex justify-center gap-20 mt-5 text-base">
      <div
        @click="createOrUpdate"
        class="cursor-pointer rounded-lg bg-primary w-40 text-center h-8 leading-8 hover:opacity-50"
      >
        Create/Update
      </div>
    </div>
  </div>
  <!-- modal create -->
  <ConfirmModal
    :showModal="showModalCreateCourse"
    @closeModal="closeModalCreate"
    @save="closeModalCreate"
    :showFooter="false"
    :widthCustom="850"
  >
    <template #content>
      <div class="w-full text-center text-xl opacity-90">
        Are you sure you created this
        <b>Reading course</b>
        ?
      </div>
    </template>
    <template #select>
      <div class="flex justify-between items-center mt-3 gap-40">
        <div class="flex gap-10 mt-4">
          <div
            class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
            @click="closeModalCreate"
          >
            <span class="text-base text-primary">Cancel</span>
          </div>
          <div
            class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
            @click="createCourseNext"
          >
            <span class="text-base text-white">Create</span>
          </div>
        </div>
      </div>
    </template>
  </ConfirmModal>
</template>
<script>
import ButtonBack from '../../../components/common/ButtonBack.vue';
import ImageUpload from '../../../components/common/ImageUpload.vue';
import Word from '../../../components/common/Editor.vue';
import AddAnswer from '../../../components/common/AddAnswer.vue';
import { STAR_RED, AVATAR } from '../../../constants/image';
import { NOTIFY_MESSAGE } from '../../../constants/index';
import { notification } from 'ant-design-vue';
import InputLevel from '../../../components/common/InputLevel2.vue';
import ConfirmModal from '../../../components/admin/ConfirmModal.vue';
import courseApi from '../../../apis/course';
import fileAPI from '../../../apis/file';

export default {
  name: 'CreateCourseReading',
  components: {
    ButtonBack,
    Word,
    AddAnswer,
    ImageUpload,
    InputLevel,
    ConfirmModal,
  },
  created() {
    this.NOTIFY_MESSAGE = NOTIFY_MESSAGE;
    this.AVATAR = AVATAR;
    this.STAR_RED = STAR_RED;
    this.idCourse = JSON.parse(
      localStorage.getItem('IDCourseTestLevelAdvanced'),
    );
    this.idSection = +this.$route.params.id;
    if (this.idCourse) {
      this.getDetailSectionByID();
    }
  },

  methods: {
    getAvatar(data, fileImg) {
      this.avatar = data;
      this.file = fileImg;
    },
    /**
     * get detail session
     */
    async getDetailSectionByID() {
      try {
        this.emitter.emit('isShowLoading', true);
        const detailSession = await courseApi.getReadingSessionByID({
          id: this.idSection,
        });
        this.title = detailSession?.title;
        this.subTitle = detailSession?.description;
        this.contentReading = detailSession?.textContent;
        this.avatar = detailSession?.imgURL;
        this.dataQuestionReadingCorrect = [];
        this.dataQuestionReading = [];
        detailSession?.questionList.forEach((item, index) => {
          this.dataQuestionReading.push({
            id: index + 1,
            title: item.questionContent,
            answers: item.options.map((item) => item.content),
          });

          this.dataQuestionReadingCorrect.push(+item.correctAnswer);
        });
        this.noData = true;
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    // level
    updateLevel(e) {
      this.inputLevel = e;
    },
    showModalCreate() {
      this.showModalCreateCourse = true;
    },
    closeModalCreate() {
      this.showModalCreateCourse = false;
    },
    createCourseNext() {
      notification.success({ message: NOTIFY_MESSAGE.CREATE_SUCCESS });
      this.showModalCreateCourse = false;
    },
    updateContentReading(data) {
      this.contentReading = data;
    },
    checkQuestions() {
      this.questionList = [];
      this.dataQuestionReading.forEach((questionData, index) => {
        const questionObject = {
          questionContent: questionData.title,
          correctAnswer: this.dataQuestionReadingCorrect[index] + 1,
          options: questionData.answers.map((answer) => ({
            content: answer,
          })),
        };
        this.questionList.push(questionObject);
      });
    },
    async createOrUpdate() {
      this.dataQuestionReading = this.dataQuestionReading.filter(
        (item, index) => index === 0 || item.title !== '',
      );
      this.checkQuestions();
      try {
        if (
          this.dataQuestionReadingCorrect.length != 0 &&
          this.dataQuestionReading.length != 0 &&
          this.contentReading
        ) {
          if (this.title) {
            this.emitter.emit('isShowLoading', true);
            if (this.file) {
              let formData = new FormData();
              formData.append('file', this.file);
              this.avatar = await fileAPI.updateImg(formData);
            }
            if (!this.noData) {
              await courseApi.createReadingSession({
                description: this.subTitle,
                textContent: this.contentReading,
                title: this.title,
                imgURL: this.avatar,
                course: {
                  id: this.idCourse,
                },
                questionList: this.questionList,
              });
              this.$router.push({ name: 'TestLevelReadingAdvanced' });
              this.emitter.emit('isShowLoading', false);
              notification.success({ message: NOTIFY_MESSAGE.CREATE_SUCCESS });
            } else {
              await courseApi.updateReadingSession({
                id: this.idSection,
                description: this.subTitle,
                textContent: this.contentReading,
                title: this.title,
                imgURL: this.avatar,
                course: {
                  id: this.idCourse,
                },
                questionList: this.questionList,
              });
              this.emitter.emit('isShowLoading', false);
              notification.success({ message: NOTIFY_MESSAGE.UPDATE_SUCCESS });
            }
          } else {
            notification.error({ message: 'Title has not been filled in yet' });
          }
        }
        if (
          this.dataQuestionReadingCorrect.length == 0 &&
          this.dataQuestionReading.length == 0
        ) {
          notification.error({ message: NOTIFY_MESSAGE.ADD_QUESTION_MIN });
        }
        if (
          this.dataQuestionReadingCorrect.length !=
          this.dataQuestionReading.length
        ) {
          notification.error({
            message: 'The answers or questions has not been filled in yet',
          });
        }
        if (!this.contentReading) {
          notification.error({
            message: 'The reading passage is not available yet',
          });
        }
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
        notification.error({ message: NOTIFY_MESSAGE.UPDATE_FAILED });
      }
    },
    cancelCreate() {
      this.$router.push({ name: 'CourseReading' });
    },
    changeBack() {
      this.$router.push({ name: 'TestLevelReadingAdvanced' });
    },
    addQuestionReading() {
      if (this.dataQuestionReading.length <= 9)
        this.dataQuestionReading.push({
          title: '',
          answers: [],
        });
      else notification.error({ message: NOTIFY_MESSAGE.ADD_QUESTION_10 });
    },
    subtractQuestionReading(data) {
      this.dataQuestionReading.splice(data, 1);
    },
    /**
     * Scroll to last
     */
    scrollToLast() {
      let element = document.querySelector('.create-course');
      if (element)
        $('.create-course').animate({ scrollTo: element.scrollHeight }, 0);
    },
  },
  computed: {},

  data() {
    return {
      noData: false,
      avatar: AVATAR,
      file: null,
      idSection: null,
      subTitle: null,
      idCourse: null,
      questionList: [],
      showModalCreateCourse: false,
      inputLevel: 1,
      contentReading: '',
      title: '',
      dataQuestionReading: [],
      dataQuestionReadingCorrect: [],
    };
  },
};
</script>

<style lang="scss">
.icon-remove {
  top: 2%;
  right: 35%;
  z-index: 1;
}
// color
.input-color {
  &:focus-visible {
    outline: none;
  }
}
.create-course {
  &__title,
  &__subtitle {
    width: fit-content;
    min-width: 150px;
  }
}
</style>
