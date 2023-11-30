<template>
  <div class="create-course">
    <ButtonBack
      title="Create Session Listening"
      @back="changeBack"
      :hide-back="true"
    />
    <!-- title -->
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
      <Inputlevel
        external-class="w-52 flex mr-auto"
        :selectedValueProp="inputLevel"
        @update="updateLevel"
        :disabled="true"
      />
    </div>
    <!-- listening -->
    <ImageUpload
      :src-img="avatar"
      extend-class="w-96 h-96"
      extend-class-icon="icon-remove"
      @update="updateAvatar"
    />
    <Audio
      :data-prop="selectedAudio"
      :hide-choose="true"
      @valueAudio="handleGetValueAuio"
    />
    <ButtonBack title="Transcript" extend-class="mt-5" />
    <Word :contentProp="contentListening" @update="updateContentListening" />
    <ButtonBack
      title="Listen to the dialogue above and choose the correct answer ( only 11 questions )"
      extend-class="mt-5"
    />
    <AddAnswer
      :data-questions="dataQuestion"
      @subtract="subtractQuestion"
      :correct-answers="dataQuestionCorrect"
    />
    <div class="flex items-center gap-5">
      <div
        @click="addQuestion"
        class="bg-primary w-max px-2 py-1 mt-3 cursor-pointer text-white text-lg rounded-xl font-semibold"
      >
        Add Question
      </div>
    </div>
    <ButtonBack
      title="Listen to the dialogue above and match the beginnings and endings of the phrases ( only 5 questions )"
      extend-class="text-left mt-5"
    />
    <div class="text-primary_black font-semibold mt-2 text-left">Answers</div>
    <div class="flex gap-2 items-center w-full flex-wrap">
      <div
        v-for="(item, index) in numWords"
        :key="index"
        class="flex items-center"
      >
        <input
          type="text"
          :disabled="true"
          class="border w-10 h-10 rounded-lg text-center bg-table_header mr-2"
          :placeholder="index + 1"
        />
        <input
          type="text"
          v-model="word[index]"
          class="w-max border rounded-lg form-control text-center mr-2"
          spellcheck="false"
          @focus="setIsFocused(index)"
          @blur="setIsFocused(index)"
        />
        <div
          v-if="index == indexFocus && numWords > 1"
          @click="subtractWord(index)"
          class="ml-2 text-sm text-text_red cursor-pointer"
        >
          ( x )
        </div>
      </div>
      <div
        @click="addWord"
        class="bg-text_back w-7 h-7 rounded-full text-xl font-semibold text-gray-400 cursor-pointer"
      >
        +
      </div>
    </div>
    <FillWord
      :data-words="dataWords"
      placeholder-left="Phrase 1 to be filled in"
      placeholder-right="phrase 2 to be filled in"
    />
    <div class="border-t border-primary_line mt-5" />
    <div v-if="!checkName" class="flex justify-center gap-20 mt-5 text-base">
      <div
        @click="cancelCreate"
        class="border border-primary w-24 text-center text-primary h-8 leading-8 hover:opacity-70 rounded-lg cursor-pointer"
      >
        Cancel
      </div>
      <div
        @click="createCourse"
        class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
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
      <div
        @click="nextReading"
        class="cursor-pointer rounded-lg border border-primary text-primary w-40 text-center h-8 leading-8 hover:opacity-50"
      >
        Next Reading
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
        <b>Listening course</b>
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
            @click="createCourseListening"
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
import Audio from '../../../components/common/Audio.vue';
import Word from '../../../components/common/Editor.vue';
import AddAnswer from '../../../components/common/AddAnswer.vue';
import FillWord from '../../../components/common/FillWord.vue';
import { STAR_RED, AVATAR } from '../../../constants/image';
import { NOTIFY_MESSAGE, UI } from '../../../constants/index';
import { notification } from 'ant-design-vue';
import Inputlevel from '../../../components/common/InputLevel2.vue';
import ConfirmModal from '../../../components/admin/ConfirmModal.vue';
import { validNumber } from '../../../constants/function';
import courseApi from '../../../apis/course';
export default {
  name: 'CreateCourseListening',
  components: {
    ConfirmModal,
    ButtonBack,
    Audio,
    Word,
    AddAnswer,
    FillWord,
    ImageUpload,
    Inputlevel,
  },
  created() {
    this.validNumber = validNumber;
    this.UI = UI;
    this.NOTIFY_MESSAGE = NOTIFY_MESSAGE;
    this.AVATAR = AVATAR;
    this.STAR_RED = STAR_RED;
    if (this.$route.name == 'CreateCourseForAdvancedListening')
      this.checkName = true;
    this.namePath = this.$route.params.course;
    this.idCourse = JSON.parse(localStorage.getItem('IDCourse'));
  },
  methods: {
    updateAvatar(data) {
      this.avatar = data;
    },
    // level
    updateLevel(e) {
      this.inputLevel = e;
    },
    handleGetValueAuio(data) {
      this.selectedAudio = data;
    },
    updateContentListening(data) {
      this.contentListening = data;
    },

    setIsFocused(index) {
      this.indexFocus = index;
    },

    subtractWord(index) {
      this.word.splice(index, 1);
      this.numWords--;
    },
    checkQuestions() {
      this.dataQuestion.forEach((questionData, index) => {
        const questionObject = {
          questionContent: questionData.title,
          correctAnswer: this.dataQuestionCorrect[index] + 1,
          options: questionData.answers.map((answer) => ({ content: answer })),
        };
        this.questionList.push(questionObject);
      });
    },
    checkWord() {
      this.dataWords.forEach((item, index) => {
        const questionObject = {
          leftContent: item.contentLeft,
          rightContent: item.contentRight,
          answer: this.word[index],
        };
        this.fillInBlankQuestionList.push(questionObject);
      });
    },
    async createCourse() {
      this.dataQuestion = this.dataQuestion.filter(
        (item, index) => index === 0 || item.title !== '',
      );
      this.checkQuestions();
      this.checkWord();
      try {
        if (
          this.dataQuestion.length == 2 &&
          this.dataQuestionCorrect.length == 2 &&
          this.title
        ) {
          this.emitter.emit('isShowLoading', true);
          const data = {
            description: this.subTitle,
            script: this.contentListening,
            title: this.title,
            mediaURL: this.selectedAudio,
            thumbnailURL: this.avatar,
            course: {
              id: this.idCourse,
            },
            questionList: this.questionList,
            fillInBlankQuestionList: this.fillInBlankQuestionList,
          };
          console.log(data);
          // await courseApi.createListeningSession(data);
          this.emitter.emit('isShowLoading', false);
          notification.success({ message: NOTIFY_MESSAGE.CREATE_SUCCESS });
          this.$router.push({
            name: 'ListCourseListening',
            params: { name: this.namePath },
          });
        } else if (this.dataQuestionReading.length != 2) {
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
      this.$router.push({ name: 'CourseListening' });
    },
    showModalCreate() {
      this.showModalCreateCourse = true;
    },
    closeModalCreate() {
      this.showModalCreateCourse = false;
    },
    createCourseListening() {
      notification.success({ message: NOTIFY_MESSAGE.CREATE_SUCCESS });
      this.showModalCreateCourse = false;
    },
    nextReading() {
      this.$router.push({ name: 'CreateCourseForAdvancedReading' });
    },
    changeBack() {
      this.$router.push({ name: 'ListCourseListening' });
    },
    addWord() {
      if (this.numWords <= 4) this.numWords++;
      else notification.error({ message: NOTIFY_MESSAGE.ADD_WORD });
    },
    addQuestion() {
      if (this.dataQuestion.length <= 10)
        this.dataQuestion.push({
          title: '',
          answers: [],
        });
      else notification.error({ message: 'Only 11 questions' });
    },
    subtractQuestion(data) {
      this.dataQuestion.splice(data, 1);
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
      namePath: null,
      avatar: AVATAR,
      fillInBlankQuestionList: [],
      questionList: [],
      showModalCreateCourse: false,
      checkName: false,
      inputLevel: 1,
      contentListening: '',
      screen: UI.UI_LISTENING,
      title: '',
      subTitle: '',
      indexFocus: null,
      numWords: 1,
      word: [],
      dataQuestion: [
        {
          title: '',
          answers: [],
        },
      ],
      dataWords: [
        { id: 1, contentLeft: '', contentRight: '', answer: '' },
        { id: 2, contentLeft: '', contentRight: '', answer: '' },
        { id: 3, contentLeft: '', contentRight: '', answer: '' },
        { id: 4, contentLeft: '', contentRight: '', answer: '' },
        { id: 5, contentLeft: '', contentRight: '', answer: '' },
      ],

      selectedAudio: null,
      dataQuestionCorrect: [], // example
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
