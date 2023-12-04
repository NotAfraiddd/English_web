<template>
  <div>
    <ButtonBack title="Course Listening" :hide-back="true" @back="onBack" />
    <ListCourse :data="listListening" @clicked="goToDetailCourse" />
    <div
      @click="goToCreateCourse"
      class="flex flex-col mt-5 h-auto cursor-pointer text-base flex-1 justify-between items-center border-dashed border-4 border-primary_black_opacity-600 gap-1 py-2 px-5 rounded-lg"
    >
      <div
        class="bg-text_back w-7 h-7 rounded-full text-xl font-semibold text-gray-400"
      >
        +
      </div>
      <div class="text-primary_black font-semibold" @click="goToCreateCourse">
        Add new course
      </div>
    </div>
  </div>
</template>
<script>
import { notification } from 'ant-design-vue';
import courseApi from '../../../apis/course';
import ButtonBack from '../../../components/common/ButtonBack.vue';
import ListCourse from '../../../components/common/ListCourse.vue';
import { formatSpacerIntoHyphen } from '../../../constants/function';
import { EXAMPLE } from '../../../constants/image';
export default {
  name: 'CourseListening',
  components: { ButtonBack, ListCourse },
  created() {
    this.EXAMPLE = EXAMPLE;
    this.formatSpacerIntoHyphen = formatSpacerIntoHyphen;
    this.idCourse = JSON.parse(localStorage.getItem('IDCourse'));
    this.userInfor = JSON.parse(localStorage.getItem('user'));
    this.getAllListening();
    if (this.$route.params.course) this.pathCourse = this.$route.params.course;
  },
  methods: {
    /**
     * get all session
     * @param {*} dataID
     */
    async getAllListening() {
      try {
        this.emitter.emit('isShowLoading', true);
        const arrAPI = await courseApi.getAllListeningSession({
          id: this.idCourse,
        });

        this.listListening = [];

        if (
          this.userInfor.role == 'ADMIN' ||
          this.userInfor.level == 'ADVANCED'
        ) {
          arrAPI.forEach((item) => {
            this.listListening.push({
              id: item?.id,
              title: item?.title,
              subTitle: item?.description,
              image: item?.thumbnailURL || EXAMPLE,
              status: item?.sectionStatus == 'PENDING' ? true : false,
            });
          });
        } else {
          arrAPI.forEach((item) => {
            if (item?.sectionStatus == 'APPROVED') {
              this.listListening.push({
                id: item?.id,
                title: item?.description,
                subTitle: item?.textContent,
                image: item?.thumbnailURL || EXAMPLE,
                status: false,
              });
            }
          });
        }
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    onBack() {
      this.$router.push({ name: 'Course' });
    },
    goToCreateCourse() {
      this.$router.push({
        name: 'CreateCourseListening',
        params: { name: this.pathCourse },
      });
    },
    goToDetailCourse(data) {
      if (!data?.item.status) {
        const path = formatSpacerIntoHyphen(data.item.title);
        this.$router.push({
          name: 'DetailCourseListening',
          params: { course: path.toLowerCase(), id: data?.item.id },
        });
      } else {
        notification.warning({ message: 'Session awaiting approval' });
      }
    },
  },
  data() {
    return {
      pathCourse: null,
      listListening: [],
      idCourse: null,
      userInfor: null,
    };
  },
};
</script>

<style lang="scss" scoped></style>
