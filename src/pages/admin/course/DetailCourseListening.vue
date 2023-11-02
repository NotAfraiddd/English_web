<template>
  <div class="mx-2">
    <ButtonBack title="Detail Listening" :hide-back="true" @back="onBack" />
    <div class="detail-field mx-auto mt-5">
      <img :src="MOUNTAIN_CLIMB" alt="" srcset="" class="detail-image" />
    </div>
    <Audio :data-prop="selectedAudio" :hideChoose="false" />
    <!-- transcript -->
    <div class="relative">
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
        <div
          class="m-5"
          v-html="
            `<div>Susanne: Hi, Mario. Can you help me prepare some things for the next month?<br>Mario: OK, sure. What can I help you with?<br>Susanne: I need to visit the customer in Germany. It's important.<br>Mario: What can I do to help?<br>Susanne: Can you send an email to the customer? Ask them when I can visit them next week. Please do this first. It's a priority and very urgent.<br>Mario: Right. I'll do it today.<br>Susanne: Thanks. This next task is also important. Can you invite everyone to the next team meeting?<br>Mario: Yes, I will.<br>Susanne: But first you need to book a meeting room. After that, please send everyone an email about it.<br>Mario: Yes, of course.<br>Susanne: And finally, can you write a short report about our new project? I have to give a presentation to our managers next month. Please do it when you have time &ndash; sometime in the next two or three weeks. It's not too urgent.<br>Mario: Sure, no problem. I can do it this week.<br>Susanne: There's no hurry. Take your time.</div>`
          "
        />
      </div>
    </div>
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
      @setAnswers="setAnswers"
      @setQuetions="setQuetions"
    />
    <ButtonBack
      title="Put the tasks in order of priority."
      extend-class="mt-5"
    />
    <PutPriority
      :data-priority="listPriority"
      :list-correct-priority="listCorrectPriority"
      placeholder="Priority sequence"
      :input-priority-prop1="inputPriority1"
      :input-priority-prop2="inputPriority2"
      :input-priority-prop3="inputPriority3"
      :input-priority-prop4="inputPriority4"
      @update1="setValuePriority1"
      @update2="setValuePriority2"
      @update3="setValuePriority3"
      @update4="setValuePriority4"
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
        </div>
      </div>
      <div v-else class="flex gap-20">
        <div
          class="cursor-pointer font-semibold rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="onBack"
        >
          <span class="text-base text-primary">Back</span>
        </div>
        <div
          @click="handleSubmit"
          class="cursor-pointer font-semibold rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
        >
          Submit
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonBack from '../../../components/common/ButtonBack.vue';
import Audio from '../../../components/common/Audio.vue';
import { ARROW_LEFT, MOUNTAIN_CLIMB } from '../../../constants/image';
import MultipleChoice from '../../../components/common/MultipleChoice.vue';
import MatchWord from '../../../components/common/MatchWord.vue';
import PutPriority from '../../../components/common/PutPriority.vue';
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'DetailCourseListening',
  components: { ButtonBack, Audio, MultipleChoice, MatchWord, PutPriority },
  created() {
    this.ARROW_LEFT = ARROW_LEFT;
    this.MOUNTAIN_CLIMB = MOUNTAIN_CLIMB;
    this.paramName = this.$route.params.name;
  },
  watch: {
    listAnswers() {
      this.errorsMatching = [];
    },
  },
  methods: {
    ...mapMutations('course', ['setSubmit']),
    isMatchedRoute(routeName) {
      return this.$route.matched.some(({ name }) => {
        return name == routeName;
      });
    },
    setValuePriority1(data) {
      this.inputPriority1 = data;
    },
    setValuePriority2(data) {
      this.inputPriority2 = data;
    },
    setValuePriority3(data) {
      this.inputPriority3 = data;
    },
    setValuePriority4(data) {
      this.inputPriority4 = data;
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
      // this.setSubmit(true);
      // MultipleChoice
      this.errorsMultiple = [];
      for (let i = 0; i < this.dataMultipleChoice.length; i++) {
        if (
          this.compareMultiple(this.correctAnswer[i], this.myAnswer[i]) == false
        ) {
          this.errorsMultiple.push(this.dataMultipleChoice[i].id + 1);
        }
      }
      // matching
      this.errorsMatching = [];
      for (let i = 0; i < this.listAnswers.length; i++) {
        if (
          this.compareMatch(this.listQuestions[i], this.listAnswers[i]) == false
        ) {
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
      checkTranscript: false,
      paramName: null,
      drag: false,
      inputPriority1: null,
      inputPriority2: null,
      inputPriority3: null,
      inputPriority4: null,
      listPriority: [
        { id: 1, question: 'I have an apple in my bag.' },
        { id: 2, question: 'I have an apple in my bag.' },
        {
          id: 3,
          question: 'I have an apple in my bag.I have an apple in my bag.',
        },
        { id: 4, question: 'I have an apple in my bag.' },
      ],
      listCorrectPriority: [1, 3, 2, 4],
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
