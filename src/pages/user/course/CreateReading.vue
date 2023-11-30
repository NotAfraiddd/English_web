<template>
  <div class="create-course">
    <!-- Reading -->
    <div>
      <ButtonBack
        title="Create Session Reading"
        hide-back="true"
        @back="changeBack"
      />
      <ImageUpload
        :src-img="avatar"
        extend-class="w-96 h-96"
        extend-class-icon="icon-remove"
        @update="updateAvatar"
      />
      <div class="flex w-full gap-10">
        <div class="flex mt-5 items-center w-1/2">
          <div
            class="my-auto text-primary_black text-left font-semibold text-base create-course__subtitle"
          >
            <div class="flex gap-2">
              Title
              <img :src="STAR_RED" alt="" srcset="" class="w-2 h-2 my-auto" />
            </div>
          </div>
          <input
            v-model="createTitle"
            type="text"
            class="input-type-course border rounded-lg form-control h-8"
            spellcheck="false"
            ref="errorInputTitle"
          />
        </div>
        <div class="flex mt-5 items-center w-1/4">
          <div
            class="my-auto text-primary_black text-left font-semibold text-base create-course__subtitle"
          >
            <div class="flex gap-2">Level</div>
          </div>
          <InputLevel
            external-class="w-52 flex mr-auto w-full"
            :selectedValueProp="inputLevel"
            @update="updateLevel"
            :disabled="true"
          />
        </div>
      </div>
      <div class="flex mt-5">
        <div
          class="my-auto text-primary_black text-left font-semibold text-base create-course__subtitle"
        >
          Subtitle
        </div>
        <input
          v-model="createSubtitle"
          type="text"
          class="input-type-course border rounded-lg form-control h-8 mr-5"
          spellcheck="false"
          ref="errorInputTitle"
        />
      </div>
      <ButtonBack title="Reading text" extend-class="mt-5" />
      <Word :contentProp="contentReading" @update="updateContentReading" />
      <ButtonBack
        title="Read the passage above and choose the correct ( 9 questions )"
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
    <div class="flex text-base gap-20 justify-center mt-10">
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
    this.namePath = this.$route.params.course;
    this.idCourse = JSON.parse(localStorage.getItem('IDCourse'));
    this.inputLevel = JSON.parse(localStorage.getItem('IDCourse'));
  },
  watch: {
    createTitle() {
      this.$refs.errorInputTitle.classList.remove('border-red-500');
    },
  },
  methods: {
    updateAvatar(data) {
      this.avatar = data;
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
          this.dataQuestionReading.length == 9 &&
          this.dataQuestionReadingCorrect.length == 9 &&
          this.createTitle
        ) {
          this.emitter.emit('isShowLoading', true);
          await courseApi.createReadingSession({
            description: this.createSubtitle,
            textContent: this.contentReading,
            title: this.createTitle,
            course: {
              id: this.idCourse,
            },
            questionList: this.questionList,
          });
          this.emitter.emit('isShowLoading', false);
          notification.success({ message: NOTIFY_MESSAGE.CREATE_SUCCESS });
          this.$router.push({
            name: 'ListCourseReading',
            params: { name: this.namePath },
          });
        } else if (this.dataQuestionReading.length != 9) {
          notification.error({ message: NOTIFY_MESSAGE.ADD_QUESTION_9 });
        }
        if (
          this.dataQuestionReadingCorrect.length != 9 &&
          this.dataQuestionReading.length == 9
        ) {
          notification.error({
            message: 'The answers has not been filled in yet',
          });
        }
        if (!this.createTitle)
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
      this.$router.push({
        name: 'ListCourseReading',
        params: { name: this.namePath },
      });
    },
    changeBack() {
      this.$router.push({
        name: 'ListCourseReading',
        params: { name: this.namePath },
      });
    },
    addQuestionReading() {
      if (this.$route.name != 'UserCreateCourseReading') {
        if (this.dataQuestionReading.length <= 5)
          this.dataQuestionReading.push({
            title: '',
            answers: [],
          });
        else notification.error({ message: NOTIFY_MESSAGE.ADD_QUESTION });
      } else {
        if (this.dataQuestionReading.length <= 8)
          this.dataQuestionReading.push({
            title: '',
            answers: [],
          });
        else notification.error({ message: NOTIFY_MESSAGE.ADD_QUESTION_9 });
      }
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
      idCourse: null,
      questionList: [],
      namePath: null,
      avatar: AVATAR,
      createTitle: null,
      createSubtitle: null,
      showModalCreateCourse: false,
      inputLevel: 1,
      checkName: false,
      contentReading: '',
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
