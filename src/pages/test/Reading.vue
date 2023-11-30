<template>
  <div class="mx-2 mt-6">
    <ButtonBack
      v-if="this.$route.name == 'TestLevelReading'"
      title="ABC"
      extend-class="mb-5"
      @back="handleBack"
      :hide-back="true"
    />
    <div class="flex items-center w-full">
      <div class="bg-primary_line course-line w-full" />
      <div class="text-lg text-primary_black font-semibold w-full">
        Reading Test
      </div>
      <div class="bg-primary_line course-line w-full" />
    </div>
    <div class="detail-field mx-auto mt-5">
      <div
        class="detail-image border-gray-100 border-t-0 border ml-2 mr-10"
        :style="{ backgroundImage: 'url(' + MOUNTAIN_CLIMB + ')' }"
      />
    </div>
    <ButtonBack title="Reading text" extend-class="mt-5" />
    <div
      class="text-left detail-text mt-5"
      v-html="
        `<div>When you picture mountain climbers scaling Mount Everest, what probably comes to mind are teams of climbers with Sherpa guides leading them to the summit, equipped with oxygen masks, supplies and tents. And in most cases you'd be right, as 97 per cent of climbers use oxygen to ascend to Everest's summit at 8,850 metres above sea level. The thin air at high altitudes makes most people breathless at 3,500 metres, and the vast majority of climbers use oxygen past 7,000 metres. A typical climbing group will have 8–15 people in it, with an almost equal number of guides, and they'll spend weeks to get to the top after reaching Base Camp.
  But ultra-distance and mountain runner Kilian Jornet Burgada ascended the mountain in May 2017 alone, without an oxygen mask or fixed ropes for climbing.
  Oh, and he did it in 26 hours.
  With food poisoning.
  And then, five days later, he did it again, this time in only 17 hours.
  Born in 1987, Kilian has been training for Everest his whole life. And that really does mean his whole life, as he grew up 2,000 metres above sea level in the Pyrenees in the ski resort of Lles de Cerdanya in Catalonia, north-eastern Spain. While other children his age were learning to walk, Kilian was on skis. At one and a half years old he did a five-hour hike with his mother, entirely under his own steam. He left his peers even further behind when he climbed his first mountain and competed in his first cross-country ski race at age three. By age seven, he had scaled a 4,000er and, at ten, he did a 42-day crossing of the Pyrenees.
  He was 13 when he says he started to take it 'seriously' and trained with the Ski Mountaineering Technical Centre (CTEMC) in Catalonia, entering competitions and working with a coach. At 18, he took over his own ski-mountaineering and trail-running training, with a schedule that only allows a couple of weeks of rest a year. He does as many as 1,140 hours of endurance training a year, plus strength training and technical workouts as well as specific training in the week before a race. For his record-breaking ascent and descent of the Matterhorn, he prepared by climbing the mountain ten times until he knew every detail of it, even including where the sun would be shining at every part of the day.
  Sleeping only seven hours a night, Kilian Jornet seems almost superhuman. His resting heartbeat is extremely low at 33 beats per minute, compared with the average man's 60 per minute or an athlete's 40 per minute. He breathes more efficiently than average people too, taking in more oxygen per breath, and he has a much faster recovery time after exercise as his body quickly breaks down lactic acid – the acid in muscles that causes pain after exercise.
  All this is thanks to his childhood in the mountains and to genetics, but it is his mental strength that sets him apart. He often sets himself challenges to see how long he can endure difficult conditions in order to truly understand what his body and mind can cope with. For example, he almost gave himself kidney failure after only drinking 3.5 litres of water on a 100km run in temperatures of around 40°C.
  It would take a book to list all the races and awards he's won and the mountains he's climbed. And even here, Kilian’s achievements exceed the average person as, somehow, he finds time to record his career on his blog and has written three books, Run or Die, The Invisible Border and Summits of My Life.</div>`
      "
    />
    <ButtonBack
      title="Read the passage above and choose the correct"
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
    <div class="flex justify-center gap-20 items-center py-5 text-base">
      <div v-if="this.$route.name != 'TestLevelReading'" class="flex gap-20">
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
      <div v-else class="flex gap-20 items-center">
        <div
          class="cursor-pointer font-semibold rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="goToEdit"
        >
          <span class="text-base text-primary">Edit</span>
        </div>
        <div
          @click="handleTest"
          class="cursor-pointer font-semibold rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
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
    :showModal="modalNotifyLevel"
    @closeModal="closeModalNotifyLevel"
    @save="closeModalNotifyLevel"
    :showFooter="false"
    :widthCustom="500"
  >
    <template #icon>
      <img :src="CONGRATULATION" alt="" srcset="" class="h-10 w-10" />
    </template>
    <template #content>
      <div class="text-base flex">
        You scored
        <div class="font-medium">&nbsp;{{ 25 - error }}&nbsp;</div>
        of 25 answers
      </div>
      <div class="text-base flex">
        You have reached
        <div class="font-medium">&nbsp;{{ level }}&nbsp;</div>
        level
      </div>
    </template>
    <template #select>
      <div class="flex gap-10 mt-2">
        <div
          class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="cancelHideModal"
        >
          <span class="text-base text-primary">Cancel</span>
        </div>
        <div
          class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="acceptShowModal"
        >
          <span class="text-base text-white">OK</span>
        </div>
      </div>
    </template>
  </ConfirmModal>
  <!-- back -->
  <ConfirmModal
    :showModal="modalBack"
    @closeModal="closeModalBack"
    @save="closeModalBack"
    :showFooter="false"
    :widthCustom="500"
  >
    <template #icon>
      <img :src="WARNING" alt="" srcset="" class="h-10 w-10" />
    </template>
    <template #content>
      <div class="text-primary_black my-2">
        Previous answers will be deleted
      </div>
    </template>
    <template #select>
      <div class="flex gap-10 mt-2">
        <div
          class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="cancelHideModalBack"
        >
          <span class="text-base text-primary">Cancel</span>
        </div>
        <div
          class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="acceptShowModalBack"
        >
          <span class="text-base text-white">OK</span>
        </div>
      </div>
    </template>
  </ConfirmModal>
</template>
<script>
import ConfirmModal from '../../components/admin/ConfirmModal.vue';
import ButtonBack from '../../components/common/ButtonBack.vue';
import MultipleChoice from '../../components/common/MultipleChoice.vue';
import {
  ARROW_LEFT,
  MOUNTAIN_CLIMB,
  CONGRATULATION,
  WARNING,
  RELOAD,
} from '../../constants/image';
import { mapState, mapMutations } from 'vuex';
import userApi from '../../apis/user';
export default {
  name: 'ReadingTest',
  components: { ButtonBack, MultipleChoice, ConfirmModal },
  created() {
    this.RELOAD = RELOAD;
    this.WARNING = WARNING;
    this.CONGRATULATION = CONGRATULATION;
    this.ARROW_LEFT = ARROW_LEFT;
    this.MOUNTAIN_CLIMB = MOUNTAIN_CLIMB;
    this.userInfor = JSON.parse(localStorage.getItem('user'));
    setTimeout(() => {
      this.numberErrors = +localStorage.getItem('error');
    }, 0);
  },
  watch: {
    listAnswers() {
      this.errorsMatching = [];
    },
  },
  computed: {
    ...mapState('auth', ['error']),
    level() {
      if (this.error >= 20) return 'Beginner';
      else if (10 <= this.error && this.error < 20) return 'Intermediate';
      else return 'Advanced';
    },
  },
  methods: {
    handleBack() {
      this.$router.push({ name: 'Test' });
    },
    goToEdit() {
      this.$router.push({ name: 'TestLevelReadingUpdate' });
    },
    resetResult() {
      this.myAnswer = [];
      this.errorsMultiple = [];
      this.numberErrors = 0;
      this.rotation += 360;
    },
    async checkLevel() {
      if (this.error >= 20) {
        await userApi.updateLevel({
          user: {
            uid: this.userInfor.email,
          },
          level: 1,
        });
      } else if (10 <= this.error && this.error < 20) {
        await userApi.updateLevel({
          user: {
            uid: this.userInfor.email,
          },
          level: 2,
        });
      } else if (this.error < 10) {
        await userApi.updateLevel({
          user: {
            uid: this.userInfor.email,
          },
          level: 3,
        });
      }
    },
    acceptShowModal() {
      this.modalNotifyLevel = false;
      this.$router.push({ name: 'HomeUser' });
    },
    cancelHideModal() {
      this.modalNotifyLevel = false;
    },
    acceptShowModalBack() {
      if (this.modalBack) {
        this.$router.push({ name: 'ListeningTest' });
        this.modalBack = false;
      }
    },
    cancelHideModalBack() {
      this.modalBack = false;
    },
    closeModalNotifyLevel() {
      this.modalNotifyLevel = false;
    },
    onBack() {
      this.modalBack = true;
    },
    getAnswerMultichoice(data) {
      this.myAnswer = data;
    },
    compareMultiple(valueA, valueB) {
      return JSON.stringify(valueA) === JSON.stringify(valueB);
    },
    handleTest() {
      if (!this.submitMultipleChoice) {
        this.errorsMultiple = [];
        for (let i = 0; i < this.dataMultipleChoice.length; i++) {
          if (
            this.compareMultiple(this.correctAnswer[i], this.myAnswer[i]) ==
            false
          ) {
            this.errorsMultiple.push(this.dataMultipleChoice[i].id);
          }
        }
        this.submitMultipleChoice = true;
      }
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
      if (this.submitMultipleChoice) {
        this.$nextTick(() => {
          this.numberErrors = +localStorage.getItem('error');
          this.modalNotifyLevel = true;
          this.checkLevel();
        });
      }
    },
  },
  data() {
    return {
      rotation: 0,
      userInfor: null,
      modalBack: false,
      modalNotifyLevel: false,
      numberErrors: 0,
      submitMultipleChoice: false,
      errorsMultiple: [],
      myAnswer: [],
      correctAnswer: [1, 2, 3, 4, 1, 2, 1, 2, 3, 4],
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
        {
          id: 6,
          title: 'Mary ask :',
          question: [
            'Do you have breakfast? Do you have breakfast ? Do you have breakfast ?',
            'Do you have lunch?',
            'Do you have dinner?',
            'I’m hungry all day.',
          ],
        },
        {
          id: 7,
          title: 'Mary ask :',
          question: [
            'Do you have breakfast? Do you have breakfast? Do you have breakfast ?',
            'Do you have lunch?',
            'Do you have dinner?',
            'I’m hungry all day.',
          ],
        },
        {
          id: 8,
          title: 'Mary ask :',
          question: [
            'Do you have breakfast? Do you have breakfast? Do you have breakfast?',
            'Do you have lunch?',
            'Do you have dinner?',
            'I’m hungry all day.',
          ],
        },
        {
          id: 9,
          title: 'Mary ask :',
          question: [
            'Do you have breakfast? Do you have breakfast? Do you have breakfast?',
            'Do you have lunch?',
            'Do you have dinner?',
            'I’m hungry all day.',
          ],
        },
      ],
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
    height: 500px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
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
  &-text {
    padding: 12px;
    border-radius: 20px;
    border: 1px solid #eae4e4;
    box-shadow: -4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
}
.rotate-transition {
  transition: transform 1s ease-in-out;
}
</style>
