<template>
  <div class="mx-2 mt-4">
    <ButtonBack
      title="Listening Test Level Intermediate"
      extend-class="mb-5"
      @back="handleBack"
    />
    <div class="flex items-center w-full">
      <div class="bg-primary_line course-line w-full" />
      <div class="text-lg text-primary_black font-semibold w-full">
        Listening Test
      </div>
      <div class="bg-primary_line course-line w-full" />
    </div>
    <div class="detail-field mx-auto my-5">
      <img
        :src="imgURL || MOUNTAIN_CLIMB"
        alt=""
        srcset=""
        class="detail-image"
      />
    </div>
    <Audio :data-prop="selectedAudio" :hideChoose="false" />
    <div ref="transcriptTop">
      <ButtonBack
        title="Listen to the dialogue above and choose the correct answer"
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
    </div>
    <ButtonBack
      title="Listen to the dialogue above and match the beginnings and endings of the phrases"
      extend-class="mt-5"
    />
    <MatchWord
      :data-list-words="dataListWords"
      :list-answers="listAnswers"
      :list-questions="listQuestions"
      :errorsMatching="errorsMatching"
      :submit-prop="submitMatching"
      @setAnswers="setAnswers"
      @setQuetions="setQuetions"
    />

    <div class="flex gap-20 items-center mt-10 justify-center">
      <div
        class="cursor-pointer font-semibold rounded-lg border-primary border w-40 text-center h-8 leading-8 hover:opacity-50"
        @click="handleSubmit"
      >
        <span class="text-base text-primary">Next to Reading</span>
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
  <ConfirmModal
    :showModal="modalNextReading"
    @closeModal="closeModalNextReading"
    @save="closeModalNextReading"
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
import Audio from '../../../components/common/Audio.vue';
import {
  ARROW_LEFT,
  MOUNTAIN_CLIMB,
  RELOAD,
  WARNING,
} from '../../../constants/image';
import MultipleChoice from '../../../components/common/MultipleChoice.vue';
import MatchWord from '../../../components/common/MatchWord.vue';
import { mapState, mapMutations } from 'vuex';
import courseApi from '../../../apis/course';
import { notification } from 'ant-design-vue';
import ConfirmModal from '../../../components/admin/ConfirmModal.vue';

export default {
  name: 'ListeningTest',
  components: { ButtonBack, Audio, MultipleChoice, MatchWord, ConfirmModal },
  created() {
    this.WARNING = WARNING;
    this.RELOAD = RELOAD;
    this.ARROW_LEFT = ARROW_LEFT;
    this.MOUNTAIN_CLIMB = MOUNTAIN_CLIMB;
    localStorage.removeItem('error');
    if (this.isMatchedRoute('ListeningTest')) {
      this.setDefaultError(0);
    }
    this.idCourse = this.$route.params.id;
    if (this.idCourse) {
      this.getAllListening();
    }
  },
  watch: {
    listAnswers() {
      this.errorsMatching = [];
    },
  },
  computed: {
    ...mapState('member', ['hasErrorListening']),
  },
  methods: {
    ...mapMutations('member', ['setErrorListening']),
    /**
     * get all session
     * @param {*} dataID
     */
    async getAllListening() {
      try {
        this.emitter.emit('isShowLoading', true);
        const arrAPI = await courseApi.getAllListeningSession({
          id: this.idCourse,
        });

        this.listListening = [];
        arrAPI.forEach((item, index) => {
          if (index == 0) {
            this.listListening.push({
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
        if (this.idSection) {
          await this.getDetailSession();
          await this.getRandomQuestions();
        } else {
          this.$router.push({ name: 'TestLevelListeningBlogCreate' });
        }
      }
    },
    /**
     * get random question
     */
    async getRandomQuestions() {
      try {
        this.emitter.emit('isShowLoading', true);
        const detailSession = await courseApi.getRandomQuestionListening({
          id: this.idSection,
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
          id: this.idSection,
        });
        this.title = detailSession?.title;
        this.textContent = detailSession?.textContent;
        this.imgURL = detailSession?.thumbnailURL;
        this.selectedAudio = detailSession?.mediaURL;
        this.script = detailSession?.script;
        detailSession?.questionList.forEach((item, index) => {
          this.dataMultipleChoice.push({
            id: index + 1,
            title: item.questionContent,
            question: item.options.map((item) => item.content),
          });
          this.correctAnswer.push(+item.correctAnswer + 1);
        });
        detailSession?.fillInBlankQuestionList.forEach((ele, index) => {
          this.listQuestions.push({
            id: index + 1,
            contentLeft: ele?.leftContent,
            contentRight: ele?.rightContent,
            word: ele?.answer,
          });
          this.listAnswers.push({
            id: index + 1,
            word: null,
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
      this.dataListWords = [];
      this.getRandomQuestions();
      this.setErrorListening(false);
    },
    handleSubmit() {
      let errorMulti = 0;
      let errorMatch = 0;
      if (!this.submitMultipleChoice) {
        this.errorsMultiple = [];
        for (let i = 0; i < this.dataMultipleChoice.length; i++) {
          if (!this.compareMultiple(this.correctAnswer[i], this.myAnswer[i])) {
            errorMulti++;
          }
        }
        this.submitMultipleChoice = true;
      }
      // matching
      if (!this.submitMatching) {
        this.errorsMatching = [];
        for (let i = 0; i < this.listAnswers.length; i++) {
          if (!this.compareMatch(this.listQuestions[i], this.listAnswers[i])) {
            errorMatch++;
          }
        }
        this.submitMatching = true;
      }
      if (errorMulti == 0 && errorMatch == 0) {
        this.setErrorListening(false);
        // notification.success({
        //   message: 'Congratulations !!! Your level upgrade to intermediate',
        // });
      } else {
        this.setErrorListening(true);
        // notification.warning({ message: 'Failed' });
      }
      this.modalNextReading = true;
    },
    handleBack() {
      this.$router.push({ name: 'Test' });
    },
    goToNextReading() {
      this.$router.push({
        name: 'TestLevelReadingIntermediate',
        params: { id: this.idCourse },
      });
    },
    /**
     *  Check if the route name matches the route being displayed.
     *  @returns {boolean} - Returns true if the route name matches the current route, false otherwise.
     */
    isMatchedRoute(routeName) {
      return this.$route.matched.some(({ name }) => {
        return name == routeName;
      });
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
    comparePriority(valueA, valueB) {
      return valueA == valueB;
    },
    compareMatch(quetions, answers) {
      if (quetions.word == answers.word) return true;
      else return false;
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
    closeModalNextReading() {
      this.modalNextReading = false;
      this.setErrorListening(false);
      this.submitMultipleChoice = false;
      this.submitMatching = false;
    },
  },
  data() {
    return {
      modalNextReading: false,
      idCourse: null,
      listListening: [],
      script: null,
      idSection: null,
      title: null,
      textContent: null,
      imgURL: null,
      userInfor: null,
      rotation: 0,
      numberErrorTemp: 0,
      submitMatching: false,
      submitMultipleChoice: false,
      drag: false,
      listQuestions: [],
      listAnswers: [],
      dataListWords: [],
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
