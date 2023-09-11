<template>
  <div class="create-course pb-5">
    <div v-if="screen === UI.UI_LISTENING">
      <ButtonBack title="Create Course" @back="changeBack" :hide-back="true" />
      <!-- title -->
      <div class="flex gap-10">
        <div class="flex mt-5 w-full">
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
      <ButtonBack title="Listening" extend-class="mt-5" />
      <ImageUpload :src-img="AVATAR" />
      <Audio :data-prop="selectedAudio" />
      <ButtonBack title="Transcript" extend-class="mt-5" />
      <Word :contentProp="contentListening" @update="updateContentListening" />
      <ButtonBack
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
      <ButtonBack
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
      <ButtonBack
        title="Put the tasks in order of priority"
        extend-class="mt-5"
      />
      <PutTask :data-put-tasks="dataPutTasks" />
      <div
        @click="changeReading"
        class="bg-primary btn-countinue w-max px-2 py-1 text-white text-lg rounded-xl font-semibold cursor-pointer mt-5 flex mx-auto"
      >
        Continue
      </div>
    </div>
    <!-- Reading -->
    <div v-else>
      <ButtonBack title="Reading" extend-class="mt-5" />
      <ImageUpload :src-img="STAR_RED" />
      <ButtonBack title="Reading text" extend-class="mt-5" />
      <Word :contentProp="contentReading" @update="updateContentReading" />
      <ButtonBack
        title="Read the passage above and choose the correct"
        extend-class="mt-5"
      />
      <AddAnswer
        :data-questions="dataQuestionReading"
        @subtract="subtractQuestionReading"
      />
      <div class="flex items-center gap-5">
        <div
          @click="addQuestionReading"
          class="bg-primary w-max px-2 py-1 mt-3 cursor-pointer text-white text-lg rounded-xl font-semibold"
        >
          Add Question
        </div>
      </div>
      <GroupButton @coutinue="createCourse" @back="changeListening" />
    </div>
  </div>
</template>
<script>
import jscolor from '@eastdesire/jscolor';
import ButtonBack from '../../../components/common/ButtonBack.vue';
import ImageUpload from '../../../components/common/ImageUpload.vue';
import Audio from '../../../components/common/Audio.vue';
import Word from '../../../components/common/Editor.vue';
import AddAnswer from '../../../components/common/AddAnswer.vue';
import FillWord from '../../../components/common/FillWord.vue';
import PutTask from '../../../components/common/PutTask.vue';
import { STAR_RED, AVATAR } from '../../../constants/image';
import { NOTIFY_MESSAGE, UI } from '../../../constants/index';
import { notification } from 'ant-design-vue';
import GroupButton from '../../../components/common/GroupButton.vue';

export default {
  name: 'CreateCourse',
  components: {
    ButtonBack,
    Audio,
    Word,
    AddAnswer,
    FillWord,
    PutTask,
    ImageUpload,
    GroupButton,
  },
  created() {
    this.UI = UI;
    this.NOTIFY_MESSAGE = NOTIFY_MESSAGE;
    this.AVATAR = AVATAR;
    this.STAR_RED = STAR_RED;
  },

  methods: {
    updateContentListening(data) {
      this.contentListening = data;
    },
    updateContentReading(data) {
      this.contentReading = data;
    },
    setIsFocused(index) {
      this.indexFocus = index;
    },
    changeListening() {
      this.screen = UI.UI_LISTENING;
    },
    changeReading() {
      this.screen = UI.UI_READING;
    },
    subtractWord(index) {
      this.word.splice(index, 1);
      this.numWords--;
    },
    createCourse() {
      notification.success({ message: NOTIFY_MESSAGE.CREATE_SUCCESS });
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
    addQuestionReading() {
      if (this.dataQuestionReading.length <= 5)
        this.dataQuestionReading.push({
          title: '',
          answers: [],
        });
      else notification.error({ message: NOTIFY_MESSAGE.ADD_QUESTION });
    },
    subtractQuestion(data) {
      this.dataQuestion.splice(data, 1);
    },
    subtractQuestionReading(data) {
      this.dataQuestionReading.splice(data, 1);
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
      contentListening: '',
      contentReading: '',
      screen: UI.UI_LISTENING,
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
      dataQuestionReading: [
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
        { id: 1, content: '' },
        { id: 2, content: '' },
        { id: 3, content: '' },
        { id: 4, content: '' },
      ],
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
