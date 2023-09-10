<template>
  <div class="create-course">
    <GroupBack title="Create Course" @back="changeBack" :hide-back="true" />
    <!-- title -->
    <div class="flex gap-10">
      <div class="flex mt-5 w-1/2">
        <div class="flex create-course__title">
          <div
            class="h-10 leading-10 text-primary_black text-left font-semibold text-base mr-2"
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
      <div class="flex mt-5 w-1/2">
        <div
          class="text-primary_black h-10 leading-10 text-left font-semibold text-base mr-5 create-course__title"
        >
          Background
        </div>
        <input
          v-model="color"
          class="input-color h-10 text-left w-full px-2 py-1 border cursor-pointer rounded-lg"
          ref="colorPicker"
          data-jscolor=""
          @input="colorTemp?.length < 3 ? (colorTemp = color) : null"
        />
      </div>
    </div>
    <div class="flex mt-5">
      <div
        class="h-10 leading-10 text-primary_black text-left font-semibold text-base create-course__subtitle"
      >
        Subtitle
      </div>
      <input
        type="text"
        class="w-full border rounded-lg form-control"
        spellcheck="false"
      />
    </div>
    <!-- listening -->
    <GroupBack title="Listening" extend-class="mt-5" />
    <Audio :data-prop="selectedAudio" />
    <GroupBack title="Transcript" extend-class="mt-5" />
    <Word :contentProp="content" @update="updateContent" />
    <GroupBack
      title="Listen to the dialogue above and choose the correct answer ( only 6 questions )"
      extend-class="mt-5"
    />
    <AddAnswer :data-questions="dataQuestion" @subtract="subtractQuestion" />
    <div class="flex items-center gap-5">
      <div
        @click="addQuestion"
        class="bg-primary w-max px-2 py-1 mt-3 cursor-pointer text-white text-lg rounded-xl font-semibold"
      >
        Add Question
      </div>
    </div>
    <GroupBack
      title="Listen to the dialogue above and match the beginnings and endings of the phrases ( only 5 questions )"
      extend-class="text-left mt-5"
    />
    <div class="text-primary_black font-semibold mt-2 text-left">
      Phrases or words that need to be filled in
    </div>
    <div class="flex gap-2 items-center w-full flex-wrap">
      <div
        v-for="(item, index) in numWords"
        :key="index"
        class="flex items-center"
      >
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
          class="ml-2 text-sm text-red-500 cursor-pointer"
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
    <GroupBack title="Put the tasks in order of priority" extend-class="mt-5" />
    <PutTask :data-put-tasks="dataPutTasks" />
  </div>
</template>
<script>
import jscolor from '@eastdesire/jscolor';
import GroupBack from '../../../components/common/GroupBack.vue';
import Audio from '../../../components/common/Audio.vue';
import Word from '../../../components/common/Editor.vue';
import AddAnswer from '../../../components/common/AddAnswer.vue';
import FillWord from '../../../components/common/FillWord.vue';
import PutTask from '../../../components/common/PutTask.vue';
import { STAR_RED } from '../../../constants/image';
import { NOTIFY_MESSAGE } from '../../../constants/index';
import { notification } from 'ant-design-vue';

export default {
  name: 'CreateCourse',
  components: { GroupBack, Audio, Word, AddAnswer, FillWord, PutTask },
  created() {
    this.handleEditColor();
    this.NOTIFY_MESSAGE = NOTIFY_MESSAGE;
    this.STAR_RED = STAR_RED;
  },

  methods: {
    setIsFocused(index) {
      this.indexFocus = index;
    },
    subtractWord(index) {
      this.word.splice(index, 1);
      this.numWords--;
    },
    changeBack() {
      this.$router.push({ name: 'Course' });
    },
    addWord() {
      if (this.numWords <= 4) this.numWords++;
      else notification.error({ message: NOTIFY_MESSAGE.ADD_WORD });
    },
    addQuestion() {
      if (this.dataQuestion.length <= 5)
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
     * @description show colorPicker and resolve value color when user choose any color
     * @returns {void}
     */
    handleEditColor() {
      this.colorTemp = this.color;
      // NOTE: Waitting DOM is updated before we access into DOM
      this.$nextTick(() => {
        this.colorPickerTemp = new jscolor(this.$refs.colorPicker, {
          width: 120,
          position: 'bottom',
        });
        // NOTE: always set jscolor.init() before always show to set changing color
        jscolor.init();
        // this.colorPickerTemp.show();
      });
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
  computed: {},

  data() {
    return {
      title: '',
      indexFocus: null,
      numWords: 1,
      word: [],
      dataQuestion: [
        {
          title: '',
          answers: [],
        },
      ],
      dataWords: [
        { id: 1, contentLeft: '', contentRight: '' },
        { id: 2, contentLeft: '', contentRight: '' },
        { id: 3, contentLeft: '', contentRight: '' },
        { id: 4, contentLeft: '', contentRight: '' },
        { id: 5, contentLeft: '', contentRight: '' },
      ],
      dataPutTasks: [
        { id: 1, contentLeft: '', contentRight: '' },
        { id: 2, contentLeft: '', contentRight: '' },
        { id: 3, contentLeft: '', contentRight: '' },
        { id: 4, contentLeft: '', contentRight: '' },
      ],
      color: '#000000',
      colorTemp: '',
      colorPickerTemp: '',
      selectedAudio: null,
    };
  },
};
</script>

<style lang="scss">
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
