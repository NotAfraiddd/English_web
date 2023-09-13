<template>
  <div>
    <ButtonBack title="Course Listening" :hide-back="true" @back="onBack" />
    <div class="flex flex-col mt-5">
      <div class="detail-field mx-auto">
        <img :src="MOUNTAIN_CLIMB" alt="" srcset="" class="detail-image" />
      </div>
      <Audio :data-prop="selectedAudio" :hideChoose="false" />

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
              `<p>Susanne: Hi, Mario. Can you help me prepare some things for the next month?<br>Mario: OK, sure. What can I help you with?<br>Susanne: I need to visit the customer in Germany. It's important.<br>Mario: What can I do to help?<br>Susanne: Can you send an email to the customer? Ask them when I can visit them next week. Please do this first. It's a priority and very urgent.<br>Mario: Right. I'll do it today.<br>Susanne: Thanks. This next task is also important. Can you invite everyone to the next team meeting?<br>Mario: Yes, I will.<br>Susanne: But first you need to book a meeting room. After that, please send everyone an email about it.<br>Mario: Yes, of course.<br>Susanne: And finally, can you write a short report about our new project? I have to give a presentation to our managers next month. Please do it when you have time &ndash; sometime in the next two or three weeks. It's not too urgent.<br>Mario: Sure, no problem. I can do it this week.<br>Susanne: There's no hurry. Take your time.</p>`
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonBack from '../../../components/common/ButtonBack.vue';
import Audio from '../../../components/common/Audio.vue';
import { ARROW_LEFT, MOUNTAIN_CLIMB } from '../../../constants/image';
export default {
  name: 'DetailCourseListening',
  components: { ButtonBack, Audio },
  created() {
    this.ARROW_LEFT = ARROW_LEFT;
    this.MOUNTAIN_CLIMB = MOUNTAIN_CLIMB;
  },
  methods: {
    goToDetailCourse(data) {
      console.log(data);
    },
    showTranscript() {
      this.transcript = !this.transcript;
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
}

.detail-transcript {
  overflow: hidden;
  left: 0;
  height: 0;
  transition: height 0.65s ease, opacity 0.65s ease;
  top: 80px;
  width: 100%;
  box-shadow: -4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
}

.detail-transcript.open {
  height: 200px !important;
  opacity: 1;
  transform: translateY(0);
}

.detail-arrow {
  transition: transform 0.2s;
  transform-origin: center;
}
</style>
