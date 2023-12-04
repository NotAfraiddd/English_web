<template>
  <div class="mx-2">
    <ButtonBack title="Detail Reading" :hide-back="true" @back="onBack" />
    <div class="flex items-center w-full my-10">
      <div class="bg-primary_line course-line w-full" />
      <div class="text-lg text-primary_black font-semibold w-full">
        {{ title }}
      </div>
      <div class="bg-primary_line course-line w-full" />
    </div>
    <div class="detail-field mx-auto mt-5">
      <img
        class="detail-image border-gray-100 border-t-0 border ml-2 mr-10 object-cover w-full"
        :src="imgURL == null ? MOUNTAIN_CLIMB : imgURL"
        alt=""
      />
    </div>
    <ButtonBack title="Reading text" extend-class="mt-5" />
    <div class="text-left detail-text mt-5" v-html="textContent" />
    <div class="flex items-center flex-wrap mt-5 gap-5">
      <ButtonBack title="Read the passage above and choose the correct" />
      <div
        v-if="userInfor.role == 'ADMIN' && checkRoute"
        class="h-6 border-orange border rounded-xl flex items-center"
      >
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
    <div class="flex justify-center gap-20 items-center py-5 text-base mt-10">
      <div v-if="!isMatchedRoute('MemberDetailCourseReading')">
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
          <img
            :src="RELOAD"
            alt=""
            class="w-5 h-5 rotate-transition"
            @click="resetResult"
            :style="{ transform: 'rotate(' + 360 + 'deg)' }"
          />
        </div>
      </div>
      <div v-else class="flex gap-20 items-center">
        <div
          class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="onBack"
        >
          <span class="text-base text-primary">Back</span>
        </div>
        <div
          @click="handleSubmit"
          class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
        >
          Submit
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
</template>
<script>
import { notification } from 'ant-design-vue';
import ButtonBack from '../../../components/common/ButtonBack.vue';
import MultipleChoice from '../../../components/common/MultipleChoice.vue';
import { ARROW_LEFT, MOUNTAIN_CLIMB, RELOAD } from '../../../constants/image';
import { mapMutations, mapState } from 'vuex';
import ConfirmModal from '../../../components/admin/ConfirmModal.vue';
import courseApi from '../../../apis/course';
import userApi from '../../../apis/user';
export default {
  name: 'DetailCourseReading',
  components: { ButtonBack, MultipleChoice, ConfirmModal },
  created() {
    this.RELOAD = RELOAD;
    this.ARROW_LEFT = ARROW_LEFT;
    this.MOUNTAIN_CLIMB = MOUNTAIN_CLIMB;
    this.paramName = this.$route.params.name;
    this.userInfor = JSON.parse(localStorage.getItem('user'));
    this.IDCourseAttemp = JSON.parse(localStorage.getItem('idCourseAttemp'));
    this.IDCourse = JSON.parse(localStorage.getItem('IDCourse'));
    this.idSession = +this.$route.params.id;
    this.getDetailSession();
    if (this.userInfor) {
      this.getIdSectionAttemp();
    }
  },
  watch: {
    listAnswers() {
      this.errorsMatching = [];
    },
  },
  computed: {
    checkRoute() {
      if (
        this.isMatchedRoute('Dashboard') ||
        this.isMatchedRoute('BlogPending') ||
        this.isMatchedRoute('DetailBlogPending') ||
        this.isMatchedRoute('CoursePending') ||
        this.isMatchedRoute('Course') ||
        this.isMatchedRoute('CreateCourse') ||
        this.isMatchedRoute('Member') ||
        this.isMatchedRoute('CourseListening') ||
        this.isMatchedRoute('CourseReading') ||
        this.isMatchedRoute('DetailCourseListening') ||
        this.isMatchedRoute('DetailCourseReading') ||
        this.isMatchedRoute('DetailCourseListeningPending') ||
        this.isMatchedRoute('CreateCourseListening') ||
        this.isMatchedRoute('CreateCourseReading') ||
        this.isMatchedRoute('AdminDetail') ||
        this.isMatchedRoute('MemberDetail') ||
        this.isMatchedRoute('CommentReported')
      )
        return true;
      return false;
    },
  },

  methods: {
    ...mapMutations('course', ['setSubmit']),
    getIdSectionAttemp() {
      const checkCourseAttemp = this.userInfor.courseAttemptList.find(
        (item) => item.course.id == this.IDCourse,
      );
      const checkSectionAttemp =
        checkCourseAttemp.readingSectionAttemptList.find(
          (item) => item.readingSection.id == this.idSession,
        );
      this.IDSectionAttemp = checkSectionAttemp.id;
    },
    /**
     * get detail session
     */
    async getDetailSession() {
      try {
        this.emitter.emit('isShowLoading', true);
        const detailSession = await courseApi.getReadingSessionByID({
          id: this.idSession,
        });
        this.title = detailSession?.title;
        this.textContent = detailSession?.textContent;
        this.imgURL = detailSession?.imgURL;
        detailSession?.questionList.forEach((item, index) => {
          this.dataMultipleChoice.push({
            id: index + 1,
            title: item.questionContent,
            question: item.options.map((item) => item.content),
          });
          this.correctAnswer.push(+item.correctAnswer);
        });
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    /**
     * show modal
     */
    showModalMuilti() {
      this.modalMuilti = true;
    },
    /**
     * close modal
     */
    closeModalMuilti() {
      this.modalMuilti = false;
    },
    resetResult() {
      this.submitMultipleChoice = false;
      this.errorsMultiple = [];
      this.myAnswer = [];
      this.rotation += 360;
    },
    isMatchedRoute(routeName) {
      return this.$route.matched.some(({ name }) => {
        return name == routeName;
      });
    },
    onBack() {
      if (this.isMatchedRoute('MemberDetailCourseReading'))
        this.$router.push({ name: 'ListCourseReading' });
      else this.$router.push({ name: 'CourseReading' });
    },
    handleUpdate() {
      this.$router.push({
        name: 'UpdateCourseReading',
        params: { id: this.idSession },
      });
    },
    getAnswerMultichoice(data) {
      this.myAnswer = data;
    },
    compareMultiple(valueA, valueB) {
      return JSON.stringify(valueA) === JSON.stringify(valueB);
    },
    handleSubmit() {
      if (!this.submitMultipleChoice) {
        this.errorsMultiple = [];
        for (let i = 0; i < this.dataMultipleChoice.length; i++) {
          if (!this.compareMultiple(this.correctAnswer[i], this.myAnswer[i])) {
            this.errorsMultiple.push(this.dataMultipleChoice[i].id);
          }
        }
        this.submitMultipleChoice = true;
        if (this.errorsMultiple.length == 0) {
          notification.success({ message: 'Success' });
          this.submitSectionAttemp();
        } else {
          notification.warning({
            message:
              'You must complete everything before going to the next session',
          });
        }
      }
    },
    async submitSectionAttemp() {
      try {
        this.emitter.emit('isShowLoading', true);
        await courseApi.submitReadingSecionAttemp({
          completion: true,
          id: this.IDSectionAttemp,
        });
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      } finally {
        await this.getDetail();
      }
    },
    /**
     * get detail user
     */
    async getDetail() {
      try {
        const email = this.userInfor.email;
        const data = await userApi.getUser(email);
        localStorage.setItem('user', JSON.stringify(data));
      } catch (error) {
        console.error(error);
      } finally {
        this.userInfor = JSON.parse(localStorage.getItem('user'));
        this.$router.push({ name: 'ListCourseReading' });
      }
    },
  },
  data() {
    return {
      IDSectionAttemp: null,
      IDCourseAttemp: null,
      IDCourse: null,
      idSession: null,
      title: null,
      textContent: null,
      imgURL: null,
      rotation: 0,
      userInfor: null,
      modalMuilti: false,
      submitMultipleChoice: false,
      paramName: null,
      errorsMultiple: [],
      myAnswer: [],
      correctAnswer: [],
      dataMultipleChoice: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.course-line {
  height: 1px;
}
.rotate-transition {
  transition: transform 1s ease-in-out;
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
</style>
