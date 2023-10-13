<template>
  <div class="mx-2">
    <ButtonBack title="Detail Grammar" :hide-back="true" @back="onBack" />
    <div class="detail-field mx-auto mt-5">
      <div
        class="detail-image border-gray-100 border-t-0 border ml-2 mr-10"
        :style="{ backgroundImage: 'url(' + MOUNTAIN_CLIMB + ')' }"
      />
    </div>
    <div class="font-semibold text-2xl text-left">Grammar explanation</div>
    <div class="text-base text-left mt-2">
      Some adjectives go with certain prepositions. There are no grammatical
      rules for which preposition is used with which adjective, so it's a good
      idea to try to learn them together. To help you do this, write new
      vocabulary in your notebook in a sentence or phrase. However, there are
      some patterns that can help you. Let's look at them first. Remember that a
      preposition is followed by a noun or a gerund (-ing form).
    </div>
    <div class="flex flex-col mt-2 items-start">
      <div class="font-semibold text-2xl">
        With
        <i>at</i>
      </div>
      <div>
        We use at with adjectives like good/bad/amazing/brilliant/terrible, etc.
        to talk about skills and abilities.
      </div>
      <div class="flex gap-6">
        <div class="w-1 mt-2 h-auto bg-primary" />
        <div class="mt-2 flex flex-col">
          <i>
            He's really
            <b>good at</b>
            English.
          </i>
          <i>
            He's really
            <b>good at</b>
            English.
          </i>
          <i>
            He's really
            <b>good at</b>
            English.
          </i>
          <i>
            He's really
            <b>good at</b>
            English.
          </i>
        </div>
      </div>
      <MultipleChoice
        :data="dataMultipleChoice"
        @setValue="getAnswerMultichoice"
        :correctAnswer="correctAnswer"
        :errors="errorsMultiple"
      />
      <div class="flex justify-center w-full gap-40 mb-4">
        <div
          class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
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
import MultipleChoice from '../../../components/common/MultipleChoice.vue';
import { ARROW_LEFT, MOUNTAIN_CLIMB } from '../../../constants/image';

import { mapMutations, mapState } from 'vuex';
export default {
  name: 'DetailCourseGrammar',
  components: { ButtonBack, MultipleChoice },
  created() {
    this.ARROW_LEFT = ARROW_LEFT;
    this.MOUNTAIN_CLIMB = MOUNTAIN_CLIMB;
    this.paramName = this.$route.params.name;
  },
  watch: {},
  methods: {
    ...mapMutations('course', ['setSubmit']),
    isMatchedRoute(routeName) {
      return this.$route.matched.some(({ name }) => {
        return name == routeName;
      });
    },
    onBack() {
      if (this.isMatchedRoute('MemberDetailCourseGrammar'))
        this.$router.push({ name: 'Grammar' });
      // else this.$router.push({ name: 'CourseReading' });
    },
    handleUpdate() {
      this.$router.push({
        name: 'CreateCourseReading',
        params: { name: this.paramName },
      });
    },
    getAnswerMultichoice(data) {
      this.myAnswer = data;
    },
    compareMultiple(valueA, valueB) {
      return JSON.stringify(valueA) === JSON.stringify(valueB);
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
    },
  },
  data() {
    return {
      paramName: null,
      errorsMultiple: [],
      myAnswer: [],
      correctAnswer: [1, 2, 3, 4, 1, 2, 1, 2, 3],
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
      ],
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
</style>
