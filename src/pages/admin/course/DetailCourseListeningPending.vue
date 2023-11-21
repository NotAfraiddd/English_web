<template>
  <div class="mx-2">
    <ButtonBack
      title="Detail Listening Pending"
      :hide-back="true"
      @back="onBack"
    />
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
        <div
          class="m-5"
          v-html="
            `<div>Susanne: Hi, Mario. Can you help me prepare some things for the next month?<br>Mario: OK, sure. What can I help you with?<br>Susanne: I need to visit the customer in Germany. It's important.<br>Mario: What can I do to help?<br>Susanne: Can you send an email to the customer? Ask them when I can visit them next week. Please do this first. It's a priority and very urgent.<br>Mario: Right. I'll do it today.<br>Susanne: Thanks. This next task is also important. Can you invite everyone to the next team meeting?<br>Mario: Yes, I will.<br>Susanne: But first you need to book a meeting room. After that, please send everyone an email about it.<br>Mario: Yes, of course.<br>Susanne: And finally, can you write a short report about our new project? I have to give a presentation to our managers next month. Please do it when you have time &ndash; sometime in the next two or three weeks. It's not too urgent.<br>Mario: Sure, no problem. I can do it this week.<br>Susanne: There's no hurry. Take your time.</div>`
          "
        />
      </div>
    </div>
    <div ref="transcriptTop">
      <div class="flex items-center flex-wrap mt-5 gap-5">
        <ButtonBack
          title="Listen to the dialogue above and choose the correct answer"
        />
        <div class="h-6 border-orange border rounded-xl flex items-center">
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
    <div class="flex items-center flex-wrap mt-5 gap-5">
      <ButtonBack
        title="Listen to the dialogue above and match the beginnings and endings of the phrases"
      />
      <div class="h-6 border-orange border rounded-xl flex items-center">
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
    <div class="flex items-center flex-wrap mt-5 gap-5">
      <ButtonBack title="Put the tasks in order of priority." />
      <div class="h-6 border-orange border rounded-xl flex items-center">
        <div
          class="text-primary_black hover:underline cursor-pointer mx-3"
          @click="showModalFill"
        >
          Correct Answers
        </div>
      </div>
    </div>
    <PutPriority
      placeholder="Priority sequence"
      :data-priority="listPriority"
      :list-correct-priority="listCorrectPriority"
      :input-priority-prop="inputPriority"
      :error-priority="errorPriority"
      :submit-prop="submitPriority"
      @update="setValuePriority"
    />
    <div class="flex justify-center gap-20 items-center py-5 text-base">
      <div class="flex items-center justify-around w-full">
        <div
          class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="onBack"
        >
          <span class="text-base text-primary">Back</span>
        </div>
        <div
          class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="handleAcceptCourse"
        >
          <span class="text-base text-white">Accept</span>
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
  <ConfirmModal
    :showModal="modalFillin"
    @closeModal="closeModalFillin"
    @save="closeModalFillin"
    :showFooter="false"
    :widthCustom="300"
  >
    <template #content>
      <div class="w-full text-center text-xl text-primary">Correct Answers</div>
      <div
        v-for="(item, index) in listCorrectPriority"
        :key="index"
        class="w-full"
      >
        <div class="text-base flex w-full justify-between mt-3">
          <div>Answers {{ index + 1 }} is</div>
          &nbsp;
          <div class="text-orange">{{ item }}</div>
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
  AVATAR,
  MOUNTAIN_CLIMB,
  RELOAD,
} from '../../../constants/image';
import MultipleChoice from '../../../components/common/MultipleChoice.vue';
import MatchWord from '../../../components/common/MatchWord.vue';
import PutPriority from '../../../components/common/PutPriority.vue';
import ConfirmModal from '../../../components/admin/ConfirmModal.vue';
import { SOCKET } from '../../../constants';
import { mapMutations, mapState } from 'vuex';
import courseApi from '../../../apis/course';

export default {
  name: 'DetailCourseListeningPending',
  components: {
    ButtonBack,
    Audio,
    MultipleChoice,
    ConfirmModal,
    MatchWord,
    PutPriority,
  },
  created() {
    this.AVATAR = AVATAR;
    this.RELOAD = RELOAD;
    this.ARROW_LEFT = ARROW_LEFT;
    this.MOUNTAIN_CLIMB = MOUNTAIN_CLIMB;
    this.paramName = this.$route.params.name;
    this.userID = this.$route.params.id;
    this.idCoursePendingLocal = JSON.parse(
      localStorage.getItem('idCoursePending'),
    );
  },
  watch: {
    listAnswers() {
      this.errorsMatching = [];
    },
    paramName(newVal) {
      this.courseName = newVal.split('-').join(' ');
    },
  },
  computed: {
    ...mapState('course', ['idCoursePending']),
  },
  methods: {
    resetResult() {
      this.submitMultipleChoice = false;
      this.submitMatching = false;
      this.submitPriority = false;
      this.errorsMultiple = [];
      this.errorsMatching = [];
      this.errorPriority = [];
      this.listAnswers.forEach((item) => {
        item.word = null;
      });
      this.myAnswer = [];
      this.inputPriority = [];
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
    showModalFill() {
      this.modalFillin = true;
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
    closeModalFillin() {
      this.modalFillin = false;
    },
    isMatchedRoute(routeName) {
      return this.$route.matched.some(({ name }) => {
        return name == routeName;
      });
    },
    setValuePriority(data) {
      this.inputPriority.push(+data.value);
    },
    onBack() {
      this.$router.push({ name: 'CoursePending' });
    },
    handleBack() {
      this.$router.push({ name: 'CoursePending' });
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
          if (!this.compareMultiple(this.correctAnswer[i], this.myAnswer[i])) {
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
      // priority
      if (!this.submitPriority) {
        for (let i = 0; i < this.listCorrectPriority.length; i++) {
          let checkPriority = this.comparePriority(
            this.listCorrectPriority[i],
            this.inputPriority[i],
          );
          this.errorPriority.push({ index: i, status: checkPriority });
        }
        this.submitPriority = true;
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
    /**
     * approve
     */
    async handleAcceptCourse() {
      try {
        const data = await courseApi.approvedCourse({
          id: this.idCoursePending || this.idCoursePendingLocal,
        });
        const dataSocket = {
          room: this.userID,
          kind: SOCKET.NOTIFY_COURSE_PENDING,
        };
        this.$socket.emit('joinRoom', dataSocket);
        let content = {
          data: data,
          kind: SOCKET.NOTIFY_COURSE_PENDING,
        };
        this.$socket.emit('sendSignal', content);
      } catch (error) {
        this.emitter.emit('isShowLoading', false);
        console.log(error);
      } finally {
        this.$router.push({ name: 'CoursePending' });
      }
      // ( call api)
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
      idCoursePendingLocal: null,
      numNotify: 0,
      userID: null,
      courseName: null,
      modalMuilti: false,
      modalMatch: false,
      modalFillin: false,
      submitPriority: false,
      submitMatching: false,
      submitMultipleChoice: false,
      checkTranscript: false,
      paramName: null,
      drag: false,
      errorPriority: [],
      inputPriority: [],
      listPriority: [
        { id: 1, question: 'I have an apple in my bag.' },
        { id: 2, question: 'I have an apple in my bag.' },
        {
          id: 3,
          question: 'I have an apple in my bag.I have an apple in my bag.',
        },
        { id: 4, question: 'I have an apple in my bag.' },
      ],
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
      listCorrectPriority: [1, 3, 2, 4],
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
.rotate-transition {
  transition: transform 0.5s ease-in-out;
}
</style>
