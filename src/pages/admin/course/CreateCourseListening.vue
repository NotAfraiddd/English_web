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
      @update="getAvatar"
      extend-class="w-96 h-96"
      extend-class-icon="icon-remove"
    />
    <Audio
      :data-prop="selectedAudio"
      :hide-choose="true"
      @valueAudio="handleGetValueAuio"
    />
    <ButtonBack title="Transcript" extend-class="mt-5" />
    <Word :contentProp="contentListening" @update="updateContentListening" />
    <ButtonBack
      title="Listen to the dialogue above and choose the correct answer"
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
      title="Listen to the dialogue above and match the beginnings and endings of the phrases"
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
          class="w-max border rounded-lg form-control text-center"
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
    <div class="flex justify-center gap-20 mt-5 text-base">
      <div
        @click="cancelCreate"
        class="border border-primary w-24 text-center text-primary h-8 leading-8 hover:opacity-70 rounded-lg cursor-pointer"
      >
        Cancel
      </div>
      <div
        @click="createCourse"
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
import courseApi from '../../../apis/course';
import fileAPI from '../../../apis/file';
import { mapState } from 'vuex';
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
    this.UI = UI;
    this.NOTIFY_MESSAGE = NOTIFY_MESSAGE;
    this.AVATAR = AVATAR;
    this.STAR_RED = STAR_RED;
    if (this.$route.params.course == 'beginner') this.inputLevel = 1;
    if (this.$route.params.course == 'intermediate') this.inputLevel = 2;
    if (this.$route.params.course == 'advanced') this.inputLevel = 3;
    this.idCourse = JSON.parse(localStorage.getItem('IDCourse'));
    this.idSection = +this.$route.params.id;
    if (this.idCourse) {
      this.getDetailSectionByID();
    }
  },
  computed: {
    ...mapState('course', ['media', 'file']),
  },

  methods: {
    async getDetailSectionByID() {
      try {
        this.emitter.emit('isShowLoading', true);
        const data = await courseApi.getListeningSessionByID({
          id: this.idSection,
        });
        this.title = data?.title;
        this.avatar = data?.thumbnailURL;
        this.selectedAudio = data?.mediaURL;
        this.subTitle = data?.description;
        this.contentListening = data?.script;
        data?.questionList.forEach((item, index) => {
          this.dataQuestion.push({
            id: index + 1,
            title: item.questionContent,
            answers: item.options.map((item) => item.content),
          });
          this.dataQuestionCorrect.push(+item?.correctAnswer);
        });
        this.dataWords = [];
        data?.fillInBlankQuestionList.forEach((ele, index) => {
          this.dataWords.push({
            id: index + 1,
            contentLeft: ele?.leftContent,
            contentRight: ele?.rightContent,
          });
          this.word.push(ele?.answer);
          this.numWords = data?.fillInBlankQuestionList.length;
        });
        this.noData = true;
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    getAvatar(data, fileImg) {
      this.avatar = data;
      this.file = fileImg;
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
      this.dataWords.splice(index, 1);
      this.numWords--;
    },
    checkQuestions() {
      this.questionList = [];
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
        const checkCorrect = this.dataQuestionCorrect.some((item) => item < 0);
        const checkQuestion = this.dataQuestion.some(
          (item) => item.answers.length == 0,
        );
        const checkMatchWords = this.dataWords.length === 5;
        if (
          this.dataQuestion.length != 0 &&
          this.dataQuestionCorrect.length != 0 &&
          this.title &&
          this.selectedAudio &&
          !checkCorrect &&
          !checkQuestion &&
          checkMatchWords
        ) {
          this.emitter.emit('isShowLoading', true);
          if (this.file) {
            let formData = new FormData();
            formData.append('file', this.file);
            this.avatar = await fileAPI.updateImg(formData);
          }
          if (this.media) {
            let formData = new FormData();
            formData.append('file', this.media);
            this.selectedAudio = await fileAPI.updateMp3(formData);
          }
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

          if (!this.noData) {
            await courseApi.createListeningSession(data);
            notification.success({ message: NOTIFY_MESSAGE.CREATE_SUCCESS });
          } else {
            const dataUpdate = {
              id: this.idSection,
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
            await courseApi.updateListeningSession(dataUpdate);
            notification.success({ message: NOTIFY_MESSAGE.UPDATE_SUCCESS });
          }
          this.emitter.emit('isShowLoading', false);
          this.$router.push({ name: 'CourseListening' });
        }
        if (
          this.dataQuestion.length != this.dataQuestionCorrect.length ||
          checkQuestion
        ) {
          notification.error({
            message: 'Questions and answers have not been filled in completely',
          });
        }
        if (!this.title)
          notification.error({
            message: 'Title has not been filled in yet',
          });
        if (!this.selectedAudio) {
          notification.error({
            message: 'There is no audio file yet',
          });
        }
        if (checkCorrect) {
          notification.error({
            message: 'The answers has not been filled in yet',
          });
        }
        if (!checkMatchWords) {
          notification.error({
            message: 'Fill in the blanks with 5 sentences',
          });
        }
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
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
      this.$router.push({ name: 'CourseListening' });
    },
    addWord() {
      if (this.numWords <= 4) {
        this.numWords++;
        this.dataWords.push({
          id: this.numWords - 1,
          contentLeft: '',
          contentRight: '',
        });
      } else notification.warning({ message: 'Only 5 questions' });
    },
    addQuestion() {
      if (this.dataQuestion.length <= 9)
        this.dataQuestion.push({
          title: '',
          answers: [],
        });
      else notification.error({ message: NOTIFY_MESSAGE.ADD_QUESTION });
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
  data() {
    return {
      questionList: [],
      idSection: null,
      file: null,
      avatar: AVATAR,
      showModalCreateCourse: false,
      inputLevel: 1,
      contentListening: '',
      screen: UI.UI_LISTENING,
      title: '',
      subTitle: '',
      indexFocus: null,
      numWords: 1,
      word: [],
      dataQuestion: [],
      dataQuestionReading: [],
      dataWords: [
        {
          id: 0,
          contentLeft: '',
          contentRight: '',
        },
      ],
      selectedAudio: null,
      dataQuestionCorrect: [],
      fillInBlankQuestionList: [],
    };
  },
};
</script>

<style lang="scss">
.icon-remove {
  top: 2%;
  right: 32%;
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
