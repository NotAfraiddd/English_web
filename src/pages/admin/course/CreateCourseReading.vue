<template>
  <div class="create-course">
    <!-- Reading -->
    <div>
      <ButtonBack
        title="Create Session Reading"
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
        :src-img="AVATAR"
        extend-class="w-96 h-96"
        :remove="true"
        extend-class-icon="icon-remove"
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
    <div v-if="!checkName" class="flex text-base gap-20 justify-center mt-10">
      <div
        @click="cancelCreate"
        class="border border-primary w-24 text-center h-8 leading-8 text-primary hover:opacity-70 rounded-lg cursor-pointer"
      >
        Cancel
      </div>
      <div
        @click="createCourse"
        class="cursor-pointer rounded-lg bg-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
      >
        Create
      </div>
    </div>
    <div v-else class="flex justify-center gap-20 mt-5 text-base">
      <div
        @click="showModalCreate"
        class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
      >
        Create
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
    if (this.$route.name == 'CreateCourseForAdvancedReading')
      this.checkName = true;
    this.idCourse = JSON.parse(localStorage.getItem('IDCourse'));
    this.inputLevel = JSON.parse(localStorage.getItem('IDCourse'));
  },

  methods: {
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
      this.dataQuestionReading.forEach((questionData, index) => {
        const questionObject = {
          questionContent: questionData.title,
          correctAnswer: this.dataQuestionReadingCorrect[index] + 1,
          options: questionData.answers.map((answer) => ({ content: answer })),
        };
        this.questionList.push(questionObject);
      });
    },
    async createCourse() {
      this.dataQuestionReading = this.dataQuestionReading.filter(
        (item, index) => index === 0 || item.title !== '',
      );
      this.checkQuestions();
      try {
        if (
          this.dataQuestionReading.length == 2 &&
          this.dataQuestionReadingCorrect.length == 2 &&
          this.title
        ) {
          this.emitter.emit('isShowLoading', true);
          await courseApi.createReadingSession({
            description: this.subTitle,
            textContent: this.contentReading,
            title: this.title,
            course: {
              id: this.idCourse,
            },
            questionList: this.questionList,
          });
          this.emitter.emit('isShowLoading', false);
          notification.success({ message: NOTIFY_MESSAGE.CREATE_SUCCESS });
          this.$router.push({
            name: 'CourseReading',
            params: { name: this.namePath },
          });
        } else if (this.dataQuestionReading.length != 2) {
          notification.error({ message: NOTIFY_MESSAGE.ADD_QUESTION_9 });
        }
        if (
          this.dataQuestionReadingCorrect.length != 2 &&
          this.dataQuestionReading.length == 2
        ) {
          notification.error({
            message: 'The answers has not been filled in yet',
          });
        }
        if (!this.title)
          notification.error({
            message: 'Title has not been filled in yet',
          });
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
        notification.error({ message: NOTIFY_MESSAGE.CREATE_FAILED });
      }
    },
    cancelCreate() {
      this.$router.push({ name: 'CourseReading' });
    },
    changeBack() {
      this.$router.push({ name: 'CourseReading' });
    },
    addQuestionReading() {
      if (this.dataQuestionReading.length <= 8)
        this.dataQuestionReading.push({
          title: '',
          answers: [],
        });
      else notification.error({ message: NOTIFY_MESSAGE.ADD_QUESTION_9 });
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
      subTitle: null,
      idCourse: null,
      questionList: [],
      showModalCreateCourse: false,
      inputLevel: 1,
      checkName: false,
      contentReading: '',
      title: '',
      dataQuestionReading: [
        {
          title: '',
          answers: [],
        },
      ],
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
