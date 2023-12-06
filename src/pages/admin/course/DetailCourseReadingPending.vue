<template>
  <div class="mx-2">
    <ButtonBack
      title="Detail Reading Pending"
      :hide-back="true"
      @back="onBack"
    />
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
        v-if="
          userInfor.role == 'ADMIN' &&
          !isMatchedRoute('DetailCourseReadingPending')
        "
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
    <div class="flex justify-center gap-20 items-center py-5 text-base">
      <div class="flex items-center justify-around w-3/4">
        <div
          class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="onBack"
        >
          <span class="text-base text-primary">Back</span>
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
      <div class="flex justify-between gap-2 group-button w-1/4">
        <div
          @click.stop="handleRejectSection"
          class="text-text_red hover:text-red-600 cursor-pointer"
        >
          Rejected
        </div>
        <div
          @click.stop="handleAcceptSection"
          class="text-text_green hover:text-green-600 cursor-pointer"
        >
          Approved
        </div>
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
import ConfirmModal from '../../../components/admin/ConfirmModal.vue';
import courseApi from '../../../apis/course';
import { SOCKET } from '../../../constants';
export default {
  name: 'DetailCourseReadingPending',
  components: { ButtonBack, MultipleChoice, ConfirmModal },
  created() {
    this.SOCKET = SOCKET;
    this.RELOAD = RELOAD;
    this.ARROW_LEFT = ARROW_LEFT;
    this.MOUNTAIN_CLIMB = MOUNTAIN_CLIMB;
    this.paramName = this.$route.params.name;
    this.userInfor = JSON.parse(localStorage.getItem('user'));
    if (this.userInfor) {
      this.userID = this.userInfor.email;
    }
    this.idSection = +this.$route.params.id;
    if (this.idSection) {
      this.getDetailSession(this.idSection);
    }
  },
  watch: {
    listAnswers() {
      this.errorsMatching = [];
    },
  },

  methods: {
    /**
     * get detail session
     */
    async getDetailSession(data) {
      try {
        this.emitter.emit('isShowLoading', true);
        const detailSession = await courseApi.getReadingSessionByID({
          id: data,
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
      this.$router.push({ name: 'CoursePending' });
    },
    handleUpdate() {
      this.$router.push({
        name: 'UpdateCourseReading',
        params: { id: this.idSection },
      });
    },
    getAnswerMultichoice(data) {
      this.myAnswer = data;
    },
    compareMultiple(valueA, valueB) {
      return JSON.stringify(valueA) === JSON.stringify(valueB);
    },
    /**
     * reject
     */
    async handleRejectSection() {
      try {
        const data = await courseApi.rejectedReadingSession({
          id: this.idSection,
        });
        const dataSocket = {
          room: this.userID,
          kind: SOCKET.REJECTED_COURSE_PENDING,
        };
        this.$socket.emit('joinRoom', dataSocket);
        let content = {
          data: data,
          kind: SOCKET.REJECTED_COURSE_PENDING,
        };
        this.$socket.emit('sendSignal', content);
        notification.success({ message: 'Reject success' });
      } catch (error) {
        this.emitter.emit('isShowLoading', false);
        console.log(error);
      } finally {
        this.$router.push({ name: 'CoursePending' });
      }
    },
    /**
     * approve
     */
    async handleAcceptSection() {
      try {
        const data = await courseApi.approvedReadingSession({
          id: this.idSection,
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
        notification.success({ message: 'Approve Success' });
      } catch (error) {
        this.emitter.emit('isShowLoading', false);
        console.log(error);
      } finally {
        this.$router.push({ name: 'CoursePending' });
      }
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
        } else {
          notification.warning({
            message:
              'You must complete everything before going to the next session',
          });
        }
      }
    },
  },
  data() {
    return {
      idSection: null,
      title: null,
      textContent: null,
      imgURL: null,
      rotation: 0,
      userInfor: null,
      userID: null,
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
