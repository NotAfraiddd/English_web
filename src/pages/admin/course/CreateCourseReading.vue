<template>
  <div class="create-course pb-5">
    <!-- Reading -->
    <div>
      <ButtonBack
        title="Reading"
        extend-class="mt-5"
        hide-back="true"
        @back="changeBack"
      />
      <ImageUpload :src-img="STAR_RED" title="" />
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
    </div>
    <div class="border-t border-primary_line mt-5" />
    <div class="flex">
      <div
        @click="cancelCreate"
        class="border border-primary btn-countinue w-32 text-center px-2 py-1 text-primary hover:opacity-70 text-lg rounded-xl font-semibold cursor-pointer mt-5 mx-auto"
      >
        Cancel
      </div>
      <div
        @click="createCourse"
        class="bg-primary btn-countinue w-32 text-center px-2 py-1 text-white text-lg hover:opacity-70 rounded-xl font-semibold cursor-pointer mt-5 mx-auto"
      >
        Create
      </div>
    </div>
  </div>
</template>
<script>
import ButtonBack from '../../../components/common/ButtonBack.vue';
import ImageUpload from '../../../components/common/ImageUpload.vue';
import Word from '../../../components/common/Editor.vue';
import AddAnswer from '../../../components/common/AddAnswer.vue';
import { STAR_RED, AVATAR } from '../../../constants/image';
import { NOTIFY_MESSAGE } from '../../../constants/index';
import { notification } from 'ant-design-vue';

export default {
  name: 'CreateCourseReading',
  components: {
    ButtonBack,
    Word,
    AddAnswer,
    ImageUpload,
  },
  created() {
    this.NOTIFY_MESSAGE = NOTIFY_MESSAGE;
    this.AVATAR = AVATAR;
    this.STAR_RED = STAR_RED;
  },

  methods: {
    updateContentReading(data) {
      this.contentReading = data;
    },
    createCourse() {
      notification.success({ message: NOTIFY_MESSAGE.CREATE_SUCCESS });
    },
    cancelCreate() {
      this.$router.push({ name: 'CourseReading' });
    },
    changeBack() {
      this.$router.push({ name: 'CourseReading' });
    },
    addQuestionReading() {
      if (this.dataQuestionReading.length <= 5)
        this.dataQuestionReading.push({
          title: '',
          answers: [],
        });
      else notification.error({ message: NOTIFY_MESSAGE.ADD_QUESTION });
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
      contentReading: '',
      title: '',
      dataQuestionReading: [
        {
          title: '',
          answers: [],
        },
      ],
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
