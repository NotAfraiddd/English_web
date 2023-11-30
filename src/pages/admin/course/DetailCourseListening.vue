<template>
  <div class="mx-2">
    <ButtonBack title="Detail Listening" :hide-back="true" @back="onBack" />
    <div class="flex items-center w-full my-10">
      <div class="bg-primary_line course-line w-full" />
      <div class="text-2xl text-primary_black font-semibold w-full">
        {{ title }}
      </div>
      <div class="bg-primary_line course-line w-full" />
    </div>
    <div class="detail-field mx-auto mt-5">
      <img :src="MOUNTAIN_CLIMB" alt="" srcset="" class="detail-image" />
    </div>
    <Audio :data-prop="selectedAudio" :hideChoose="false" />
    <!-- transcript -->
    <div v-if="checkTranscript" class="relative">
      <div class="flex mt-5">
        <div
          @click="showTranscript"
          class="bg-primary w-max px-2 py-1 text-white text-lg rounded-xl font-semibold cursor-pointer"
        >
          Transcript
        </div>
        <div
          class="flex ml-3 justify-center items-center cursor-pointer"
          @click="showTranscript"
          @mouseenter="hoverBack"
          @mouseleave="resetHover"
        >
          <img :src="ARROW_LEFT" alt="" srcset="" class="detail-arrow mr-3" />
          <div class="text-xl text-text_back">Click here</div>
        </div>
      </div>
      <div
        v-if="checkTranscript"
        ref="transcript"
        :class="[
          'detail-transcript absolute text-left ',
          { open: transcript },
          transcript && 'border',
        ]"
      >
        <div class="m-5" v-html="script" />
      </div>
    </div>
    <div ref="transcriptTop">
      <div class="flex items-center flex-wrap mt-5 gap-5">
        <ButtonBack
          title="Listen to the dialogue above and choose the correct answer"
        />
        <div
          v-if="userInfor.role == 'ADMIN' && checkRoute"
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
    </div>
    <!-- match -->
    <div class="flex items-center flex-wrap mt-5 gap-5">
      <ButtonBack
        title="Listen to the dialogue above and match the beginnings and endings of the phrases"
      />
      <div
        v-if="userInfor.role == 'ADMIN' && checkRoute"
        class="h-6 border-orange border rounded-xl flex items-center"
      >
        <div
          class="text-primary_black hover:underline cursor-pointer mx-3"
          @click="showModalMatch"
        >
          Correct Answers
        </div>
      </div>
    </div>
    <MatchWord
      :data-list-words="dataListWords"
      :list-answers="listAnswers"
      :list-questions="listQuestions"
      :errorsMatching="errorsMatching"
      :submit-prop="submitMatching"
      @setAnswers="setAnswers"
      @setQuetions="setQuetions"
    />
    <div class="flex justify-center gap-20 items-center py-5 text-base">
      <div v-if="!isMatchedRoute('MemberDetailCourseListening')">
        <div class="flex gap-20">
          <div
            class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
            @click="onBack"
          >
            <span class="text-base text-primary">Back</span>
          </div>
          <div
            class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
            @click="handleUpdate"
          >
            <span class="text-base text-white">Edit</span>
          </div>
          <div
            @click="handleSubmit"
            class="cursor-pointer rounded-lg bg-yellow-300 text-white w-24 text-center h-8 leading-8 hover:opacity-50"
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
      <div v-else class="flex gap-20 items-center">
        <div
          class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="onBack"
        >
          <span class="text-base text-primary">Back</span>
        </div>
        <div
          @click="handleSubmit"
          class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
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
  <ConfirmModal
    :showModal="modalMatch"
    @closeModal="closeModalMatch"
    @save="closeModalMatch"
    :showFooter="false"
    :widthCustom="300"
  >
    <template #content>
      <div class="w-full text-center text-xl text-primary">Correct Answers</div>
      <div v-for="(item, index) in listQuestions" :key="index" class="w-full">
        <div class="text-base flex w-full justify-between mt-3">
          <div>Answers {{ index + 1 }} is</div>
          <div class="text-orange">{{ item.word }}</div>
        </div>
      </div>
    </template>
  </ConfirmModal>
</template>
<script>
import ButtonBack from '../../../components/common/ButtonBack.vue';
import Audio from '../../../components/common/Audio.vue';
import { ARROW_LEFT, MOUNTAIN_CLIMB, RELOAD } from '../../../constants/image';
import MultipleChoice from '../../../components/common/MultipleChoice.vue';
import MatchWord from '../../../components/common/MatchWord.vue';
import ConfirmModal from '../../../components/admin/ConfirmModal.vue';
import courseApi from '../../../apis/course';
import { notification } from 'ant-design-vue';
export default {
  name: 'DetailCourseListening',
  components: {
    ButtonBack,
    Audio,
    ConfirmModal,
    MultipleChoice,
    MatchWord,
  },
  created() {
    this.RELOAD = RELOAD;
    this.ARROW_LEFT = ARROW_LEFT;
    this.MOUNTAIN_CLIMB = MOUNTAIN_CLIMB;
    this.paramName = this.$route.params.name;
    this.userInfor = JSON.parse(localStorage.getItem('user'));
    this.idSession = +this.$route.params.id;
    if (this.idSession) {
      this.getDetailSession();
      this.getRandomQuestions();
    }
  },
  watch: {
    listAnswers() {
      this.errorsMatching = [];
    },
  },
  computed: {
    checkRoute() {
      if (
        this.isMatchedRoute('Dashboard') ||
        this.isMatchedRoute('BlogPending') ||
        this.isMatchedRoute('DetailBlogPending') ||
        this.isMatchedRoute('CoursePending') ||
        this.isMatchedRoute('Course') ||
        this.isMatchedRoute('CreateCourse') ||
        this.isMatchedRoute('Member') ||
        this.isMatchedRoute('CourseListening') ||
        this.isMatchedRoute('CourseReading') ||
        this.isMatchedRoute('DetailCourseListening') ||
        this.isMatchedRoute('DetailCourseReading') ||
        this.isMatchedRoute('DetailCourseListeningPending') ||
        this.isMatchedRoute('CreateCourseListening') ||
        this.isMatchedRoute('CreateCourseReading') ||
        this.isMatchedRoute('AdminDetail') ||
        this.isMatchedRoute('MemberDetail') ||
        this.isMatchedRoute('CommentReported')
      )
        return true;
      return false;
    },
  },
  methods: {
    /**
     * get random question
     */
    async getRandomQuestions() {
      try {
        this.emitter.emit('isShowLoading', true);
        const detailSession = await courseApi.getRandomQuestionListening({
          id: this.idSession,
        });
        detailSession.forEach((word, index) => {
          this.dataListWords.push({
            id: index + 1,
            word: word,
          });
        });
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    /**
     * get detail session
     */
    async getDetailSession() {
      try {
        this.emitter.emit('isShowLoading', true);
        const detailSession = await courseApi.getListeningSessionByID({
          id: this.idSession,
        });
        this.title = detailSession?.title;
        this.textContent = detailSession?.textContent;
        this.imgURL = detailSession?.imgURL;
        this.selectedAudio = detailSession?.mediaURL;
        this.script = detailSession?.script;
        detailSession?.questionList.forEach((item, index) => {
          this.dataMultipleChoice.push({
            id: index + 1,
            title: item.questionContent,
            question: item.options.map((item) => item.content),
          });
          this.correctAnswer.push(+item.correctAnswer);
        });
        detailSession?.fillInBlankQuestionList.forEach((ele, index) => {
          this.listQuestions.push({
            id: index + 1,
            contentLeft: ele?.leftContent,
            contentRight: ele?.rightContent,
            word: ele?.answer,
          });
        });
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    resetResult() {
      this.submitMultipleChoice = false;
      this.submitMatching = false;
      this.errorsMultiple = [];
      this.errorsMatching = [];
      this.listAnswers.forEach((item) => {
        item.word = null;
      });
      this.myAnswer = [];
      this.rotation += 360;
      this.checkTranscript = false;
      this.getRandomQuestions();
    },
    /**
     * show modal
     */
    showModalMuilti() {
      this.modalMuilti = true;
    },
    showModalMatch() {
      this.modalMatch = true;
    },

    /**
     * close modal
     */
    closeModalMuilti() {
      this.modalMuilti = false;
    },
    closeModalMatch() {
      this.modalMatch = false;
    },

    isMatchedRoute(routeName) {
      return this.$route.matched.some(({ name }) => {
        return name == routeName;
      });
    },

    onBack() {
      if (this.isMatchedRoute('MemberDetailCourseListening'))
        this.$router.push({ name: 'ListCourseListening' });
      else this.$router.push({ name: 'CourseListening' });
    },
    handleBack() {
      this.$router.push({ name: 'CourseListening' });
    },
    setQuetions(data) {
      this.dataListWords = data;
    },
    setAnswers(data) {
      this.listAnswers = data;
    },
    getAnswerMultichoice(data) {
      this.myAnswer = data;
    },
    compareMultiple(valueA, valueB) {
      return JSON.stringify(valueA) === JSON.stringify(valueB);
    },
    compareMatch(quetions, answers) {
      if (quetions.word == answers.word) return true;
      else return false;
    },
    handleSubmit() {
      // MultipleChoice
      if (!this.submitMultipleChoice) {
        this.errorsMultiple = [];
        for (let i = 0; i < this.dataMultipleChoice.length; i++) {
          if (!this.compareMultiple(this.correctAnswer[i], this.myAnswer[i])) {
            this.errorsMultiple.push(this.dataMultipleChoice[i].id);
          }
        }
        this.submitMultipleChoice = true;
      }
      // matching
      if (!this.submitMatching) {
        this.errorsMatching = [];
        for (let i = 0; i < this.listAnswers.length; i++) {
          if (!this.compareMatch(this.listQuestions[i], this.listAnswers[i])) {
            this.errorsMatching.push({
              id: this.listAnswers[i].id,
              type: this.listAnswers[i].word == null ? 0 : 1,
            });
          } else
            this.errorsMatching.push({
              id: this.listAnswers[i].id,
              type: 2,
            });
        }
        this.submitMatching = true;
      }

      if (this.errorsMultiple.length == 0 && this.errorsMatching.length == 0) {
        notification.success({ message: 'Congratulation complete' });
      } else {
        notification.warn({
          message:
            'Unfortunately !!! Please complete it to move on to the next section',
        });
      }

      this.checkTranscript = true;
    },
    checkHeight() {
      const heightTranscript = this.$refs.transcript;
      const marginTop = this.$refs.transcriptTop;
      if (heightTranscript) {
        const scrollHeight = heightTranscript.scrollHeight;
        if (this.transcript == true) {
          heightTranscript.style.height = `${scrollHeight}px`;
          heightTranscript.style.opacity = '1';
          heightTranscript.style.transform = 'translateY(0)';
          marginTop.style.marginTop = `${scrollHeight + 20}px`;
        } else {
          heightTranscript.style.height = `0px`;
          marginTop.style.transition = 'margin-top 0.65s ease';
          marginTop.style.marginTop = `${5}px`;
        }
      }
    },
    handleUpdate() {
      this.$router.push({
        name: 'UpdateCourseReading',
        params: { name: this.paramName },
      });
    },
    goToDetailCourse(data) {
      console.log(data);
    },
    showTranscript() {
      this.transcript = !this.transcript;
      this.checkHeight();
    },
    hoverBack() {
      this.isHover = true;
      const imageArrow = document.querySelector('.detail-arrow');
      if (this.isHover) {
        imageArrow.style.transform = 'translateX(-5px) ';
      }
    },
    resetHover() {
      this.isHover = false;
      const imageArrow = document.querySelector('.detail-arrow');
      if (!this.isHover) {
        imageArrow.style.transform = 'translateX(0px)';
      }
    },
  },
  data() {
    return {
      script: null,
      idSession: null,
      title: null,
      textContent: null,
      imgURL: null,
      userInfor: null,
      rotation: 0,
      modalMuilti: false,
      modalMatch: false,
      submitMatching: false,
      submitMultipleChoice: false,
      checkTranscript: false,
      paramName: null,
      drag: false,
      errorPriority: [],
      // match
      listQuestions: [],
      listAnswers: [
        { id: 1, word: null },
        { id: 2, word: null },
        { id: 3, word: null },
        { id: 4, word: null },
        { id: 5, word: null },
      ],
      dataListWords: [],
      // trac nghiem
      dataMultipleChoice: [],
      correctAnswer: [],
      myAnswer: [],
      errorsMultiple: [],
      errorsMatching: [],
      emptysMultiple: [],
      transcript: false,
      selectedAudio: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.course-line {
  height: 1px;
}
.rotate-transition {
  transition: transform 1s ease-in-out;
}
.detail {
  &-field {
    height: 510px;
    object-fit: contain;
  }
  &-image {
    width: 100%;
    height: 100%;
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
}

.detail-transcript {
  background-color: #fff;
  z-index: 1;
  overflow: hidden;
  left: 0;
  height: 0;
  transition: height 0.65s ease, opacity 0.65s ease;
  top: 45px;
  width: 100%;
  box-shadow: -4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
}

.detail-arrow {
  transition: transform 0.2s;
  transform-origin: center;
}
.detail-course-listening {
  &__answers {
    width: 14rem;
  }
}
</style>
