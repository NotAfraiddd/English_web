<template>
  <div class="mx-2 mt-6">
    <div class="flex items-center w-full">
      <div class="bg-primary_line course-line w-full" />
      <div class="text-lg text-primary_black font-semibold w-full">
        Listening Test
      </div>
      <div class="bg-primary_line course-line w-full" />
    </div>
    <div class="detail-field mx-auto my-5">
      <img :src="MOUNTAIN_CLIMB" alt="" srcset="" class="detail-image" />
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

    <div
      @click="handleSubmit"
      class="cursor-pointer my-5 mx-auto font-semibold rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
    >
      Next
    </div>
  </div>
</template>
<script>
import ButtonBack from '../../components/common/ButtonBack.vue';
import Audio from '../../components/common/Audio.vue';
import { ARROW_LEFT, MOUNTAIN_CLIMB } from '../../constants/image';
import MultipleChoice from '../../components/common/MultipleChoice.vue';
import MatchWord from '../../components/common/MatchWord.vue';
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'ListeningTest',
  components: { ButtonBack, Audio, MultipleChoice, MatchWord },
  created() {
    this.ARROW_LEFT = ARROW_LEFT;
    this.MOUNTAIN_CLIMB = MOUNTAIN_CLIMB;
    localStorage.removeItem('error');
    if (this.isMatchedRoute('ListeningTest')) {
      this.setDefaultError(0);
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
    ...mapMutations('auth', ['setError', 'setDefaultError']),
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

      if (this.submitMatching && this.submitMultipleChoice) {
        setTimeout(() => {
          localStorage.setItem('error', this.error);
        }, 0);
        if (this.$route.name != 'TestLevelListening')
          this.$router.push({ name: 'ReadingTest' });
        else this.$router.push({ name: 'TestLevelReading' });
      }
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
  },
  data() {
    return {
      numberErrorTemp: 0,
      submitMatching: false,
      submitMultipleChoice: false,
      drag: false,
      listQuestions: [
        {
          id: 1,
          contentLeft: 'I have',
          contentRight: ' in my bag.',
          word: 'apple',
        },
        {
          id: 2,
          contentLeft: 'Susan and John go',
          contentRight: 'with theirs parent today.',
          word: 'at the school',
        },
        {
          id: 3,
          contentLeft: 'I have',
          contentRight: ' in my bag.',
          word: 'have lunch',
        },
        {
          id: 4,
          contentLeft: 'Susan and John go',
          contentRight: 'with theirs parent today.',
          word: 'have breakfast',
        },
        {
          id: 5,
          contentLeft: 'I have',
          contentRight: ' in my bag.',
          word: 'at the hospital',
        },
      ],
      listAnswers: [
        { id: 1, word: null },
        { id: 2, word: null },
        { id: 3, word: null },
        { id: 4, word: null },
        { id: 5, word: null },
      ],
      dataListWords: [
        { id: 1, word: 'at the hospital' },
        { id: 2, word: 'apple' },
        { id: 3, word: 'have breakfast' },
        { id: 4, word: 'have lunch' },
        { id: 5, word: 'at the school' },
      ],
      dataMultipleChoice: [
        {
          id: 0,
          title: 'Mary ask John about that: Mary ask John',
          question: [
            'Do you have breakfast?',
            'Do you have lunch?',
            'Do you have dinner?',
            'I’m hungry all day.',
          ],
        },
        {
          id: 1,
          title: 'Mary ask John about that:Mary ask John',
          question: [
            'Do you have breakfast?',
            'Do you have lunch?',
            'Do you have dinner?',
            'I’m hungry all day.',
          ],
        },
        {
          id: 2,
          title: 'Mary ask :',
          question: [
            'Do you have breakfast?',
            'Do you have lunch?',
            'Do you have dinner?',
            'I’m hungry all day.',
          ],
        },
        {
          id: 3,
          title: 'Mary ask John about that: Mary ask John',
          question: [
            'Do you have breakfast?',
            'Do you have lunch? Do you have breakfast?Do you have breakfast?',
            'Do you have dinner?',
            'I’m hungry all day.',
          ],
        },
        {
          id: 4,
          title:
            'Mary ask John about that:Mary ask John Mary ask John about that:Mary ask John',
          question: [
            'Do you have breakfast?',
            'Do you have lunch?',
            'Do you have dinner?',
            'I’m hungry all day.',
          ],
        },
        {
          id: 5,
          title: 'Mary ask :',
          question: [
            'Do you have breakfast? Do you have breakfast? Do you have breakfast?',
            'Do you have lunch?',
            'Do you have dinner?',
            'I’m hungry all day.',
          ],
        },
      ],
      correctAnswer: [1, 2, 3, 4, 1, 2],
      myAnswer: [],
      errorsMultiple: [],
      errorsMatching: [],
      emptysMultiple: [],
      transcript: false,
      selectedAudio:
        'https://6a63fca904fd268f15f7-d5770ffdd579eb31eaa89faeffc55fe7.ssl.cf1.rackcdn.com/LE_listening_C1_A_job_interview.mp3',
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
