<template>
  <div>
    <ButtonBack title="Course Listening" :hide-back="true" @back="onBack" />
    <div class="flex flex-col mt-5">
      <div class="detail-field mx-auto">
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
            @setValue="getAnswerFromUser"
            :correctAnswer="correctAnswer"
            :errors="errors"
          />
        </div>
      </div>
      <ButtonBack
        title="Listen to the dialogue above and match the beginnings and endings of the phrases"
        extend-class="mt-5"
      />
    </div>
    <div class="detail-match-word p-5 border mt-5 rounded-2xl">
      <div class="bg-primary h-16 rounded-xl flex items-center flex-1">
        <Draggable
          v-model="dataListWords"
          group="people"
          @start="drag = true"
          @end="drag = false"
          item-key="id"
          style="display: flex; justify-content: space-around; flex-grow: 1"
        >
          <template #item="{ element }">
            <div
              class="w-max px-3 bg-white text-primary h-10 leading-10 rounded-xl text-base cursor-pointer"
            >
              {{ element.word }}
            </div>
          </template>
        </Draggable>
      </div>
      <div class="flex items-start justify-between text-base mt-3 pr-32">
        <div>
          <div
            v-for="(item, index) in listSentences"
            :key="index"
            class="text-left mt-2"
          >
            {{ index + 1 }}.{{ item.vedau }}__{{ item.vesau }}
          </div>
        </div>
        <div class="h-40 w-40 list-2">
          <Draggable
            v-model="listAnswers"
            group="people"
            @start="onDragStart"
            @end="onDragEnd"
            item-key="id"
            style="display: flex; flex-direction: column; gap: 4px"
          >
            <template #item="{ element }">
              <div
                class="border border-primary w-40 h-7 cursor-pointer rounded-lg"
              >
                {{ element.word }}
              </div>
            </template>
          </Draggable>
        </div>
      </div>
    </div>
    <div
      @click="handleSubmit"
      class="bg-primary w-max px-2 py-1 text-white text-lg rounded-xl font-semibold cursor-pointer"
    >
      Okay
    </div>
  </div>
</template>
<script>
import ButtonBack from '../../../components/common/ButtonBack.vue';
import Audio from '../../../components/common/Audio.vue';
import { ARROW_LEFT, MOUNTAIN_CLIMB } from '../../../constants/image';
import MultipleChoice from '../../../components/common/MultipleChoice.vue';
import { mapMutations, mapState } from 'vuex';
import Draggable from 'vuedraggable';
export default {
  name: 'DetailCourseListening',
  components: { ButtonBack, Audio, MultipleChoice, Draggable },
  created() {
    this.ARROW_LEFT = ARROW_LEFT;
    this.MOUNTAIN_CLIMB = MOUNTAIN_CLIMB;
  },
  watch: {
    listAnswers(newValue) {
      const temp = [];
      const filteredArr = newValue.filter((item) => {
        temp.push({ id: item.id, word: item.word });
        console.log(temp);
        console.log(item.word, item.id);
        item.word !== null && item.word !== '';
      });
      filteredArr.forEach((item) => console.log(item.word));
    },
  },
  methods: {
    ...mapMutations('course', ['setSubmit']),
    onDragStart() {
      this.drag = true;
    },
    onDragEnd() {
      this.drag = false;
    },
    getAnswerFromUser(data) {
      this.myAnswer = data;
    },
    compareArrays(valueA, valueB) {
      return JSON.stringify(valueA) === JSON.stringify(valueB);
    },
    handleSubmit() {
      this.setSubmit(true);
      this.errors = [];
      for (let i = 0; i < this.dataMultipleChoice.length; i++) {
        if (
          this.compareArrays(this.correctAnswer[i], this.myAnswer[i]) == false
        ) {
          this.errors.push(this.dataMultipleChoice[i].id + 1);
        }
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
      drag: false,
      listSentences: [
        {
          id: 1,
          vedau: 'I have',
          vesau: ' in my bag.',
          word: 'an apple',
        },
        {
          id: 2,
          vedau: 'Susan and John go',
          vesau: 'with theirs parent today.',
          word: 'have breakfast',
        },
        {
          id: 3,
          vedau: 'I have',
          vesau: ' in my bag.',
          word: 'an apple',
        },
        {
          id: 4,
          vedau: 'Susan and John go',
          vesau: 'with theirs parent today.',
          word: 'have breakfast',
        },
        {
          id: 5,
          vedau: 'I have',
          vesau: ' in my bag.',
          word: 'an apple',
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
        { id: 1, word: 'at the school' },
        { id: 2, word: 'apple' },
        { id: 3, word: 'at the school' },
        { id: 4, word: 'at the school' },
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
      errors: [],
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
  top: 75px;
  width: 100%;
  box-shadow: -4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
}

.detail-arrow {
  transition: transform 0.2s;
  transform-origin: center;
}
</style>
